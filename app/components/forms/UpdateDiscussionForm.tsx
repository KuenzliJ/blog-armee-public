"use client";
import React, { useRef } from "react";
import { deleteDiscussion, updateDiscussion } from "@/actions/actions";
import Button from "@/app/ui/Button";

const UpdateDiscussionForm = ({ discussion }: { discussion: any }) => {
  const { id, title, description, category } = discussion || {}; // Destructure discussion details or default to an empty object
  const categories = [
    "Rekrutenschule",
    "Wiederholungskurs",
    "Karriere",
    "Ausrüstung und Technik",
    "International",
  ]; // Define possible discussion categories
  const ref = useRef<HTMLFormElement>(null); // Use ref to directly interact with the form element

  // Handler function for deleting a discussion
  const handleDeleteDiscussion = async () => {
    const isDelete = confirm(
      "Bist du dir sicher, dass du diesen Beitrag löschen willst?"
    ); // Confirmation dialog
    if (isDelete) {
      await deleteDiscussion(id); // Delete the discussion if confirmed
      alert("Beitrag erfolgreich gelöscht."); // Notify user of deletion
      // Optionally, redirect the user after deletion
    }
  };

  // Handler function for updating a discussion
  const handleUpdateDiscussion = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = {
      title: event.currentTarget.title.value, // Get title from form
      description: event.currentTarget.description.value, // Get description from form
      category: event.currentTarget.category.value, // Get category from form
    };
    await updateDiscussion(id, formData); // Update the discussion with new data
    ref.current?.reset(); // Reset the form after submission
  };
  return (
    <form
      ref={ref}
      onSubmit={handleUpdateDiscussion}
      className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md"
    >
      <h2 className="text-2xl text-gray-800 font-semibold mb-6">
        Diskussion anpassen
      </h2>

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
          defaultValue={title || ""}
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
          Beschreibung
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={description || ""}
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
          defaultValue={category || ""}
          className="mt-1 p-2 text-gray-600 w-full border rounded-md"
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleDeleteDiscussion}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Löschen
      </button>
      <Button label={"Beitrag anpassen"} color={"green"} />
    </form>
  );
};

export default UpdateDiscussionForm;
