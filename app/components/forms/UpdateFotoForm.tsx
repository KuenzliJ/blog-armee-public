"use client";

import React, { useRef, useState } from "react";
import { deleteFoto, updateFoto } from "@/actions/actions";
import Button from "@/app/ui/Button";
import { CldUploadWidget } from "next-cloudinary";

const UpdateFotoForm = ({ foto }: { foto: any }) => {
  const { id, description, category } = foto || {}; // Destructure foto details or default to an empty object
  const [imageUrl, setImageUrl] = useState(foto?.imageUrl || ""); // State to hold the image URL

  const ref = useRef<HTMLFormElement>(null); // Ref to access the form element directly

  // Handler function for deleting a foto
  const handleDeleteFoto = async () => {
    const isDelete = confirm(
      "Bist du dir sicher, dass du diesen Beitrag löschen willst?"
    ); // Confirmation dialog
    if (isDelete) {
      await deleteFoto(id); // Delete the foto if confirmed
      alert("Beitrag erfolgreich gelöscht."); // Notify user of deletion
      // Optional: Redirect the user after deletion
    }
  };

  // Handler function for updating a foto
  const handleUpdateFoto = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = {
      description: event.currentTarget.description.value, // Get description from form
      category: event.currentTarget.category.value, // Get selected category from form
      imageUrl: imageUrl, // Use the current image URL
    };
    await updateFoto(id, formData); // Update the foto with new data
    ref.current?.reset(); // Reset the form after submission
  };

  // Handler for successful image uploads
  const handleUploadSuccess = (uploadResult: any) => {
    setImageUrl(uploadResult.info?.url); // Set the image URL upon successful upload
  };

  const categories = [
    "Rekrutenschule",
    "Wiederholungskurs",
    "Karriere",
    "Ausrüstung und Technik",
    "International",
  ]; // Foto categories

  return (
    <form
      ref={ref}
      onSubmit={handleUpdateFoto}
      className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl text-gray-800 font-semibold mb-6">
        Beitrag anpassen
      </h2>

      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => open()}
            className="mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Bild ändern
          </button>
        )}
      </CldUploadWidget>

      {imageUrl && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Vorschau
          </label>
          <img
            src={imageUrl}
            alt="Foto"
            className="mt-1 w-full rounded-md shadow-sm"
          />
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600"
        >
          Inhalt
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={description}
          rows={4}
          className="mt-1 p-2 text-gray-600 w-full border rounded-md"
          placeholder="Beschreibung eingeben"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-600"
        >
          Kategorie
        </label>
        <select
          id="category"
          name="category"
          defaultValue={category}
          className="mt-1 p-2 text-gray-600 w-full border rounded-md"
          required
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleDeleteFoto}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Löschen
      </button>
      <Button label={"Beitrag anpassen"} color={"green"} />
    </form>
  );
};

export default UpdateFotoForm;
