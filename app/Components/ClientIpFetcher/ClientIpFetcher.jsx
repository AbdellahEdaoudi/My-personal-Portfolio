"use client";

import { useEffect } from "react";
import axios from "axios";

export default function ClientIpFetcher() {
  useEffect(() => {
    const fetchIp = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/opera`);
      } catch (err) {
        // يمكن إلغاء التعليق لطباعة الأخطاء إذا أردت
        // console.error("Error fetching IP:", err.response?.data || err.message);
      }
    };

    fetchIp();
  }, []);

  return null; 
}
