"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CreateButton = ({ url, label }: { url: string; label: string }) => {
  //get session information
  const { data: session } = useSession();
  //if no session don't show button
  if (!session) return null;

  return (
    <Link
      href={url}
      className="block mx-4 mt-2 px-3 py-2 rounded-md border text-center bg-green-600 text-white font-medium text-sm sm:text-base md:w-1/4 lg:w-1/6"
    >
      {label}
    </Link>
  );
};

export default CreateButton;
