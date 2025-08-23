"use client";
import React, { useState, useContext } from "react";
import { MailMinus, ArrowBigRight, Send } from "lucide-react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from "../Context/MyContext";
const ContactText = {
  en: {
    title: "Get in Touch",
    subtitle: "Contact Me",
    namePlaceholder: "Insert your name",
    emailPlaceholder: "Insert your email",
    messagePlaceholder: "Write your message",
    sendButton: "Send Message",
    sendingButton: "Sending Message",
  },
  fr: {
    title: "Contactez-moi",
    subtitle: "Contactez-moi",
    namePlaceholder: "Entrez votre nom",
    emailPlaceholder: "Entrez votre email",
    messagePlaceholder: "Écrivez votre message",
    sendButton: "Envoyer le message",
    sendingButton: "Envoi en cours",
  },
};


function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { EnOrFr } = useContext(MyContext);
  const text = ContactText[EnOrFr];

  const PostContact = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !msg) {
      toast.error("Please fill in all fields and provide a valid email.");
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
      toast.success("Sent successfully", { autoClose: 1000 });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
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
        <p className="text-4xl font-bold">{text.title}</p>
        <p className="text-gray-400 text-sm">{text.subtitle}</p>
      </div>
      <div className="md:flex justify-center md:space-x-20 md:space-y-0 space-y-5">
        {/* Contact Information */}
        <div className="w-64 text-center space-y-2">
          <h4 className="text-center">{text.title}</h4>
          <ul className="bg-white space-y-1 py-4 rounded-lg border">
            <li className="flex justify-center">
              <MailMinus />
            </li>
            <li>Email</li>
            <li className="text-[12px] text-gray-400">
              abdellahedaoudi80@gmail.com
            </li>
            <li className="flex items-center text-gray-400 justify-center text-[12px]">
              {EnOrFr === "en" ? "Write me" : "Écrivez-moi"} <ArrowBigRight />
            </li>
          </ul>
          <ul className="bg-white space-y-1 py-4 rounded-lg border">
            <li className="flex justify-center">
              <img src="./whatsapp.png" width={25} alt="whatsapp" />
            </li>
            <li>WhatsApp</li>
            <li className="text-[12px] text-gray-400">+212 607071966</li>
            <li className="flex items-center text-gray-400 justify-center text-[12px]">
              {EnOrFr === "en" ? "Write me" : "Écrivez-moi"} <ArrowBigRight />
            </li>
          </ul>
          {/* <ul className="bg-white space-y-1 py-4 rounded-lg border">
            <li className="flex justify-center">
              <img src="./messenger.png" width={32} alt="messenger" />
            </li>
            <li>Messenger</li>
            <li className="text-[12px] text-gray-400"></li>
            <li className="flex items-center text-gray-400 justify-center text-[12px]">
              {EnOrFr === "en" ? "Write me" : "Écrivez-moi"} <ArrowBigRight />
            </li>
          </ul> */}
        </div>

        {/* Contact Form */}
        <div className="w-64 text-center space-y-6">
          <h4 className="text-center">{text.subtitle}</h4>
          <form onSubmit={PostContact} className="space-y-4">
            <input
              type="text"
              placeholder={text.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[13px] bg-gray-50 pl-4 py-3 w-72 rounded-lg border-2"
            />
            <input
              type="email"
              name="email"
              placeholder={text.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[13px] bg-gray-50 pl-4 py-3 w-72 rounded-lg border-2"
            />
            <textarea
              placeholder={text.messagePlaceholder}
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
                  {text.sendingButton} <i className="fa fa-spinner fa-spin"></i>
                </>
              ) : (
                <>
                  {text.sendButton} <Send />
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
