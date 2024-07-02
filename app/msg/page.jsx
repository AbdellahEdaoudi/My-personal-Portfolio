"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function DeleteContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    if (password === '1234') {
      setAuthenticated(true);
      fetchContacts();
    } else {
      setAuthenticated(false);
      setContacts([]);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://contact-my-portfolio.vercel.app/Contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete('https://contact-my-portfolio.vercel.app/Contact');
      setContacts([]);
    } catch (error) {
      console.error('Error deleting all contacts:', error);
      alert('Failed to delete all contacts');
    }
  };

  const handleDeleteById = async (id) => {
    try {
      await axios.delete(`https://contact-my-portfolio.vercel.app/Contact/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  const handleAddMessages = async () => {
    try {
      const newMessages = { name: 'Abdellah Edaoudi', email: 'edaoudi@gmail.com', msg: 'Thank you' };
      await axios.post('https://contact-my-portfolio.vercel.app/Contact', newMessages);
      fetchContacts();
    } catch (error) {
      console.error('Error adding messages:', error);
      alert('Failed to add messages');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    checkAuthentication();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-8">
      {!authenticated ? (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Enter Password to Access</h1>
          <form onSubmit={handleSubmitPassword} className="flex items-center">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
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
          <h1 className="text-4xl font-extrabold text-white mb-8">Manage Contacts</h1>
          <div className="flex mb-8">
          <Link href='/'
              
              className="bg-green-600 hover:bg-green-800 mr-4 text-white font-bold py-2 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              HOME
            </Link>
            <button
              onClick={handleDeleteAll}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-8 rounded-lg shadow-lg mr-4 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Delete All Contacts
            </button>
            <button
              onClick={handleAddMessages}
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
            {contacts.map(contact => (
              <div key={contact._id} className="flex border-b border-gray-200">
                <div className="py-4 px-6 w-1/4">{contact.name}</div>
                <div className="py-4 px-6 w-1/4">{contact.email}</div>
                <div className="py-4 px-6 w-1/2">{contact.msg}</div>
                <div className="py-4 px-6 w-1/4">
                  <button
                    onClick={() => handleDeleteById(contact._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DeleteContactsPage;



