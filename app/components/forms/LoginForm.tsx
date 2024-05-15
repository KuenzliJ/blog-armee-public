"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useEffect } from "react";

const LoginForm = () => {
  const { data: session, status } = useSession(); // Use the useSession hook to access the current session and authentication status
  const ref = useRef<HTMLFormElement>(null); // useRef to refer to the form element for operations like resetting
  const router = useRouter(); // Initialize the router to handle page navigation

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect the user to the home page if they are already authenticated
    }
  }, [status, router]); // Dependency array includes status and router to react to changes in these variables

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  }); // State to hold the user's input for email and password

  const [pending, setPending] = useState(false); // State to manage the loading state of the form submission
  const [error, setError] = useState(""); // State to store any error messages

  // Function to update state based on user input
  const handleChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!userInfo.email || !userInfo.password) {
      setError("Füllen Sie alle Felder aus"); // Check if all fields are filled
      return;
    }
    try {
      setPending(true); // Indicate that the form submission is in progress

      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false, // Do not redirect after signIn
        callbackUrl: process.env.NEXTAUTH_URL, // Specify where to redirect after successful sign in
      });

      if (res && !res.ok) {
        setError("Probleme beim Anmelden"); // Handle any errors that occur during signIn
      }

      if (res && res.error) {
        setError("Falsche Anmeldeinformationen"); // Specific error for invalid credentials
        setPending(false);
        return;
      }

      setPending(false); // Reset pending status after handling the response
    } catch (error) {
      setPending(false);
      setError("Etwas ist schief gelaufen"); // Catch and handle any unexpected errors
    }
  };
  return (
    <form
      ref={ref}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Passwort
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          name="password"
          value={userInfo.password}
          required
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        {error && <span className="text-red-600 mx-2 px-2">{error}</span>}
        <button
          disabled={pending === true}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {pending ? "Anmeldung läuft" : "Anmelden"}
        </button>

        <Link href={"/auth/register"}>
          <span className="bg-green-600 mx-2 px-2 py-1 rounded-lg">
            Registrieren
          </span>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
