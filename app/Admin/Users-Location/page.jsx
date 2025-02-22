"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiRequest } from "../../Components/apiRequest";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const Page = () => {
  const [ips, setIps] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const fetchIps = async () => {
      try {
        const res = await apiRequest({ method: "get", url: `${API_URL}/ips` });
        setIps(res.data);
      } catch (err) {
        console.error("Error fetching IPs:", err);
      }
    };
    fetchIps();
  }, []);

  const deleteIp = async (id) => {
    setLoadingId(id);
    try {
      await apiRequest({ method: "delete", url: `${API_URL}/ips/${id}` });
      setIps((prevIps) => prevIps.filter((ip) => ip._id !== id));
    } catch (err) {
      console.error("Error deleting IP:", err);
    }
    setLoadingId(null);
  };

  const uniqueCountries = [
    ...new Set(ips.map((ip) => ip.ipInfo?.country).filter(Boolean)),
  ];

  const filteredIps = selectedCountry
    ? ips.filter((ip) => ip.ipInfo?.country === selectedCountry)
    : ips;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Country flags */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {uniqueCountries.map((countryCode) => (
          <button
            key={countryCode}
            onClick={() => setSelectedCountry(countryCode)}
            className={`p-2 border rounded-lg shadow-md ${
              selectedCountry === countryCode ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            <Image
              width={40}
              height={40}
              src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
              alt={countryCode}
            />
          </button>
        ))}

        {selectedCountry && (
          <button
            onClick={() => setSelectedCountry(null)}
            className="p-2 bg-red-500 text-white rounded-lg shadow-md"
          >
            Reset
          </button>
        )}
      </div>

      {/* IP List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIps.map((ipData) => (
          <div key={ipData._id} className="bg-white p-5 rounded-lg shadow-md mb-6 flex flex-col justify-between">
            {/* Data Ips */}
            <div>
              <h2 className="text-xl font-semibold">{ipData.ipaddress}</h2>
              <p className="text-gray-700">{ipData.ipInfo?.org}</p>
              <p className="text-gray-500">
                {ipData.ipInfo?.city}, {ipData.ipInfo?.region}, {ipData.ipInfo?.country}
              </p>

              {/* Timestamps Section */}
              {ipData.timestamps && ipData.timestamps.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-md font-semibold text-gray-800">Timestamps:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {ipData.timestamps.map((timestamp, index) => (
                      <li key={index} className="text-sm">
                        {new Date(timestamp).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Maps And delete */}
            <div className="flex gap-2 mt-3 items-center">
              <Link
                href={`https://www.google.com/maps?q=${ipData.ipInfo.loc}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                View on Google Maps
              </Link>

              {/* Delete Button with Loading State */}
              <button
                onClick={() => deleteIp(ipData._id)}
                className={`px-4 py-2 rounded-lg transition ${
                  loadingId === ipData._id
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                disabled={loadingId === ipData._id}
              >
                {loadingId === ipData._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
