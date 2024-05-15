"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const RegisterPage = () => {
  const ref = useRef<HTMLFormElement>(null);
  const { data: session, status } = useSession(); // Retrieves session data and status from authentication
  const router = useRouter(); // Initialize router for navigation

  // Effect that redirects user when authenticated
  useEffect(() => {
    // Redirect to home if the user is already authenticated
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // State for managing user input and form submission status
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  }); // State for storing user input
  const [pending, setPending] = useState(false); // State for managing loading status
  const [error, setError] = useState(""); // State for storing error messages

  // Handles changes in form inputs and updates state
  const handleChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value, // Updates the corresponding field in the userInfo object
    });
  };

  // Handles form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Validate user input
    if (!userInfo.username || !userInfo.email || !userInfo.password) {
      setError("Bitte fülle alle Felder aus"); // Set error if any field is empty
      return;
    }
    try {
      setPending(true); // Indicate the start of a registration process
      // API call to register the user
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      if (res.ok) {
        setPending(false); // Reset pending status
        if (ref.current) {
          ref.current.reset(); // Reset form if the reference is valid
        }
        router.push("/auth/login"); // Redirect to login page after successful registration
      } else {
        const errorData = await res.json(); // Parse error message from the response
        setError(errorData?.message); // Set error message
        setPending(false); // Reset pending status
      }
    } catch (error) {
      setError("Ein Fehler ist aufgetreten"); // Set error message on exception
      return;
    }
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label
            className="block text-black text-sm font-medium mb-2"
            htmlFor="username"
          >
            Benutzername
          </label>
          <input
            className="appearance-none block w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="username"
            type="text"
            placeholder="Benutzername"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
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
            className="block text-black text-sm font-medium mb-2"
            htmlFor="password"
          >
            Passwort
          </label>
          <input
            className="appearance-none block w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="password"
            type="password"
            placeholder="Passwort"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
        <div className="flex items-center justify-between">
          <button
            disabled={pending}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-150 ease-in-out"
            type="submit"
          >
            {pending ? "Registierung läuft" : "Registrieren"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
