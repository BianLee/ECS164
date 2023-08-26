"use client";

// import HomePage from "@/components/homepage";

import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/components/homepage"), { ssr: false });

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
