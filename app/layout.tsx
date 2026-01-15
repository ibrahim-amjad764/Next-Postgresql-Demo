"use client";

import { useStore } from "../src/store/useStore";
import { useEffect } from "react";
import ReactQueryProvider from "../src/lib/react.query";
import "./globals.css"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dark = useStore((state) => state.dark);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <html lang="en" className="dark">
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}