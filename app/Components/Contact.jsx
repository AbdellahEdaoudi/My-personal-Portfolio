"use client";
import React, { useState } from "react";
const MailMinus = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    <path d="M16 19h6" />
  </svg>
)

const ArrowBigRight = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M6 9h6V5l7 7-7 7v-4H6V9z" />
  </svg>
)

const Send = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

function Contact({ content }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!content) return null;

  const PostContact = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !msg) {
      toast.error(content.validationError || "Please fill in all fields and provide a valid email.");
      setLoading(false);
      return;
    }

    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/Contact`,
        { name, email, msg },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      setName("");
      setEmail("");
      setMsg("");
      toast.success(content.successMessage || "Sent successfully", { autoClose: 1000 });
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
      className="bg-gray-50 pb-10 flex flex-col items-center pt-4"
    >
      <div className="text-center pb-10">
        <p className="text-4xl font-bold">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>
      <div className="md:flex justify-center md:space-x-20 md:space-y-0 space-y-5">
        {/* Contact Information */}
        <div className="w-64 text-center space-y-2">
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
              <Image src="/whatsapp.png" width={25} height={25} alt="whatsapp" />
            </li>
            <li>{content.whatsapp}</li>
            <li className="text-[12px] text-gray-400">+212 607071966</li>
            <li className="flex items-center text-gray-400 justify-center text-[12px]">
              {content.writeMe} <ArrowBigRight />
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="w-64 text-center space-y-6">
          <h4 className="text-center">{content.subtitle}</h4>
          <form onSubmit={PostContact} className="space-y-4">
            <input
              type="text"
              placeholder={content.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[13px] bg-gray-50 pl-4 py-3 w-72 rounded-lg border-2"
            />
            <input
              type="email"
              name="email"
              placeholder={content.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[13px] bg-gray-50 pl-4 py-3 w-72 rounded-lg border-2"
            />
            <textarea
              placeholder={content.messagePlaceholder}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="text-[13px] bg-gray-50 pl-4 py-3 w-72 rounded-lg border-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg items-center text-[14px]"
            >
              {loading ? (
                <>
                  {content.sendingButton} <i className="fa fa-spinner fa-spin"></i>
                </>
              ) : (
                <>
                  {content.sendButton} <Send />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Contact;
