"use client";
import Link from "next/link";
import { useSession } from "next-auth/react"


const SignInButton = () => {
  const session:any = useSession()
  if (session?.status === "authenticated") {
    return <Link href={`/profil/${session?.data?.user?.id}`} className="hover:text-gray-400 dark:hover:text-white rounded-md text-sm font-medium">Profil</Link>
  }
  return (
    <Link href={"/auth/login"} className="bg-green-600 px-1 rounded-md text-white text-sm font-medium">
            Anmelden</Link>
  );
}

export default SignInButton;
