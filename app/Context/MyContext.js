"use client"

import { createContext, useEffect, useState } from "react";


export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [EnOrFr, setEnOrFr] = useState("en");


  return (
    <MyContext.Provider value={{EnOrFr,setEnOrFr}}>
      {children}
    </MyContext.Provider>
  );
};
