"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleSignInButton() {
  // Define the event handler for the button click
  const handleClick = () => {
    signIn("google"); // Trigger sign-in via Google using NextAuth
  };

  // Render a button with an embedded Google logo and sign-in text
  return (
    <button
      onClick={handleClick} // Assign the event handler to the button's onClick event
      className="text-gray-700 text-sm font-bold mb-2 appearance-none border rounded w-full py-2 px-3 my-1"
    >
      <div className="flex items-center justify-center">
        <Image src="/google.png" alt="Google Logo" width={20} height={20} />
        <span className="ml-2">Anmelden mit Google</span>
        button
      </div>
    </button>
  );
}

export function GithubSignInButton() {
  // Define the event handler for the button click
  const handleClick = () => {
    signIn("github"); // Trigger sign-in via GitHub using NextAuth
  };

  // Render a button with an embedded GitHub logo and sign-in text
  return (
    <button
      onClick={handleClick} // Assign the event handler to the button's onClick event
      className="text-gray-700 text-sm font-bold mb-2 shadow appearance-none border rounded w-full py-2 px-3 my-1"
    >
      <div className="flex items-center justify-center">
        <Image src="/github.png" alt="Github Logo" width={20} height={20} />
        <span className="ml-2">Anmelden mit GitHub</span>
      </div>
    </button>
  );
}
