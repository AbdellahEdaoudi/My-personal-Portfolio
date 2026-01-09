"use client";
import React, { useState, useEffect } from "react";
import { apiRequest } from "../../Components/apiRequest";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
const MessageSquare = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const Trash2 = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
);
const Search = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);
const Plus = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M5 12h14" />
        <path d="M12 5v14" />
    </svg>
);
// User and Mail are unused in the component logic but imported, providing them just in case or removing if safe. 
// However, User is not used in the JSX below. I see `contact.name ? contact.name.charAt(0) : "?"`.
// The user imported them, so I will provide them.
const User = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const Mail = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
const MessageCircle = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
);
const ChevronLeft = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="m15 18-6-6 6-6" />
    </svg>
);
const ChevronRight = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="m9 18 6-6-6-6" />
    </svg>
);



const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Messages() {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        type: null, // "single" or "all"
        id: null, // id for single delete
        isDeleting: false
    });

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            const response = await apiRequest({
                method: "get",
                url: `${API_URL}/contact`,
            });
            setContacts(Array.isArray(response.data) ? response.data.reverse() : []);
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch messages.");
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

    const handleDeleteByIdClick = (id) => {
        setDeleteModal({ isOpen: true, type: "single", id, isDeleting: false });
    };

    const confirmDelete = async () => {
        setDeleteModal(prev => ({ ...prev, isDeleting: true }));
        try {
            if (deleteModal.type === "all") {
                await apiRequest({ method: "delete", url: `${API_URL}/Contact` });
                setContacts([]);
                toast.success("All messages deleted.");
            } else if (deleteModal.type === "single" && deleteModal.id) {
                await apiRequest({ method: "delete", url: `${API_URL}/Contact/${deleteModal.id}` });
                setContacts((prev) => prev.filter((contact) => contact._id !== deleteModal.id));
                toast.success("Message deleted.");
            }
        } catch (error) {
            toast.error(deleteModal.type === "all" ? "Failed to delete messages." : "Failed to delete contact.");
        } finally {
            setDeleteModal(prev => ({ ...prev, isOpen: false, isDeleting: false }));
        }
    };

    const handleAddDummyMessage = async () => {
        try {
            const newMsg = {
                name: "Test User",
                email: "test@example.com",
                msg: "This is a test message to verify the layout.",
            };
            await apiRequest({ method: "post", url: `${API_URL}/Contact`, data: newMsg });
            setContacts((prev) => [newMsg, ...prev]);
            toast.success("Test message added.");
        } catch (error) {
            toast.error("Failed to add message.");
        }
    };

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.msg?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="h-full flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full relative">
            <AnimatePresence>
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !deleteModal.isDeleting && setDeleteModal({ ...deleteModal, isOpen: false })}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm overflow-hidden border border-gray-100"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-5 border border-red-100 shadow-sm">
                                    <Trash2 className="w-7 h-7 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {deleteModal.type === "all" ? "Delete All Messages" : "Delete Message"}
                                </h3>
                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    {deleteModal.type === "all"
                                        ? "Are you absolutely sure? This action will permanently remove all messages and cannot be undone."
                                        : "Are you sure you want to delete this message? It will be permanently removed from your inbox."}
                                </p>
                                <div className="flex gap-3 w-full">
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                                        className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={deleteModal.isDeleting}
                                        onClick={confirmDelete}
                                        className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                    >
                                        {deleteModal.isDeleting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Deleting...</span>
                                            </>
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header / Stats / Controls Compact Row */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">Messages</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {contacts.length} Total</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg py-1.5 pl-9 pr-3 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-400 shadow-sm"
                        />
                    </div>
                    <button
                        onClick={handleAddDummyMessage}
                        className="p-2 bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 rounded-lg transition-colors"
                        title="Add Test Message"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDeleteAllClick}
                        className="p-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete All"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
                <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead className="sticky top-0 bg-gray-50 z-10">
                            <tr className="text-xs uppercase tracking-wider text-gray-500 font-medium border-b border-gray-200">
                                <th className="px-4 py-3 w-[25%]">Contact</th>
                                <th className="px-4 py-3 w-[60%]">Message</th>
                                <th className="px-4 py-3 w-[15%] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="3" className="p-12 text-center text-gray-500">
                                        <div className="inline-block w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2" />
                                        <p className="text-xs">Loading...</p>
                                    </td>
                                </tr>
                            ) : paginatedContacts.length > 0 ? (
                                <AnimatePresence mode="popLayout">
                                    {paginatedContacts.map((contact, index) => (
                                        <motion.tr
                                            key={contact._id || index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="group hover:bg-gray-50 transition-colors text-sm"
                                        >
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                                        {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{contact.name}</div>
                                                        <div className="text-xs text-gray-500 font-mono">{contact.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <p className="text-gray-600 leading-relaxed text-xs md:text-sm line-clamp-2 md:line-clamp-3">
                                                    {contact.msg}
                                                </p>
                                                <p className="text-[10px] text-gray-400 mt-1">
                                                    {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ""}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 align-middle text-right">
                                                <button
                                                    onClick={() => handleDeleteByIdClick(contact._id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-12 text-center text-gray-400">
                                        <MessageSquare className="w-8 h-8 opacity-20 mx-auto mb-2" />
                                        <p>No messages found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="border-t border-gray-200 p-2 px-4 flex items-center justify-between text-xs bg-gray-50">
                        <span className="text-gray-500">Page {currentPage} of {totalPages}</span>
                        <div className="flex gap-1">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                                className="p-1.5 rounded bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white text-gray-600"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                                className="p-1.5 rounded bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white text-gray-600"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
