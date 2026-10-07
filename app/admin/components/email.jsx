"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../../components/Toast";
import { handleApiError } from "../utils/apiErrorHandler";
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
  Paperclip,
  ChevronDown,
  Info,
  Eye,
} from "../../components/Icons";

import EMAIL_TEMPLATES from "../data/email-templates.json";

const TEMPLATE_LANGS = [
  { lang: "en", countryCode: "gb", label: "English" },
  { lang: "fr", countryCode: "fr", label: "Français" },
  { lang: "ar", countryCode: "ma", label: "العربية" },
  { lang: "de", countryCode: "de", label: "Deutsch" },
  { lang: "es", countryCode: "es", label: "Español" },
  { lang: "it", countryCode: "it", label: "Italiano" },
  { lang: "nl", countryCode: "nl", label: "Nederlands" },
  { lang: "pt", countryCode: "pt", label: "Português" },
];

const STATUS = {
  PENDING: "PENDING",
  SENDING: "SENDING",
  SENT: "SENT",
  SKIPPED: "SKIPPED",
  FAILED: "FAILED",
  PAUSED: "PAUSED",
  CANCELLED: "CANCELLED",
};

export default function EmailSender({ isForbidden, setIsForbidden }) {
  const toast = useToast();
  const router = useRouter();
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleError = (error, retryCallback, defaultErrorMsg) =>
    handleApiError({
      error,
      retryCallback,
      defaultErrorMsg,
      toast,
      router,
      setIsForbidden,
    });

  // Form Data
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [bulkEmails, setBulkEmails] = useState("");

  // CV language selector
  const CV_OPTIONS = [
    { lang: "en", label: "English",    countryCode: "gb" },
    { lang: "fr", label: "Français",   countryCode: "fr" },
    { lang: "ar", label: "العربية",    countryCode: "ma" },
    { lang: "de", label: "Deutsch",    countryCode: "de" },
    { lang: "es", label: "Español",    countryCode: "es" },
    { lang: "it", label: "Italiano",   countryCode: "it" },
    { lang: "nl", label: "Nederlands", countryCode: "nl" },
    { lang: "pt", label: "Português",  countryCode: "pt" },
  ];
  const [cvLang, setCvLang] = useState("en");
  const [attachCv, setAttachCv] = useState(true);
  const [checkDuplicates, setCheckDuplicates] = useState(true);
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  const cvDropdownRef = useRef(null);

  const selectedCvOpt = CV_OPTIONS.find((opt) => opt.lang === cvLang) || CV_OPTIONS[0];

  const fetchCvBlob = async () => {
    const filename = `cv-abdellah-edaoudi-${cvLang}.pdf`;
    const res = await fetch(`/cv/${filename}`);
    if (!res.ok) throw new Error(`CV file not found: ${filename}`);
    const blob = await res.blob();
    return new File([blob], filename, { type: "application/pdf" });
  };

  // Bulk Engine state
  const [isBulkRunning, setIsBulkRunning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    skipped: 0,
    failed: 0,
    cancelled: 0,
    startTime: null,
    elapsed: 0,
    currentEmail: "",
    status: "idle",
  });

  const listRef = useRef(null);
  const templateDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (templateDropdownRef.current && !templateDropdownRef.current.contains(e.target)) {
        setTemplateModalOpen(false);
      }
      if (cvDropdownRef.current && !cvDropdownRef.current.contains(e.target)) {
        setCvDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Poll backend status
  const checkBackendStatus = async () => {
    try {
      const res = await axios.get("/api/email/status", { withCredentials: true });
      const data = res.data?.data;
      if (!data) return;

      const isRunning = data.status === "running" || data.status === "pending";
      setIsBulkRunning(isRunning);

      if (data.details && data.details.length > 0) {
        setJobs(
          data.details.map((d) => ({
            to: d.email,
            status:
              d.status === "sent"
                ? STATUS.SENT
                : d.status === "skipped"
                ? STATUS.SKIPPED
                : d.status === "failed"
                ? STATUS.FAILED
                : d.status === "sending"
                ? STATUS.SENDING
                : d.status === "cancelled"
                ? STATUS.CANCELLED
                : STATUS.PENDING,
            error: d.error,
            duration: d.duration,
            retries: d.retries,
          }))
        );
      }

      setStats({
        total: data.total || 0,
        sent: data.sent || 0,
        skipped: data.skipped || 0,
        failed: data.failed || 0,
        cancelled:
          data.status === "cancelled"
            ? (data.total || 0) - ((data.sent || 0) + (data.skipped || 0) + (data.failed || 0))
            : 0,
        startTime: data.startTime ? new Date(data.startTime).getTime() : null,
        elapsed: data.startTime ? Math.round((Date.now() - new Date(data.startTime).getTime()) / 1000) : 0,
        currentEmail: data.currentEmail || "",
        status: data.status || "idle",
        isDone: data.status === "completed" || data.status === "cancelled",
      });

      // Auto open modal if job is currently running on server
      if (isRunning && !modalOpen) {
        setModalOpen(true);
      }
    } catch (err) {
      console.error("Error checking backend status:", err);
    }
  };

  // Auto-check status on component mount & setup interval polling
  useEffect(() => {
    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // Timer for elapsed seconds
  useEffect(() => {
    let timer;
    if (isBulkRunning && stats.startTime && !stats.isDone) {
      timer = setInterval(() => {
        setStats((prev) => ({
          ...prev,
          elapsed: Math.floor((Date.now() - prev.startTime) / 1000),
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBulkRunning, stats.startTime, stats.isDone]);

  // Close template dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (templateDropdownRef.current && !templateDropdownRef.current.contains(e.target)) {
        setTemplateModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Auto-scroll log to sending item
  useEffect(() => {
    if (listRef.current && modalOpen) {
      const activeEl = listRef.current.querySelector('[data-sending="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [jobs, modalOpen]);

  const isRTL = cvLang === "ar";

  const loadTemplate = () => {
    setTemplateModalOpen((v) => !v);
  };

  const applyTemplate = (lang) => {
    const tpl = EMAIL_TEMPLATES[lang];
    if (!tpl) return;
    setFormData((prev) => ({ ...prev, subject: tpl.subject, message: tpl.message }));
    setCvLang(lang);
    setAttachCv(true);
    setTemplateModalOpen(false);
    toast.info(`Template loaded in ${tpl.label} — CV set to ${tpl.label}`);
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
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.to || !formData.subject || !formData.message) {
      toast.error("Please fill in recipient, subject, and message.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("to", formData.to.trim());
      payload.append("subject", formData.subject);
      payload.append("message", formData.message);
      if (attachCv) {
        const cvFile = await fetchCvBlob();
        payload.append("cv", cvFile);
      }

      const res = await axios.post("/api/email/send", payload, {
        withCredentials: true,
      });

      toast.success(res.data?.message || "Email sent successfully!");
      setFormData((prev) => ({ ...prev, to: "" }));
    } catch (err) {
      await handleError(err, () => handleSingleSend(e), "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  // Start Bulk Email Engine on Backend
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

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("recipients", JSON.stringify(rawList));
      payload.append("subject", formData.subject);
      payload.append("message", formData.message);
      payload.append("checkDuplicates", checkDuplicates);
      if (attachCv) {
        const cvFile = await fetchCvBlob();
        payload.append("cv", cvFile);
      }

      const res = await axios.post("/api/email/send-bulk", payload, {
        withCredentials: true,
      });

      toast.success(res.data?.message || "Bulk job started on server!");
      setIsBulkRunning(true);
      setModalOpen(true);
      checkBackendStatus();
    } catch (err) {
      await handleError(err, () => handleBulkSend(), "Failed to start bulk send job");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.post("/api/email/cancel", {}, { withCredentials: true });
      toast.warning("Cancelling bulk send process on backend...");
      checkBackendStatus();
    } catch (err) {
      toast.error("Failed to submit cancel request.");
    }
  };

  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const doneCount = stats.sent + stats.skipped + stats.failed + stats.cancelled;
  const progress = stats.total > 0 ? Math.round((doneCount / stats.total) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-[#0E1016] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm transition-colors duration-300">
      {/* Header Banner */}
      <div className="shrink-0 px-4 sm:px-6 py-4 bg-white dark:bg-[#14171F] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-[#E8A33D]/10 text-indigo-600 dark:text-[#E8A33D] border border-indigo-100 dark:border-[#E8A33D]/20 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-[#F5F3EE]">
              Email Dispatcher
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8B93A7]">
              Send single or bulk emails safely via server-side sequential queue
            </p>
          </div>
        </div>

        {/* Action Controls & Preset Loader */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Active Job Indicator Button */}
          {isBulkRunning && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold animate-pulse"
            >
              <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
              Campaign Running ({progress}%) — View
            </button>
          )}

          {/* Load Preset Template */}
          <div className="relative" ref={templateDropdownRef}>
            <button
              type="button"
              onClick={loadTemplate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                templateModalOpen
                  ? "bg-indigo-50 dark:bg-[#E8A33D]/10 border-indigo-300 dark:border-[#E8A33D]/40 text-indigo-600 dark:text-[#E8A33D]"
                  : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#F5F3EE] hover:bg-slate-200 dark:hover:bg-white/10"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500 dark:text-[#E8A33D]" />
              Templates
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {templateModalOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-56 py-1.5 bg-white dark:bg-[#1A1D26] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-[#8B93A7] uppercase tracking-wider border-b border-slate-100 dark:border-white/5">
                  Select Preset Template
                </div>
                {TEMPLATE_LANGS.map(({ lang, countryCode, label }) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => applyTemplate(lang)}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-[#F5F3EE] hover:bg-indigo-50 dark:hover:bg-[#E8A33D]/10 hover:text-indigo-600 dark:hover:text-[#E8A33D] transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`fi fi-${countryCode}`} />
                      <span>{label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">{lang}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mode Switcher */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsBulkMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                !isBulkMode
                  ? "bg-white dark:bg-[#1A1D26] text-slate-900 dark:text-[#F5F3EE] shadow-sm"
                  : "text-slate-500 dark:text-[#8B93A7] hover:text-slate-900 dark:hover:text-[#F5F3EE]"
              }`}
            >
              <Send className="w-3.5 h-3.5" /> Single
            </button>
            <button
              type="button"
              onClick={() => setIsBulkMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                isBulkMode
                  ? "bg-white dark:bg-[#1A1D26] text-slate-900 dark:text-[#F5F3EE] shadow-sm"
                  : "text-slate-500 dark:text-[#8B93A7] hover:text-slate-900 dark:hover:text-[#F5F3EE]"
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Bulk Queue
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scroll">
        {/* CV Attachment & Duplicate Protection Bar */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#14171F] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={attachCv}
                  onChange={(e) => setAttachCv(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-[#E8A33D]"></div>
              </label>
              <span className="text-xs font-bold text-slate-800 dark:text-[#F5F3EE] flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-indigo-500 dark:text-[#E8A33D]" />
                Attach CV PDF
              </span>
            </div>

            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-white/10 pt-3 sm:pt-0 sm:pl-6">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkDuplicates}
                  onChange={(e) => setCheckDuplicates(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-[#E8A33D]"></div>
              </label>
              <span className="text-xs font-bold text-slate-800 dark:text-[#F5F3EE] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Check previously sent emails
              </span>
            </div>
          </div>

          {attachCv && (
            <div className="relative self-start md:self-auto" ref={cvDropdownRef}>
              <button
                type="button"
                onClick={() => setCvDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-800 dark:text-[#F5F3EE] transition shadow-sm"
              >
                <span className={`fi fi-${selectedCvOpt.countryCode}`} />
                <span>{selectedCvOpt.label}</span>
                <span className="text-[10px] font-mono uppercase text-slate-400 bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded">
                  {selectedCvOpt.lang}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {cvDropdownOpen && (
                <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-52 py-1.5 bg-white dark:bg-[#1A1D26] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-[#8B93A7] uppercase tracking-wider border-b border-slate-100 dark:border-white/5">
                    Select CV Document Language
                  </div>
                  {CV_OPTIONS.map((opt) => (
                    <button
                      key={opt.lang}
                      type="button"
                      onClick={() => {
                        applyTemplate(opt.lang);
                        setCvDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium transition flex items-center justify-between ${
                        cvLang === opt.lang
                          ? "bg-indigo-50 dark:bg-[#E8A33D]/10 text-indigo-600 dark:text-[#E8A33D] font-bold"
                          : "text-slate-700 dark:text-[#F5F3EE] hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`fi fi-${opt.countryCode}`} />
                        <span>{opt.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase">{opt.lang}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recipients Box */}
        {!isBulkMode ? (
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-[#F5F3EE]">
              Recipient Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. hr@company.com"
              value={formData.to}
              onChange={(e) => setFormData((prev) => ({ ...prev, to: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#14171F] border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-[#F5F3EE] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#E8A33D]"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-[#F5F3EE]">
                Bulk Recipients (One email per line) <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={loadTestEmails}
                className="text-xs text-indigo-600 dark:text-[#E8A33D] font-semibold hover:underline"
              >
                + Load test samples
              </button>
            </div>
            <textarea
              rows={5}
              placeholder={`hr@company1.com\ncareers@company2.com\njobs@company3.com`}
              value={bulkEmails}
              onChange={(e) => setBulkEmails(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#14171F] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-[#F5F3EE] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#E8A33D] custom-scroll"
            />
          </div>
        )}

        {/* Subject */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-[#F5F3EE]">
            Email Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            dir={isRTL ? "rtl" : "ltr"}
            placeholder="e.g. Application for Full Stack Developer Position"
            value={formData.subject}
            onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#14171F] border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-[#F5F3EE] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#E8A33D]"
          />
        </div>

        {/* Message Body */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-[#F5F3EE]">
            Message Body <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={8}
            dir={isRTL ? "rtl" : "ltr"}
            placeholder="Write your email body here..."
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#14171F] border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-[#F5F3EE] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#E8A33D] custom-scroll"
          />
        </div>

        {/* Submit Actions */}
        <div className="pt-2 flex items-center justify-end gap-3">
          {!isBulkMode ? (
            <button
              type="button"
              disabled={loading}
              onClick={handleSingleSend}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-[#E8A33D] dark:hover:bg-[#d49231] text-white dark:text-[#0E1016] text-xs font-bold shadow-md transition disabled:opacity-50"
            >
              {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send Single Email
            </button>
          ) : (
            <button
              type="button"
              disabled={loading || isBulkRunning}
              onClick={handleBulkSend}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-[#E8A33D] dark:hover:bg-[#d49231] text-white dark:text-[#0E1016] text-xs font-bold shadow-md transition disabled:opacity-50"
            >
              {loading || isBulkRunning ? (
                <RefreshCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Users className="w-4 h-4" />
              )}
              {isBulkRunning ? "Bulk Campaign Running..." : "Start Bulk Dispatch Queue"}
            </button>
          )}
        </div>
      </div>

      {/* Progress & Live Queue Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#14171F] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-[#E8A33D]/10 text-indigo-600 dark:text-[#E8A33D]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F3EE]">
                    Server Bulk Dispatch Monitor
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-[#8B93A7]">
                    Sequential background worker engine active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isBulkRunning && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold transition"
                  >
                    <Square className="w-3 h-3 fill-current" /> Stop Queue
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-[#F5F3EE] rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Stats Overview */}
            <div className="p-5 border-b border-slate-200 dark:border-white/10 space-y-4 bg-slate-50/50 dark:bg-white/[0.02]">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  <span className="text-slate-600 dark:text-[#8B93A7]">
                    Processed {doneCount} of {stats.total} recipients
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
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                        : "bg-indigo-600 dark:bg-[#E8A33D]"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Counters Grid */}
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="block text-base font-bold text-slate-900 dark:text-[#F5F3EE]">
                    {stats.total}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-[#8B93A7]">
                    Total
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30">
                  <span className="block text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.sent}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    Sent
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
                  <span className="block text-base font-bold text-amber-600 dark:text-amber-400">
                    {stats.skipped}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                    Skipped
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
                  <span className="block text-base font-bold text-red-600 dark:text-red-400">
                    {stats.failed}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400">
                    Failed
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="block text-base font-bold font-mono text-indigo-600 dark:text-[#E8A33D]">
                    {formatTime(stats.elapsed)}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-[#8B93A7]">
                    Elapsed
                  </span>
                </div>
              </div>

              {/* Server Processing Indicator Banner */}
              {isBulkRunning && stats.currentEmail && (
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/30 text-indigo-900 dark:text-indigo-300 text-xs font-semibold flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
                    <span className="truncate">
                      Currently processing: <strong className="font-mono text-indigo-700 dark:text-[#E8A33D]">{stats.currentEmail}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shrink-0">
                    Server Background Queue
                  </span>
                </div>
              )}
            </div>

            {/* Email Jobs Log List */}
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
                      : job.status === STATUS.SKIPPED
                      ? "bg-amber-50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-800/30 text-amber-900 dark:text-amber-300"
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
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 truncate mt-0.5">{job.error}</p>
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
                    {job.status === STATUS.SKIPPED && (
                      <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Skipped (Already Sent)
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
