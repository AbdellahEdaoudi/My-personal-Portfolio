"use client";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';


function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [password, setPassword] = useState("");
  const [CheckPass, setCheckPass] = useState(false);
  const [Ereur, setEreur] = useState("");
  useEffect(()=>{
    const  LocalPassworde = localStorage.getItem("NEXT_PUBLIC_PASSWORD")
    if (LocalPassworde == "true") {
      setCheckPass(true)
    }else{
      setCheckPass(false)
    }
  },[CheckPass])

  const onSubmit = ()=>{
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      localStorage.setItem("NEXT_PUBLIC_PASSWORD","true")
    } else {
      localStorage.setItem("NEXT_PUBLIC_PASSWORD","false")
      setEreur("")
    } 
  } 
  
  const GetContacts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/Contact`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  useEffect(()=>{
    GetContacts();
  },[])
  const DeleteAll = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/Contact`);
      setContacts([]);
    } catch (error) {
      console.error('Error deleting all contacts:', error);
      alert('Failed to delete all contacts');
    }
  };
  const DeleteById = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/Contact/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };
  const AddMessages = async () => {
    try {
      const newMessages = { name: 'Abdellah Edaoudi', email: 'edaoudi@gmail.com', msg: 'Thank you' };
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/Contact`, newMessages);
      await GetContacts();
    } catch (error) {
      console.error('Error adding messages:', error);
      alert('Failed to add messages');
    }
  };


  return (
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-8">
      {!CheckPass ? (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Enter Password to Access</h1>
          <form onSubmit={onSubmit} className="flex items-center">
            <input
              type="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Password"
              className="bg-gray-200 rounded-lg py-2 px-4 mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <h1
          onClick={()=>{localStorage.removeItem("NEXT_PUBLIC_PASSWORD");
            setCheckPass(false)
          }}
          className="text-4xl cursor-pointer font-extrabold text-white mb-8">Manage Contacts</h1>
          <div className="flex mb-8">
          <Link href='/'
              
              className="bg-green-600 hover:bg-green-800 mr-4 text-white font-bold py-2 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              HOME
            </Link>
            <button
              onClick={DeleteAll}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-8 rounded-lg shadow-lg mr-4 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Delete All Contacts
            </button>
            <button
              onClick={AddMessages}
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add Messages
            </button>
            
          </div>
          <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex bg-gray-200 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
              <div className="py-3 px-6 w-1/4">Name</div>
              <div className="py-3 px-6 w-1/4">Email</div>
              <div className="py-3 px-6 w-1/2">Message</div>
              <div className="py-3 px-6 w-1/4">Actions</div>
            </div>
            {contacts.length > 0 ? (
              contacts.map(contact => (
                <div key={contact._id} className="flex border-b border-gray-200">
                  <div className="py-4 px-6 w-1/4">{contact.name}</div>
                  <div className="py-4 px-6 w-1/4">{contact.email}</div>
                  <div className="py-4 px-6 w-1/2">{contact.msg}</div>
                  <div className="py-4 px-6 w-1/4">
                    <button
                      onClick={() => DeleteById(contact._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ):(
                [1,2,3].map((mp)=>{
                  return(
                    <div className="flex border-b border-gray-200">
                  <div className="my-4 mx-6 w-1/4 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="my-4 mx-6 w-1/4 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="my-4 mx-6 w-1/2 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="py-4 px-6 w-1/4">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white 
                      font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 
                      ease-in-out transform hover:scale-105 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
                  )
                })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ContactsPage;



