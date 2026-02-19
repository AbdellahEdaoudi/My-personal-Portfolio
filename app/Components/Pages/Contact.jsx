"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useToast } from "../Toast";
import Image from "next/image";
import { ArrowBigRight, MailMinus, Send } from "../Icons";

function Contact({ content }) {
    const toast = useToast();
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    if (!content) return null;

    const validate = () => {
        let tempErrors = {};
        if (!subject.trim()) tempErrors.subject = content.subjectRequired || "Subject is required";
        if (!email.trim()) {
            tempErrors.email = content.emailRequired || "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = content.emailInvalid || "Please enter a valid email address";
        }
        if (!message.trim()) tempErrors.message = content.messageRequired || "Message is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const PostContact = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validate()) {
            toast.error(content.formError || "Please correct the errors in the form.");
            return;
        }

        setLoading(true);

        try {
            await axios.post('/api/contact', { subject, email, message });
            setSubject("");
            setEmail("");
            setMessage("");
            setErrors({});
            toast.success(content.successMessage || "Sent successfully");
        } catch (error) {
            console.error(error);
            toast.error(content.errorMessage || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="Cnt"
            className=" pb-10 flex flex-col items-center pt-4 min-h-screen"
        >
            <div className="text-center pb-10">
                <p className="text-4xl font-bold">{content.title}</p>
                <p className="text-gray-400 text-sm">{content.subtitle}</p>
            </div>
            <div className="md:flex justify-center md:space-x-20 md:gap-20 md:space-y-0 space-y-5">
                {/* Contact Information */}
                <div className="w-64 mx-auto text-center space-y-2">
                    <h4 className="text-center">{content.title}</h4>
                    <ul className="bg-white space-y-1 py-4 rounded-lg border">
                        <li className="flex justify-center">
                            <MailMinus />
                        </li>
                        <li>{content.email}</li>
                        <li className="text-[12px] text-gray-400">
                            abdellahedaoudi80@gmail.com
                        </li>
                        <li className="flex items-center text-gray-400 justify-center text-[12px]">
                            {content.writeMe} <ArrowBigRight />
                        </li>
                    </ul>
                    <ul className="bg-white space-y-1 py-4 rounded-lg border">
                        <li className="flex justify-center">
                            <Image src="/icons/whatsapp.png" width={25} height={25} alt="whatsapp" />
                        </li>
                        <li>{content.whatsapp}</li>
                        <li className="text-[12px] text-gray-400">+212 607071966</li>
                        <li className="flex items-center text-gray-400 justify-center text-[12px]">
                            {content.writeMe} <ArrowBigRight />
                        </li>
                    </ul>
                </div>

                {/* Contact Form */}
                <div className="w-72 space-y-6">
                    <h4 className="text-center">{content.subtitle}</h4>
                    <form onSubmit={PostContact} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder={content.subjectPlaceholder}
                                maxLength={100}
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                    if (errors.subject) setErrors(prev => ({ ...prev, subject: null }));
                                }}
                                className={`text-[13px] bg-gray-50 pl-4 pr-4 py-3 w-72 rounded-lg border-2 ${errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-gray-800'}`}
                            />
                            <AnimatePresence>
                                {errors.subject && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-[10px] mt-1"
                                    >
                                        {errors.subject}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder={content.emailPlaceholder}
                                maxLength={100}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                                }}
                                className={`text-[13px] bg-gray-50 pl-4 pr-4 py-3 w-72 rounded-lg border-2 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-gray-800'}`}
                            />
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-[10px] mt-1"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <div>
                            <textarea
                                placeholder={content.messagePlaceholder}
                                maxLength={5000}
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    if (errors.message) setErrors(prev => ({ ...prev, message: null }));
                                }}
                                className={`text-[13px] bg-gray-50 pl-4 pr-4 py-3 w-72 rounded-lg border-2 ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-gray-800'}`}
                            />
                            <AnimatePresence>
                                {errors.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-[10px] mt-1"
                                    >
                                        {errors.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg items-center text-[14px] disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    {content.sendingButton} <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </div>
                            ) : (
                                <>
                                    {content.sendButton} <Send />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
