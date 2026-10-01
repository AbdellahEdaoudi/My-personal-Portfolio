"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useToast } from "../../components/Toast";
import {
  Send,
  Mail,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Pause,
  Play,
  Square,
  FileText,
  ShieldAlert,
  RefreshCcw,
  X,
  Sparkles,
} from "../../components/Icons";

const DEFAULT_TEMPLATE = {
  subject: "Candidature spontanée — Développeur Web Full Stack",
  message: `Bonjour,

Je me permets de vous contacter afin de vous soumettre ma candidature spontanée pour une opportunité en tant que Développeur Web Full Stack au sein de votre entreprise.

Je suis titulaire d'un diplôme en Développement Digital — Option Full Stack Web de la Cité des Métiers et des Compétences (CMC), avec plus de 2 ans d'expérience en développement web.

Je suis spécialisé en React.js, Next.js, Node.js et NestJS, et je conçois et développe des applications web sécurisées, performantes et évolutives, avec une attention particulière portée à la qualité du code et à l'expérience utilisateur.

Vous pouvez découvrir mon parcours et mes projets sur mon portfolio :
https://abdellah-edaoudi.vercel.app/fr

Je serais ravi d'échanger avec votre équipe si une opportunité correspond à mon profil.

Merci pour votre attention.

Cordialement,
Abdellah Edaoudi
abdellahedaoudi.dev@gmail.com
+212609085357`
};

const STATUS = {
  PENDING: "PENDING",
  SENDING: "SENDING",
  SENT: "SENT",
  FAILED: "FAILED",
  PAUSED: "PAUSED",
  CANCELLED: "CANCELLED",
};

