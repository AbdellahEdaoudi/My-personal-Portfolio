"use client";
import React, { useState, useEffect } from "react";
import { apiRequest } from "../../Components/apiRequest";
import {
    MessageSquare,
    Trash2,
    Search,
    Plus,
    User,
    Mail,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Messages() {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Increased for compact view

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

    const handleDeleteAll = async () => {
        if (!window.confirm("Are you sure you want to delete ALL messages?")) return;
        try {
            await apiRequest({ method: "delete", url: `${API_URL}/Contact` });
            setContacts([]);
            toast.success("All messages deleted.");
        } catch (error) {
            toast.error("Failed to delete messages.");
        }
    };

    const handleDeleteById = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            await apiRequest({ method: "delete", url: `${API_URL}/Contact/${id}` });
            setContacts((prev) => prev.filter((contact) => contact._id !== id));
            toast.success("Message deleted.");
        } catch (error) {
            toast.error("Failed to delete contact.");
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
        <div className="h-full flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full">
            {/* Header / Stats / Controls Compact Row */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">Messages</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {contacts.length} Total</span>
                        <span className="w-px h-3 bg-gray-200"></span>
                        <span className="flex items-center gap-1 text-emerald-600">
                            <Plus className="w-3 h-3" />
                            {contacts.filter(c => new Date(c.createdAt || Date.now()).toDateString() === new Date().toDateString()).length} New
                        </span>
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
                        onClick={handleDeleteAll}
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
                                                    onClick={() => handleDeleteById(contact._id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
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
