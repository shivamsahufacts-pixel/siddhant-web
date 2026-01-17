"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      if (!savedTheme) {
        localStorage.setItem("theme", "dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--bg)] text-[var(--text-color)] shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/logos.png"
            alt="Logo"
            className="h-12"
          />
        </Link>

        {/* NAV + TOGGLE */}
        <div className="flex items-center space-x-10">

          {/* NAVIGATION */}
          <nav className="space-x-4 hidden sm:block">
            <Link href="#hero" className="hover:text-yellow-400">
              Home
            </Link>

            <Link href="#about" className="hover:text-yellow-400">
              About
            </Link>

            <Link href="#project" className="hover:text-yellow-400">
              Portfolio
            </Link>

            <Link href="#learning" className="hover:text-yellow-400">
              Learning
            </Link>

            <Link href="#services" className="hover:text-yellow-400">
              Services
            </Link>

            <Link href="#contact" className="hover:text-yellow-400">
              Contact
            </Link>

            <Link href="/admin" className="hover:text-yellow-400">
              Admin
            </Link>
          </nav>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 bg-[var(--accent)] text-white px-2 py-2 rounded-md shadow-md hover:scale-105 transition duration-300"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? (
              <MoonIcon className="w-5 h-5 text-gray-100" />
            ) : (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
