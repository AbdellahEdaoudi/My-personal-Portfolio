"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useToast } from "../../Components/Toast";
import {
    MessageSquare, Trash2, Search, Plus, ChevronLeft, ChevronRight,
    User, Mail, Clock, RefreshCcw
} from "../../Components/Icons";
import { useRouter } from "next/navigation";

export default function Messages({ isForbidden, setIsForbidden }) {
    const toast = useToast();
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedId, setSelectedId] = useState(null);
    const router = useRouter();
    const itemsPerPage = 8;
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        type: null,
        id: null,
        isDeleting: false
    });
    const [imageModal, setImageModal] = useState(null); // stores image URL when open

    const fetchContacts = async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const response = await
                axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`,
                    { withCredentials: true }
                );
            const contactsData = response.data.contacts || response.data;
            setContacts(Array.isArray(contactsData) ? contactsData.reverse() : []);
            if (silent) toast.success("Token refreshed");
        } catch (error) {
            console.error("Fetch error details:", error);
            if (error.response) {
                const errorCode = error.response.data?.code;
                if (errorCode === "ACCESS_TOKEN_EXPIRED") {
                    try {
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`,
                            {},
                            { withCredentials: true }
                        );
                        fetchContacts(true);
                    } catch (refreshError) {
                        toast.error("Session expired. Please login again.");
                        router.push("/Admin/Login");
                    }
                } else if (["TOKEN_MISSING", "ACCESS_TOKEN_INVALID"].includes(errorCode) || error.response.status === 401) {
                    toast.error("Unauthorized: Please login again.");
                    router.push("/Admin/Login");
                } else if (error.response.status === 403) {
                    setIsForbidden(true);
                    toast.error("Forbidden: You don't have permission.");
                    router.push("/");
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
        if (e) e.stopPropagation();
        setDeleteModal({ isOpen: true, type: "single", id, isDeleting: false });
    };

    const confirmDelete = async () => {
        setDeleteModal(prev => ({ ...prev, isDeleting: true }));
        try {
            if (deleteModal.type === "all") {
                await axios({ method: "delete", url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`, withCredentials: true });
                setContacts([]);
                setSelectedId(null);
                toast.success("All messages deleted successfully.");
            } else if (deleteModal.type === "single" && deleteModal.id) {
                await axios({ method: "delete", url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact/${deleteModal.id}`, withCredentials: true });
                setContacts((prev) => prev.filter((contact) => contact._id !== deleteModal.id));
                if (selectedId === deleteModal.id) setSelectedId(null);
                toast.success("Message deleted successfully.");
            }
        } catch (error) {
            console.error("Delete error details:", error);
            if (error.response) {
                const errorCode = error.response.data?.code;
                const errorMsg = error.response.data?.message || "Delete failed.";
                if (errorCode === "ACCESS_TOKEN_EXPIRED") {
                    try {
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`,
                            {},
                            { withCredentials: true }
                        );
                        if (deleteModal.type === "all") {
                            await axios({ method: "delete", url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`, withCredentials: true });
                            setContacts([]);
                            setSelectedId(null);
                            toast.success("All messages deleted successfully.");
                        } else if (deleteModal.type === "single" && deleteModal.id) {
                            await axios({ method: "delete", url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact/${deleteModal.id}`, withCredentials: true });
                            setContacts((prev) => prev.filter((contact) => contact._id !== deleteModal.id));
                            if (selectedId === deleteModal.id) setSelectedId(null);
                            toast.success("Message deleted successfully.");
                        }
                    } catch (refreshError) {
                        toast.error("Session expired. Please login again.");
                        router.push("/Admin/Login");
                    }
                } else if (["TOKEN_MISSING", "ACCESS_TOKEN_INVALID"].includes(errorCode) || error.response.status === 401) {
                    toast.error("Unauthorized: Please login again.");
                    router.push("/Admin/Login");
                } else if (error.response.status === 403) {
                    setIsForbidden(true);
                    toast.error("Forbidden: You don't have permission.");
                    router.push("/");
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

    const AddMessage = async () => {
        try {
            const newMsg = {
                subject: "New message",
                email: "[EMAIL_ADDRESS]",
                message: "Hi, I came across your portfolio and I'm impressed with your work. I'm looking for a developer to work on a project, and I think you'd be a great fit.",
            };
            const res = await axios({ method: "post", url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`, data: newMsg, withCredentials: true });
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

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage) || 1;
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Ledger index — position of a message within the full (unfiltered) inbox,
    // oldest = 001. This is the page's signature device: every message carries
    // a fixed reference number, independent of search/filter/page.
    const indexOf = (id) => {
        const pos = contacts.findIndex((c) => c._id === id);
        if (pos === -1) return null;
        return String(contacts.length - pos).padStart(3, "0");
    };

    const selectedContact = contacts.find((c) => c._id === selectedId) || null;

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatShortDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    };

    const highlightText = (text, highlight) => {
        if (!text) return "";
        if (!highlight.trim()) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="text-[#E8A33D] bg-[#E8A33D]/10 px-0.5 rounded-sm font-semibold">
                    {part}
                </span>
            ) : part
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col font-sans">
            {/* Custom scrollbar — replaces the default browser scrollbar wherever .custom-scroll is used */}
            <style jsx global>{`
                .custom-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background-color: rgba(232, 163, 61, 0.3);
                    border-radius: 999px;
                }
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(232, 163, 61, 0.55);
                }
                .custom-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(232, 163, 61, 0.3) transparent;
                }
            `}</style>
            {/* Image Lightbox Modal */}
                {imageModal && (
                    <div
                        onClick={() => setImageModal(null)}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-3xl w-full cursor-default"
                        >
                            <button
                                onClick={() => setImageModal(null)}
                                className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-[#F5F3EE] text-[#0B0D12] rounded-full shadow-lg flex items-center justify-center hover:bg-[#E5484D] hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={imageModal}
                                alt="Full size attachment"
                                className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                )}

            {/* Delete Confirmation Modal */}
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div
                            onClick={() => !deleteModal.isDeleting && setDeleteModal({ ...deleteModal, isOpen: false })}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <div
                            className="relative bg-white dark:bg-[#14171F] rounded-2xl shadow-2xl p-8 w-full max-w-sm overflow-hidden border border-slate-200 dark:border-white/10 transition-colors"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-red-100 dark:bg-[#E5484D]/10 rounded-full flex items-center justify-center mb-5 border border-red-200 dark:border-[#E5484D]/20 transition-colors">
                                    <Trash2 className="w-6 h-6 text-red-500 dark:text-[#E5484D]" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F5F3EE] mb-2 transition-colors">
                                    {deleteModal.type === "all" ? "Clear the entire inbox?" : "Delete this message?"}
                                </h3>
                                <p className="text-slate-500 dark:text-[#8B93A7] mb-6 leading-relaxed px-2 text-xs transition-colors">
                                    {deleteModal.type === "all"
                                        ? "Every message will be permanently removed. This cannot be undone."
                                        : "This message will be permanently removed."}
                                </p>
                                <div className="flex gap-3 w-full">
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                                        className="flex-1 px-4 py-3 bg-white/5 text-[#F5F3EE]/80 rounded-lg hover:bg-white/10 font-semibold transition-all text-xs disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={confirmDelete}
                                        className="flex-1 px-4 py-3 bg-[#E5484D] text-white rounded-lg hover:bg-[#c93d42] font-semibold transition-all shadow-lg shadow-[#E5484D]/20 text-xs disabled:opacity-70 flex justify-center items-center gap-2"
                                    >
                                        {deleteModal.isDeleting ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            "Confirm"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {/* App shell */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0B0D12] flex flex-col flex-1 min-h-0 transition-colors duration-300">

                {/* Top bar */}
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0E1016] transition-colors duration-300">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-[#F5F3EE] tracking-tight transition-colors">Inbox</h2>
                        <p className="text-[10px] font-mono text-slate-500 dark:text-[#8B93A7] uppercase tracking-[0.2em] mt-0.5 transition-colors">
                            {contacts.length} received
                        </p>
                    </div>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => fetchContacts()}
                            className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-[#F5F3EE]/70 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-[#F5F3EE] rounded-lg transition-all active:scale-95"
                            title="Refresh"
                        >
                            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={AddMessage}
                            className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-indigo-600 dark:text-[#E8A33D] hover:bg-indigo-50 dark:hover:bg-[#E8A33D]/10 rounded-lg transition-all active:scale-95"
                            title="Add sample message"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDeleteAllClick}
                            className={`p-2.5 border transition-all rounded-lg active:scale-95 ${contacts.length > 0 ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-red-500 dark:text-[#E5484D] hover:bg-red-50 dark:hover:bg-[#E5484D]/10' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-100 dark:border-white/5 text-slate-300 dark:text-white/15 cursor-not-allowed'}`}
                            title="Clear all"
                            disabled={contacts.length === 0}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Split pane body */}
                <div className="flex-1 flex min-h-0">

                    {/* LIST PANE */}
                    <div className={`w-full md:w-[340px] md:shrink-0 border-r border-slate-200 dark:border-white/10 flex-col bg-slate-50 dark:bg-[#0E1016] transition-colors duration-300 ${selectedId ? 'hidden md:flex' : 'flex'}`}>
                        {/* Search */}
                        <div className="p-3 border-b border-slate-200 dark:border-white/10 transition-colors">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-[#8B93A7] group-focus-within:text-indigo-600 dark:group-focus-within:text-[#E8A33D] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search messages…"
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-[#F5F3EE] outline-none focus:border-indigo-300 dark:focus:border-[#E8A33D]/50 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-[#E8A33D]/10 transition-all placeholder:text-slate-400 dark:placeholder:text-[#8B93A7]"
                                />
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="flex-1 overflow-y-auto custom-scroll">
                            {isLoading ? (
                                <div className="p-3 space-y-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="p-3 rounded-lg animate-pulse space-y-2">
                                            <div className="h-3 bg-white/5 rounded w-2/3" />
                                            <div className="h-2.5 bg-white/5 rounded w-1/2" />
                                            <div className="h-2.5 bg-white/5 rounded w-full" />
                                        </div>
                                    ))}
                                </div>
                            ) : paginatedContacts.length > 0 ? (
                                <div>
                                    {paginatedContacts.map((contact) => {
                                        const isActive = selectedId === contact._id;
                                        return (
                                            <div
                                                key={contact._id}
                                                onClick={() => setSelectedId(contact._id)}
                                                className={`relative w-full cursor-pointer text-left px-4 py-3 border-b border-slate-100 dark:border-white/5 transition-colors ${isActive ? 'bg-indigo-50 dark:bg-[#E8A33D]/[0.08]' : 'hover:bg-slate-100 dark:hover:bg-white/[0.03]'}`}
                                            >
                                                {isActive && <span className="absolute left-0 top-0 h-full w-[3px] bg-indigo-600 dark:bg-[#E8A33D]" />}
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <span className="text-[10px] font-mono text-slate-400 dark:text-[#8B93A7]">#{indexOf(contact._id)}</span>
                                                    <span className="text-[10px] font-mono text-slate-400 dark:text-[#8B93A7] shrink-0">{formatShortDate(contact.createdAt)}</span>
                                                </div>
                                                <h4 className="text-[13px] font-semibold text-slate-900 dark:text-[#F5F3EE] truncate mb-0.5">
                                                    {highlightText(contact.subject || "No subject", searchTerm)}
                                                </h4>
                                                <p className="text-[11px] text-slate-500 dark:text-[#8B93A7] truncate mb-1">{highlightText(contact.email, searchTerm)}</p>
                                                <p className="text-[11px] text-slate-400 dark:text-[#8B93A7]/70 truncate">{highlightText(contact.message, searchTerm)}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <MessageSquare className="w-5 h-5 text-white/20" />
                                    </div>
                                    <p className="text-[#F5F3EE] font-semibold text-sm mb-1">Inbox is empty</p>
                                    <p className="text-[#8B93A7] text-[11px] leading-relaxed">
                                        Messages from your portfolio will appear here.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-white/10 transition-colors">
                                <span className="text-[10px] font-mono text-slate-500 dark:text-[#8B93A7] uppercase tracking-widest transition-colors">
                                    {currentPage} / {totalPages}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                                        className="p-1.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-[#F5F3EE]/70 hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-30 transition-all"
                                    >
                                        <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                                        className="p-1.5 rounded-md bg-indigo-600 dark:bg-[#E8A33D] text-white dark:text-[#0B0D12] hover:bg-indigo-700 dark:hover:bg-[#c97f22] disabled:opacity-30 transition-all"
                                    >
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* DETAIL PANE */}
                    <div className={`flex-1 flex-col bg-white dark:bg-[#14171F] min-w-0 transition-colors duration-300 ${selectedId ? 'flex' : 'hidden md:flex'}`}>
                        {selectedContact ? (
                            <>
                                {/* Detail header */}
                                <div className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex items-start gap-4 transition-colors">
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="md:hidden p-2 -ml-2 mr-1 text-slate-500 dark:text-[#8B93A7] hover:text-slate-900 dark:hover:text-[#F5F3EE] shrink-0 transition-colors"
                                        title="Back to inbox"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 dark:from-[#E8A33D] to-indigo-600 dark:to-[#c97f22] flex items-center justify-center text-white dark:text-[#0B0D12] font-bold text-lg shrink-0">
                                        {selectedContact.subject ? selectedContact.subject.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-[#F5F3EE] leading-snug transition-colors">
                                                {selectedContact.subject || "No subject"}
                                            </h3>
                                            <span className="shrink-0 text-[10px] font-mono text-slate-500 dark:text-[#8B93A7] border border-slate-200 dark:border-white/10 rounded-full px-2 py-1 transition-colors">
                                                NO. {indexOf(selectedContact._id)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <Mail className="w-3 h-3 text-slate-400 dark:text-[#8B93A7]" />
                                            <span className="text-[12px] font-mono text-slate-500 dark:text-[#8B93A7] transition-colors">{selectedContact.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Clock className="w-3 h-3 text-slate-400 dark:text-[#8B93A7]" />
                                            <span className="text-[11px] text-slate-500 dark:text-[#8B93A7] transition-colors">{formatDate(selectedContact.createdAt)}</span>
                                        </div>
                                    </div>

                                    {selectedContact.image && (
                                        <button
                                            onClick={() => setImageModal(selectedContact.image)}
                                            className="w-11 h-11 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shrink-0 hover:border-indigo-300 dark:hover:border-[#E8A33D]/50 transition-colors"
                                            title="View attached image"
                                        >
                                            <img
                                                src={selectedContact.image}
                                                alt="Attached"
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    )}

                                    <button
                                        onClick={(e) => handleDeleteByIdClick(e, selectedContact._id)}
                                        className="p-2.5 text-slate-400 dark:text-[#8B93A7] hover:text-red-500 dark:hover:text-[#E5484D] hover:bg-red-50 dark:hover:bg-[#E5484D]/10 rounded-lg transition-all shrink-0"
                                        title="Delete message"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Detail body */}
                                <div className="flex-1 overflow-y-auto custom-scroll px-6 py-6">
                                    <p className="text-[14px] leading-relaxed text-slate-700 dark:text-[#F5F3EE]/90 whitespace-pre-wrap break-words max-w-2xl transition-colors">
                                        {selectedContact.message}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                                <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 transition-colors">
                                    <Mail className="w-6 h-6 text-slate-300 dark:text-white/20" />
                                </div>
                                <p className="text-slate-900 dark:text-[#F5F3EE] font-semibold text-sm mb-1 transition-colors">No message selected</p>
                                <p className="text-slate-500 dark:text-[#8B93A7] text-[11px] leading-relaxed max-w-xs transition-colors">
                                    Choose a message from the list to read it here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}