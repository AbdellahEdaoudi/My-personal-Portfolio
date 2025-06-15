"use client";

import { usePathname } from "next/navigation";
import Header from "../Header";

export default function ClientHeader() {
  const path = usePathname();
  return <Header nm={path} />;
}