export default function EmailSender({ isForbidden, setIsForbidden }) {
  const toast = useToast();
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [bulkEmails, setBulkEmails] = useState("");
  const [delayRange, setDelayRange] = useState({ min: 8, max: 18 });

  // Bulk Engine state
  const [isBulkRunning, setIsBulkRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    cancelled: 0,
    startTime: null,
    elapsed: 0,
  });
  const [countdown, setCountdown] = useState(0);

  // Refs for async loop controls
  const isPausedRef = useRef(false);
  const isCancelledRef = useRef(false);
  const listRef = useRef(null);

  // Timer for elapsed seconds during bulk process
  useEffect(() => {
    let timer;
    if (isBulkRunning && stats.startTime && !isPaused && !stats.isDone) {
      timer = setInterval(() => {
        setStats((prev) => ({
          ...prev,
          elapsed: Math.floor((Date.now() - prev.startTime) / 1000),
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBulkRunning, isPaused, stats.startTime, stats.isDone]);

  // Auto-scroll modal log list to active item
  useEffect(() => {
    if (listRef.current && modalOpen) {
      const activeEl = listRef.current.querySelector('[data-sending="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [jobs, modalOpen]);

  const loadTemplate = () => {
    setFormData({
      ...formData,
      subject: DEFAULT_TEMPLATE.subject,
      message: DEFAULT_TEMPLATE.message,
    });
    toast.info("Default recruitment template loaded!");
  };

  const loadTestEmails = () => {
    const samples = [
      "abdellahedaoudi.dev@gmail.com",
      "contact@techfirm.ma",
      "recrutement@innovate.com",
    ];
    setBulkEmails(samples.join("\n"));
    toast.info("Sample test emails loaded");
  };

  // Single email sender
  const handleSingleSend = async (e) => {
    e.preventDefault();
    if (!formData.to || !formData.subject || !formData.message) {
      toast.error("Please fill in recipient, subject, and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/email/send",
        {
          to: formData.to.trim(),
          subject: formData.subject,
          message: formData.message,
        },
        { withCredentials: true }
      );

      toast.success(res.data?.message || "Email sent successfully!");
      setFormData((prev) => ({ ...prev, to: "" }));
    } catch (err) {
      console.error("Single email send error:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setIsForbidden?.(true);
      }
      toast.error(err.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  // Wait utility with pause/cancel checks
  const sleepWithControls = async (seconds) => {
    const step = 200; // check every 200ms
    let remaining = seconds * 1000;

    while (remaining > 0) {
      if (isCancelledRef.current) return false;

      while (isPausedRef.current) {
        if (isCancelledRef.current) return false;
        await new Promise((r) => setTimeout(r, step));
      }

      setCountdown(Math.ceil(remaining / 1000));
      await new Promise((r) => setTimeout(r, Math.min(step, remaining)));
      remaining -= step;
    }
    setCountdown(0);
    return true;
  };

  // Start Bulk Email Engine
  const handleBulkSend = async () => {
    const rawList = bulkEmails
      .split("\n")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    if (rawList.length === 0) {
      toast.error("Please add at least one recipient email address.");
      return;
    }
    if (!formData.subject || !formData.message) {
      toast.error("Please fill in subject and message body.");
      return;
    }

    const initialJobs = rawList.map((email) => ({
      to: email,
      status: STATUS.PENDING,
      error: null,
      duration: null,
    }));

    setJobs(initialJobs);
    setStats({
      total: initialJobs.length,
      sent: 0,
      failed: 0,
      cancelled: 0,
      startTime: Date.now(),
      elapsed: 0,
      isDone: false,
    });

    isPausedRef.current = false;
    isCancelledRef.current = false;
    setIsPaused(false);
    setIsBulkRunning(true);
    setModalOpen(true);

    let sentAcc = 0;
    let failedAcc = 0;
    let cancelAcc = 0;

    for (let i = 0; i < initialJobs.length; i++) {
      if (isCancelledRef.current) {
        cancelAcc = initialJobs.length - i;
        setJobs((prev) =>
          prev.map((j, idx) =>
            idx >= i ? { ...j, status: STATUS.CANCELLED } : j
          )
        );
        break;
      }

      // Pause check
      while (isPausedRef.current) {
        if (isCancelledRef.current) break;
        await new Promise((r) => setTimeout(r, 200));
      }
      if (isCancelledRef.current) {
        cancelAcc = initialJobs.length - i;
        setJobs((prev) =>
          prev.map((j, idx) =>
            idx >= i ? { ...j, status: STATUS.CANCELLED } : j
          )
        );
        break;
      }

      // Mark current job sending
      setJobs((prev) =>
        prev.map((j, idx) => (idx === i ? { ...j, status: STATUS.SENDING } : j))
      );

      const itemStartTime = Date.now();
      let success = false;
      let errorMsg = null;

      try {
        await axios.post(
          "/api/email/send",
          {
            to: initialJobs[i].to,
            subject: formData.subject,
            message: formData.message,
          },
          { withCredentials: true }
        );
        success = true;
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setIsForbidden?.(true);
        }
        errorMsg = err.response?.data?.message || err.message || "Failed";
      }

      const durationSec = Math.round((Date.now() - itemStartTime) / 1000);

      if (success) {
        sentAcc++;
        setJobs((prev) =>
          prev.map((j, idx) =>
            idx === i
              ? { ...j, status: STATUS.SENT, duration: durationSec }
              : j
          )
        );
      } else {
        failedAcc++;
        setJobs((prev) =>
          prev.map((j, idx) =>
            idx === i
              ? {
                  ...j,
                  status: STATUS.FAILED,
                  error: errorMsg,
                  duration: durationSec,
                }
              : j
          )
        );
      }

      setStats((prev) => ({
        ...prev,
        sent: sentAcc,
        failed: failedAcc,
      }));

      // Delay between emails to avoid spam filters (except for last email)
      if (i < initialJobs.length - 1 && !isCancelledRef.current) {
        const minD = Math.max(1, delayRange.min);
        const maxD = Math.max(minD, delayRange.max);
        const randomDelay = Math.floor(Math.random() * (maxD - minD + 1)) + minD;
        const continueRun = await sleepWithControls(randomDelay);
        if (!continueRun) {
          cancelAcc = initialJobs.length - (i + 1);
          setJobs((prev) =>
            prev.map((j, idx) =>
              idx > i ? { ...j, status: STATUS.CANCELLED } : j
            )
          );
          break;
        }
      }
    }

    setStats((prev) => ({
      ...prev,
      cancelled: cancelAcc,
      isDone: true,
    }));
    setIsBulkRunning(false);
    toast.success(`Bulk process completed! (${sentAcc} sent, ${failedAcc} failed)`);
  };

  const handlePause = () => {
    isPausedRef.current = true;
    setIsPaused(true);
    toast.info("Bulk send paused");
  };

  const handleResume = () => {
    isPausedRef.current = false;
    setIsPaused(false);
    toast.info("Bulk send resumed");
  };

  const handleCancel = () => {
    isCancelledRef.current = true;
    setIsPaused(false);
    toast.warning("Cancelling bulk send process...");
  };

  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const doneCount = stats.sent + stats.failed + stats.cancelled;
  const progress = stats.total > 0 ? Math.round((doneCount / stats.total) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-[#0E1016] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm transition-colors duration-300">
      {/* Header Banner */}
      <div className="shrink-0 px-6 py-4 bg-white dark:bg-[#14171F] border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-[#E8A33D]/10 text-indigo-600 dark:text-[#E8A33D] border border-indigo-100 dark:border-[#E8A33D]/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-[#F5F3EE]">
              Email Dispatcher
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8B93A7]">
              Send single or bulk emails safely via secure backend SMTP
            </p>
          </div>
        </div>

        {/* Action Controls & Preset Loader */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadTemplate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#F5F3EE] hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-semibold transition"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500 dark:text-[#E8A33D]" />
            Load Preset Template
          </button>

          {/* Mode Switcher Pills */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-[#0B0D12] rounded-xl border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setIsBulkMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                !isBulkMode
                  ? "bg-white dark:bg-[#1E222D] text-indigo-600 dark:text-[#E8A33D] shadow-xs"
                  : "text-slate-500 dark:text-[#8B93A7] hover:text-slate-900 dark:hover:text-[#F5F3EE]"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Single
            </button>
            <button
              type="button"
              onClick={() => setIsBulkMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isBulkMode
                  ? "bg-white dark:bg-[#1E222D] text-indigo-600 dark:text-[#E8A33D] shadow-xs"
                  : "text-slate-500 dark:text-[#8B93A7] hover:text-slate-900 dark:hover:text-[#F5F3EE]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Bulk Sender
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-y-auto p-6 custom-scroll">
        <form
          onSubmit={isBulkMode ? (e) => { e.preventDefault(); handleBulkSend(); } : handleSingleSend}
          className="max-w-4xl mx-auto space-y-5"
        >
          {/* Recipient Section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-[#8B93A7]">
                {isBulkMode ? "Recipient Email List (One per line)" : "Recipient Email Address"}
              </label>
              {isBulkMode && (
                <button
                  type="button"
                  onClick={loadTestEmails}
                  className="text-xs font-semibold text-indigo-600 dark:text-[#E8A33D] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Load Sample Emails
                </button>
              )}
            </div>

            {isBulkMode ? (
              <textarea
                rows={4}
                required
                placeholder={`contact@company1.ma\nrecrutement@company2.com\njobs@company3.ma`}
                value={bulkEmails}
                onChange={(e) => setBulkEmails(e.target.value)}
                className="w-full bg-white dark:bg-[#14171F] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 dark:text-[#F5F3EE] placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#E8A33D] transition resize-y custom-scroll"
              />
            ) : (
              <input
                type="email"
                required
                placeholder="recipient@example.com"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full bg-white dark:bg-[#14171F] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-[#F5F3EE] placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#E8A33D] transition"
              />
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-[#8B93A7]">
              Subject Line
            </label>
            <input
              type="text"
              required
              placeholder="Enter email subject line..."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-white dark:bg-[#14171F] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-[#F5F3EE] placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#E8A33D] transition"
            />
          </div>

          {/* Message Body Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-[#8B93A7]">
              Email Content Body
            </label>
            <textarea
              required
              rows={8}
              placeholder="Write your email body here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white dark:bg-[#14171F] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-[#F5F3EE] placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#E8A33D] transition resize-y custom-scroll"
            />
          </div>

          {/* Anti-Spam Notice & Custom Delay Range in Bulk Mode */}
          {isBulkMode && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-3 max-w-xl">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                    Smart Anti-Spam Protection Enabled
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-0.5 leading-relaxed">
                    Applies randomized time delays between consecutive email dispatches to protect your Gmail sender address from rate-limiting.
                  </p>
                </div>
              </div>

              {/* Delay Selector */}
              <div className="flex items-center gap-2 bg-white dark:bg-[#14171F] px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800/30">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-medium text-slate-700 dark:text-[#F5F3EE]">Delay:</span>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={delayRange.min}
                  onChange={(e) => setDelayRange({ ...delayRange, min: parseInt(e.target.value) || 1 })}
                  className="w-12 text-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded px-1 text-xs text-slate-900 dark:text-[#F5F3EE]"
                />
                <span className="text-xs text-slate-400">-</span>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={delayRange.max}
                  onChange={(e) => setDelayRange({ ...delayRange, max: parseInt(e.target.value) || 1 })}
                  className="w-12 text-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded px-1 text-xs text-slate-900 dark:text-[#F5F3EE]"
                />
                <span className="text-xs text-slate-500">sec</span>
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          {isBulkMode ? (
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={isBulkRunning}
                onClick={handleBulkSend}
                className="flex-1 py-3 px-6 rounded-xl bg-indigo-600 dark:bg-[#E8A33D] hover:bg-indigo-700 dark:hover:bg-[#d9942e] text-white dark:text-[#0B0D12] font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBulkRunning ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    <span>Bulk Sending in Progress...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Start Bulk Dispatch</span>
                  </>
                )}
              </button>

              {isBulkRunning && !modalOpen && (
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-3 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-[#F5F3EE] hover:bg-slate-300 dark:hover:bg-white/20 font-semibold text-sm transition"
                >
                  View Progress
                </button>
              )}
            </div>
          ) : (
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-indigo-600 dark:bg-[#E8A33D] hover:bg-indigo-700 dark:hover:bg-[#d9942e] text-white dark:text-[#0B0D12] font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    <span>Sending Email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Email Now</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Real-time Progress Modal for Bulk Sending */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => { if (!isBulkRunning) setModalOpen(false); }}
        >
          <div
            className="w-full max-w-2xl bg-white dark:bg-[#14171F] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-[#0E1016]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-[#E8A33D]/10 text-indigo-600 dark:text-[#E8A33D]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F3EE]">
                    Bulk Mail Process Monitor
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#8B93A7]">
                    Real-time status tracking and controls
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                {isBulkRunning && !stats.isDone && (
                  <>
                    {isPaused ? (
                      <button
                        onClick={handleResume}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" /> Resume
                      </button>
                    ) : (
                      <button
                        onClick={handlePause}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold hover:bg-amber-500/20 transition cursor-pointer"
                      >
                        <Pause className="w-3.5 h-3.5" /> Pause
                      </button>
                    )}
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold hover:bg-red-500/20 transition cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5" /> Stop
                    </button>
                  </>
                )}
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-[#F5F3EE] hover:bg-slate-200 dark:hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Stats Overview */}
            <div className="p-5 border-b border-slate-200 dark:border-white/10 space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  <span className="text-slate-600 dark:text-[#8B93A7]">
                    Processed {doneCount} of {stats.total}
                  </span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-[#E8A33D]">
                    {progress}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      stats.isDone
                        ? stats.cancelled > 0
                          ? "bg-red-500"
                          : "bg-emerald-500"
                        : "bg-indigo-600 dark:bg-[#E8A33D]"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="block text-lg font-bold text-slate-900 dark:text-[#F5F3EE]">
                    {stats.total}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-[#8B93A7]">
                    Total
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30">
                  <span className="block text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.sent}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    Sent
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
                  <span className="block text-lg font-bold text-red-600 dark:text-red-400">
                    {stats.failed}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400">
                    Failed
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="block text-lg font-bold font-mono text-indigo-600 dark:text-[#E8A33D]">
                    {formatTime(stats.elapsed)}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-[#8B93A7]">
                    Time
                  </span>
                </div>
              </div>

              {/* Countdown or Status Notification */}
              {isPaused && !stats.isDone && (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-2">
                  <Pause className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Execution Paused — click Resume to continue sending.
                </div>
              )}
              {!isPaused && !stats.isDone && countdown > 0 && (
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/30 text-indigo-800 dark:text-indigo-300 text-xs font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                  Anti-spam interval delay — next email dispatch in <span className="font-mono font-bold text-indigo-600 dark:text-[#E8A33D]">{countdown}s</span>
                </div>
              )}
            </div>

            {/* Email Jobs Log */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-2 custom-scroll">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  data-sending={job.status === STATUS.SENDING ? "true" : "false"}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs transition ${
                    job.status === STATUS.SENDING
                      ? "bg-indigo-50 dark:bg-[#E8A33D]/10 border-indigo-200 dark:border-[#E8A33D]/30 text-indigo-900 dark:text-[#F5F3EE]"
                      : job.status === STATUS.SENT
                      ? "bg-emerald-50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-800/30 text-emerald-900 dark:text-emerald-300"
                      : job.status === STATUS.FAILED
                      ? "bg-red-50 dark:bg-red-950/10 border-red-200 dark:border-red-800/30 text-red-900 dark:text-red-300"
                      : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-[#8B93A7]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-slate-400 font-semibold">{idx + 1}.</span>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 dark:text-[#F5F3EE] truncate">
                        {job.to}
                      </p>
                      {job.error && (
                        <p className="text-[11px] text-red-500 truncate mt-0.5">{job.error}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {job.duration != null && (
                      <span className="font-mono text-slate-400 text-[11px]">{job.duration}s</span>
                    )}
                    {job.status === STATUS.SENDING && (
                      <span className="flex items-center gap-1 font-bold text-indigo-600 dark:text-[#E8A33D]">
                        <RefreshCcw className="w-3 h-3 animate-spin" /> Sending
                      </span>
                    )}
                    {job.status === STATUS.SENT && (
                      <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sent
                      </span>
                    )}
                    {job.status === STATUS.FAILED && (
                      <span className="flex items-center gap-1 font-bold text-red-600 dark:text-red-400">
                        <XCircle className="w-3.5 h-3.5" /> Failed
                      </span>
                    )}
                    {job.status === STATUS.CANCELLED && (
                      <span className="font-bold text-slate-400">Cancelled</span>
                    )}
                    {job.status === STATUS.PENDING && (
                      <span className="font-bold text-slate-400">Pending</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
