"use client";
import React, { useState } from "react";
import { MailMinus, ArrowBigRight, Send } from "lucide-react";
import Axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const PostContact = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !msg || !emailRegex.test(email)) {
      alert("Please fill in all fields and provide a valid email.");
      return;
    }

    try {
      const response = await Axios.post(
        "https://contact-my-portfolio.vercel.app/Contact",
        { name, email, msg },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      setName("");
      setEmail("");
      setMsg("");
      alert("sent succesfully");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section id="Cnt" className="bg-gray-50 pb-10 flex flex-col items-center">
      <div className="text-center pb-10 ">
        <p className="text-4xl font-bold">Get in touch</p>
        <p className="text-gray-400 text-sm">Contact Me</p>
      </div>
      <div>
        <div className="md:flex  justify-center md:space-x-20 md:space-y-0 space-y-5">
          <div className="  w-64 text-center space-y-2">
            <h4 className="text-center">Talk to me</h4>
            <ul className="bg-white space-y-1 py-4 rounded-lg border">
              <li className="flex justify-center">
                <MailMinus />
              </li>
              <li>Email</li>
              <li className="text-[12px] text-gray-400">
                abdellahedaoudi80@gmail.com
              </li>
              <li className="flex items-center text-gray-400 justify-center text-[12px]">
                Write me <ArrowBigRight />
              </li>
            </ul>
            <ul className="bg-white hidden space-y-1 py-4 rounded-lg border">
              <li className="flex justify-center">
                <img src="./whatsapp.png" width={25} alt="wh" />
              </li>
              <li>Whatassap</li>
              <li className="text-[12px] text-gray-400">+212 607071966</li>
              <li className="flex items-center text-gray-400 justify-center text-[12px]">
                Write me <ArrowBigRight />
              </li>
            </ul>
            <ul className="bg-white space-y-1 py-4 rounded-lg border">
              <li className="flex justify-center">
                <img src="./messenger.png" width={32} alt="wh" />
              </li>
              <li>Messenger</li>
              <li className="text-[12px] text-gray-400"></li>
              <li className="flex items-center text-gray-400 justify-center text-[12px]">
                Write me <ArrowBigRight />
              </li>
            </ul>
          </div>

          <div className="w-64 text-center space-y-6">
            <h4 className="text-center ">Write me your project</h4>
            <ul>
              <li>
                <input
                  type="text"
                  placeholder="insert your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="text-[13px] bg-gray-50 pl-4 md:-mt-3 py-3 w-72 rounded-lg border-2"
                />
              </li>
            </ul>
            <ul>
              <li>
                <input
                  type="email"
                  placeholder="insert your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="text-[13px] bg-gray-50 pl-4 py-3 w-72 rounded-lg border-2"
                />
              </li>
            </ul>
            <ul>
              <li>
                <textarea
                  placeholder="Write your message"
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  className="text-[13px] caret--500 bg-gray-50 pl-4 py-3 w-72 rounded-lg border-2"
                />
              </li>
            </ul>
            <ul>
              <button
                onClick={PostContact}
                className="flex gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg items-center text-[14px]"
              >
                Send Message <Send />
              </button>{" "}
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default Contact;
