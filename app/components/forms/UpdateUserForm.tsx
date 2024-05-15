"use client";
import { updateUser } from "@/actions/actions";
import Button from "@/app/ui/Button";
import { useRef, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

const UpdateUserForm = ({ user }: { user: any }) => {
  const { id, username, email, password, userImage } = user || {}; // Destructure user details

  const ref = useRef<HTMLFormElement>(null); // Use ref to access the form element directly
  const [imageUrl, setImageUrl] = useState(userImage || ""); // State to hold the user image URL
  const [error, setError] = useState(""); // State to manage error messages

  // Handler function for submitting the update form
  const handleUpdateUser = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = {
      username: event.currentTarget.username.value, // Collect username from the form
      email: event.currentTarget.email.value, // Collect email from the form
      password: event.currentTarget.password.value, // Collect password from the form
      userImage: imageUrl, // Use the current image URL
    };
    try {
      await updateUser(id, formData); // Update the user data
      ref.current?.reset(); // Reset the form after successful submission
    } catch (error: any) {
      setError(
        error.message || "Benutzernamen oder Email ist bereits vorhanden"
      ); // Set error message
    }
  };

  // Handler for successful image uploads
  const handleUploadSuccess = (uploadResult: any) => {
    setImageUrl(uploadResult.info?.url); // Update the image URL on successful upload
  };

  return (
    <form
      ref={ref}
      onSubmit={handleUpdateUser}
      className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md"
    >
      <h2 className="text-2xl text-gray-800 font-semibold mb-6">
        Benutzer anpassen
      </h2>

      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Bild ändern
          </button>
        )}
      </CldUploadWidget>

      {userImage && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Vorschau
          </label>
          <img
            src={imageUrl}
            alt="Benutzerbild"
            className="mt-1 w-full rounded-md shadow-sm"
          />
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-600"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={username}
          className="mt-1 p-2 w-full border text-gray-600 rounded-md"
          placeholder="Benutzernamen eingeben"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          defaultValue={email}
          className="mt-1 p-2 text-gray-600 w-full border rounded-md"
          placeholder="Email eingeben"
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
        />
      </div>

      <Button label={"Benutzer anpassen"} color={"green"} />
      <button
        onClick={() => {
          location.href = `/profil/${user?.id}`;
        }}
        type="button"
      >
        Zurück
      </button>
      <div>
        {error && (
          <span className="text-red-600 mx-2 px-2 text-center">{error}</span>
        )}
      </div>
    </form>
  );
};

export default UpdateUserForm;
