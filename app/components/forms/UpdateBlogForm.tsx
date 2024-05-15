"use client";

import React, { useRef, useState } from "react";
import { deleteBlog, updateBlog } from "@/actions/actions";
import Button from "@/app/ui/Button";
import { CldUploadWidget } from "next-cloudinary";

const UpdateBlogForm = ({ blog }: { blog: any }) => {
  const { id, title, description, category } = blog || {}; // Destructure blog props
  const [imageUrl, setImageUrl] = useState(blog?.imageUrl || ""); // State to hold the image URL

  const ref = useRef<HTMLFormElement>(null); // Ref for the form for resetting purposes

  // Handler for deleting a blog
  const handleDeleteBlog = async () => {
    const isDelete = confirm(
      "Bist du dir sicher, dass du diesen Beitrag löschen willst?"
    );
    if (isDelete) {
      await deleteBlog(id); // Call deleteBlog if user confirms
      alert("Beitrag erfolgreich gelöscht.");
    }
  };

  // Handler for submitting updates to a blog
  const handleUpdateBlog = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = {
      title: event.currentTarget.title.value, // Extract the title from the form
      description: event.currentTarget.description.value, // Extract the description
      category: event.currentTarget.category.value, // Extract the selected category
      imageUrl: imageUrl, // Use the current image URL
    };
    await updateBlog(id, formData); // Update the blog with new data
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
  ]; // Blog categories

  return (
    <form
      ref={ref}
      onSubmit={handleUpdateBlog}
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
          htmlFor="title"
          className="block text-sm font-medium text-gray-600"
        >
          Titel
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={title}
          className="mt-1 p-2 w-full border text-gray-600 rounded-md"
          placeholder="Titel eingeben"
          required
        />
      </div>

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
        onClick={handleDeleteBlog}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Löschen
      </button>
      <Button label={"Beitrag anpassen"} color={"green"} />
    </form>
  );
};

export default UpdateBlogForm;
