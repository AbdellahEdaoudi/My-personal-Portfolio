"use client";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import {apiRequest} from "../Components/apiRequest"
import RequireAuth from "../Components/RequireAuth"

function Admin() {
  const [contacts, setContacts] = useState([]);
  
 
  useEffect(() => {
    const GetContacts = async () => {
      try {
        const response = await apiRequest({
          method: 'get',
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/contact`,
        });
        setContacts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert("Your session has expired. Please log in again.");
          router.push("/Login");
        } else {
          // alert("Error fetching books");
        }
      }
    };

    GetContacts();
  }, [process.env.NEXT_PUBLIC_SERVER_URL]);

  const DeleteAll = async () => {
    try {
      await apiRequest({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/Contact`,
      });
      setContacts([]);
    } catch (error) {
      console.error('Error deleting all contacts:', error);
      alert('Failed to delete all contacts');
    }
  };

  const DeleteById = async (id) => {
    try {
      await apiRequest({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/Contact/${id}`,
      });
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  const AddMessages = async () => {
    try {
      const newMessages = { name: 'Abdellah Edaoudi', email: 'edaoudi@gmail.com', msg: 'Thank you' };
      await apiRequest({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/Contact`,
        data: newMessages,
      });
      setContacts((contact)=>[...contact,newMessages])
    } catch (error) {
      console.error('Error adding messages:', error);
      alert('Failed to add messages');
    }
  };


  return (
    <RequireAuth>
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-4 md:p-8">
          <h1 className="text-4xl cursor-pointer font-extrabold text-white mb-8">Manage Contacts</h1>
          <div className="flex mb-8 text-md">
          <Link href='/'
              className="bg-green-600 hover:bg-green-800 mr-4 text-white font-bold p-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              HOME
            </Link>
            <button
              onClick={DeleteAll}
              className="bg-red-600 hover:bg-red-800 text-white font-bold p-2 rounded-lg shadow-lg mr-4 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Delete All Contacts
            </button>
            <button
              onClick={AddMessages}
              className="bg-green-600 hover:bg-green-800 text-white font-bold p-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add Messages
            </button>
            
          </div>
          
          <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-x-auto">
  <table className="w-full table-auto">
    <thead className="bg-gray-200 text-center text-[8px] md:text-[14px] font-bold text-gray-600 uppercase tracking-wider">
      <tr>
        <th className="p-2">Name</th>
        <th className="p-2">Email</th>
        <th className="p-2">Message</th>
        <th className="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <tr key={contact._id} className="text-[8px] md:text-base text-center border-b border-gray-200">
            <td className="py-3 px-6 border">{contact.name}</td>
            <td className="py-3 px-6 border">{contact.email}</td>
            <td className="py-3 px-6 border">{contact.msg}</td>
            <td className="py-3 px-6 border">
              <button
                onClick={() => DeleteById(contact._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        [1, 2, 3].map((mp) => (
          <tr key={mp} className="border-b border-gray-200">
            <td className="py-4 px-6 w-1/4 bg-gray-200 rounded-lg animate-pulse"></td>
            <td className="py-4 px-6 w-1/4 bg-gray-200 rounded-lg animate-pulse"></td>
            <td className="py-4 px-6 w-1/2 bg-gray-200 rounded-lg animate-pulse"></td>
            <td className="py-4 px-6 w-1/4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white 
                font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 
                ease-in-out transform hover:scale-105"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>



     </div>
    </RequireAuth>
      
  );
}

export default Admin;



