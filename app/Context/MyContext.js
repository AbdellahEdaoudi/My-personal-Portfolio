"use client"

import { createContext, useEffect, useState } from "react";


export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [EnOrFr, setEnOrFr] = useState(
    () => typeof window !== 'undefined' ? localStorage.getItem("EnOrFr") : null || "en");
  useEffect(() => {
    localStorage.setItem("EnOrFr", EnOrFr);
  }, [EnOrFr]);
  return (
    <MyContext.Provider value={{EnOrFr,setEnOrFr}}>
      {children}
    </MyContext.Provider>
  );
};
