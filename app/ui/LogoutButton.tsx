"use client";

import { signOut } from "next-auth/react";

const LogoutButton = ({ label }: { label: string }) => {
  return (
    <button
      className="bg-red-600 px-1 rounded-md text-white text-sm font-medium"
      onClick={() => signOut()}
    >
      {label}
    </button>
  );
};

export default LogoutButton;
