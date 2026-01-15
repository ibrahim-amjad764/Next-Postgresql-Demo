"use client";

import { useStore } from "../src/store/useStore";

export default function Home() {
  const darkMode = useStore((state) => state.dark);
  const toggleDarkMode = useStore((state) => state.toggleDark);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-8 shadow-lg">
        <h1 className="text-4xl font-extrabold text-center dark:text-gray-300   dark:bg-zinc-900  ">
          Next-JS-PostreSQL
        </h1>

        <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
         <i> Build fast. Ship faster. Scale smarter.</i>
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={toggleDarkMode} className="w-full text-lg text-blue-600 rounded-md">Switch to {darkMode ? "Light" : "Dark"} Mode
          </button>

          <a href="/dashboard"
            className="w-full text-center rounded-lg border border-gray-300 dark:border-gray-700 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition " >Go to Dashboard 
          </a>
        </div>
      </div>
    </main>
  );
}

