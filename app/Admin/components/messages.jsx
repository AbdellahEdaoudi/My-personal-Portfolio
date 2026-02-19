"use client";
import React, { useState, useEffect } from "react";
import { apiRequest } from "../../Components/apiRequest";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../../Components/Toast";
import {
    MessageSquare, Trash2, Search, Plus, MessageCircle, ChevronLeft, ChevronRight,
    User, Mail, Clock, RefreshCcw
} from "../../Components/Icons";
import { useRouter } from "next/navigation";

export default function Messages() {
    const toast = useToast();
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedMessage, setExpandedMessage] = useState(null);
    const router = useRouter();
    const itemsPerPage = 6;

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        type: null, // "single" or "all"
        id: null, // id for single delete
        isDeleting: false
    });

    const fetchContacts = async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const response = await apiRequest({
                method: "get",
                url: '/api/contact',
            });
            setContacts(Array.isArray(response.data) ? response.data.reverse() : []);
            if (silent) toast.success("Inbox updated.");
        } catch (error) {
            console.error("Fetch error details:", error);
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error("Unauthorized: Please login again.");
                    router.push("/Admin/Login");
                } else {
                    toast.error(`Error: ${error.response.data?.message || "Failed to fetch messages."}`);
                }
            } else if (error.request) {
                toast.error("Network error: No response received.");
            } else {
                toast.error("Error setting up request.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDeleteAllClick = () => {
        setDeleteModal({ isOpen: true, type: "all", id: null, isDeleting: false });
    };

    const handleDeleteByIdClick = (e, id) => {
        e.stopPropagation();
        setDeleteModal({ isOpen: true, type: "single", id, isDeleting: false });
    };

    const confirmDelete = async () => {
        setDeleteModal(prev => ({ ...prev, isDeleting: true }));
        try {
            if (deleteModal.type === "all") {
                await apiRequest({ method: "delete", url: '/api/contact' });
                setContacts([]);
                toast.success("All messages deleted successfully.");
            } else if (deleteModal.type === "single" && deleteModal.id) {
                await apiRequest({ method: "delete", url: `/api/contact/${deleteModal.id}` });
                setContacts((prev) => prev.filter((contact) => contact._id !== deleteModal.id));
                toast.success("Message deleted successfully.");
            }
        } catch (error) {
            console.error("Delete error details:", error);
            if (error.response) {
                const errorMsg = error.response.data?.message || "Delete failed.";
                if (error.response.status === 401) {
                    toast.error("Unauthorized: Please login again.");
                    router.push("/Admin/Login");
                } else if (error.response.status === 403) {
                    toast.error("Forbidden: You don't have permission.");
                } else {
                    toast.error(`Error: ${errorMsg}`);
                }
            } else if (error.request) {
                toast.error("Network error: No response received.");
            } else {
                toast.error("Error setting up delete request.");
            }
        } finally {
            setDeleteModal(prev => ({ ...prev, isOpen: false, isDeleting: false }));
        }
    };

    const handleAddDummyMessage = async () => {
        try {
            const newMsg = {
                subject: "أستغفر الله",
                email: "شهادة.عبدالله@portfolio.com",
                message: "لا اله الا الله محمد رسول الله",
            };
            const res = await apiRequest({ method: "post", url: '/api/contact', data: newMsg });
            setContacts((prev) => [...prev, res.data]);
            toast.success("Added successfully.");
        } catch (error) {
            console.error("Add message error:", error);
            toast.error("Failed to add message.");
        }
    };

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const highlightText = (text, highlight) => {
        if (!text) return "";
        if (!highlight.trim()) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="text-indigo-600 bg-indigo-50/50 px-0.5 rounded font-bold">
                    {part}
                </span>
            ) : part
        );
    };

    return (
        <div className="min-h-full flex flex-col max-w-5xl mx-auto w-full relative font-sans text-slate-900">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 pointer-events-none" />

            <AnimatePresence>
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !deleteModal.isDeleting && setDeleteModal({ ...deleteModal, isOpen: false })}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm overflow-hidden border border-slate-100"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5 border border-red-100 shadow-inner rotate-3">
                                    <Trash2 className="w-7 h-7 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {deleteModal.type === "all" ? "Clear Inbox?" : "Delete Message?"}
                                </h3>
                                <p className="text-slate-500 mb-6 leading-relaxed px-4 text-xs">
                                    {deleteModal.type === "all"
                                        ? "Permanently delete all messages? This action cannot be reversed."
                                        : "Remove this specific message permanently?"}
                                </p>
                                <div className="flex gap-3 w-full">
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                                        className="flex-1 px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 font-bold transition-all text-xs disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={confirmDelete}
                                        className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 font-bold transition-all shadow-lg shadow-red-200 text-xs disabled:opacity-70 flex justify-center items-center gap-2"
                                    >
                                        {deleteModal.isDeleting ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            "Confirm"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-4">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5">
                    </h2>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {contacts.length} Messages
                    </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64 group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find a message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 shadow-sm shadow-slate-50"
                        />
                    </div>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => fetchContacts()}
                            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-all shadow-sm active:scale-95"
                            title="Refresh"
                        >
                            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleAddDummyMessage}
                            className="p-2.5 bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm active:scale-95"
                            title="Simulate"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDeleteAllClick}
                            className={`p-2.5 border transition-all rounded-xl shadow-sm active:scale-95 ${contacts.length > 0 ? 'bg-white border-slate-200 text-red-500 hover:bg-red-50' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'}`}
                            title="Clear All"
                            disabled={contacts.length === 0}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="flex-1 space-y-3">
                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-2.5 md:p-4 flex items-start gap-3 md:gap-4 animate-pulse">
                                {/* Avatar Skeleton */}
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-lg md:rounded-xl shrink-0" />

                                {/* Content Skeleton */}
                                <div className="flex-1 space-y-2.5 md:space-y-3 py-0.5 md:py-1">
                                    <div className="flex justify-between items-center">
                                        <div className="h-3.5 md:h-4 bg-slate-100 rounded-md w-1/3" />
                                        <div className="h-2.5 md:h-3 bg-slate-50 rounded-md w-20" />
                                    </div>
                                    <div className="h-2.5 md:h-3 bg-slate-50 rounded-md w-1/2" />
                                    <div className="space-y-2">
                                        <div className="h-2.5 md:h-3 bg-slate-100/50 rounded-md w-full" />
                                        <div className="h-2.5 md:h-3 bg-slate-100/50 rounded-md w-[90%]" />
                                    </div>
                                    <div className="pt-1">
                                        <div className="h-2.5 bg-slate-50 rounded-md w-24" />
                                    </div>
                                </div>

                                {/* Action Skeleton */}
                                <div className="flex shrink-0 items-start pt-0.5 md:pt-1 pl-2 md:pl-4 border-l border-slate-50">
                                    <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-50 rounded-lg md:rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : paginatedContacts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                        <AnimatePresence mode="popLayout">
                            {paginatedContacts.map((contact, index) => (
                                <motion.div
                                    key={contact._id || index}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => setExpandedMessage(expandedMessage === contact._id ? null : contact._id)}
                                    className={`relative group bg-white border rounded-2xl p-2.5 md:p-4 transition-all cursor-pointer overflow-hidden ${expandedMessage === contact._id ? 'border-indigo-400 shadow-lg shadow-indigo-50 ring-1 ring-indigo-400' : 'border-slate-100 hover:border-indigo-200 hover:shadow-md'}`}
                                >
                                    <div className="relative flex items-start gap-3 md:gap-4">
                                        {/* Avatar */}
                                        <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-md shadow-indigo-100 relative">
                                            {contact.subject ? contact.subject.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <h3 className="font-bold text-slate-900 truncate text-[11px] md:text-[13px] uppercase tracking-tight">
                                                    {highlightText(contact.subject || "No Subject", searchTerm)}
                                                </h3>
                                                <span className="text-[9px] md:text-[10px] font-bold text-slate-400">
                                                    {formatDate(contact.createdAt)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1.5 mb-1 md:mb-2">
                                                <Mail className="w-2.5 h-2.5 md:w-3 md:h-3 text-slate-400" />
                                                <span className="text-[10px] md:text-[11px] font-medium text-slate-500 truncate">
                                                    {highlightText(contact.email, searchTerm)}
                                                </span>
                                            </div>

                                            <div className="text-slate-600 text-[9px] md:text-[13px] leading-normal break-words whitespace-pre-wrap">
                                                {highlightText(contact.message, searchTerm)}
                                            </div>

                                            <div className="mt-2 md:mt-4 flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                                {formatDate(contact.createdAt || contact.created_at)}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex shrink-0 items-start pt-0.5 md:pt-1 pl-2 md:pl-4 border-l border-slate-50">
                                            <button
                                                onClick={(e) => handleDeleteByIdClick(e, contact._id)}
                                                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg md:rounded-xl transition-all border border-transparent hover:border-red-100 bg-slate-50/50"
                                                title="Delete Message"
                                            >
                                                <Trash2 className="w-4 h-4 md:w-4.5 md:h-4.5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
                            <MessageSquare className="w-7 h-7 text-slate-200" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Inbox is empty</h3>
                        <p className="text-slate-400 max-w-xs mx-auto text-[11px] font-medium leading-relaxed">
                            Messages from your portfolio will appear here. Click refresh to check for new ones.
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination Section */}
            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between px-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Page {currentPage} / {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                            className="p-2 rounded-xl bg-indigo-600 text-white disabled:opacity-40 transition-all shadow-md shadow-indigo-100"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
