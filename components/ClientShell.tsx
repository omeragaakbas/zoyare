"use client";

import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("./Cursor"), { ssr: false });
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ClientShell() {
  return (
    <>
      <Cursor />
      <ChatWidget />
    </>
  );
}
