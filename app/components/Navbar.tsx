"use client";
import React, { useState } from "react"; // Importiere useState
import Image from "next/image";
import Link from "next/link";
import SignInButton from "../ui/SignInButton";

const Navbar = () => {
  // Zustand für die Menüanzeige
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="w-8 h-8">
              <Image
                src="/favicon.png"
                alt="Logo"
                height={50}
                width={50}
                quality={100}
                className="rounded-full"
              />
            </Link>
            <Link href="/" className="text-xl font-bold hidden sm:block">
              Swiss Army Legends
            </Link>
          </div>
          {/* Responsive Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger Icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* Menu items visible only when menu is open or on wider screens */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex items-center space-x-3`}
          >
            <Link
              href="/blogs"
              className="hover:text-gray-400 dark:hover:text-white rounded-md text-sm font-medium"
            >
              Blogs
            </Link>
            <Link
              href="/forum"
              className="hover:text-gray-400 dark:hover:text-white rounded-md text-sm font-medium"
            >
              Forum
            </Link>
            <Link
              href="/fotos"
              className="hover:text-gray-400 dark:hover:text-white rounded-md text-sm font-medium"
            >
              Fotos
            </Link>
            <Link
              href="/informationen"
              className="hover:text-gray-400 dark:hover:text-white rounded-md text-sm font-medium"
            >
              Infos
            </Link>
            <SignInButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
