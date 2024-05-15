"use client";
import { addDiscussion } from "@/actions/actions";
import React, { useRef } from "react";
import SubmitButton from "@/app/ui/Button";

const AddDiscussionForm = () => {
  // Categories available for selection in the form
  const categories = [
    "Rekrutenschule",
    "Wiederholungskurs",
    "Karriere",
    "Ausrüstung und Technik",
    "International",
  ];
  // Ref to the form element for resetting it after submission
  const ref = useRef<HTMLFormElement>(null);
  // Base CSS class for all input elements in the form
  const inputClass =
    "mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm text-black";

  // Handler function for form submission
  const addDiscussionHandler = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Collecting form data from the form fields
    const formData = {
      title: event.currentTarget.title.value, // Extract title from form
      description: event.currentTarget.description.value, // Extract description from form
      category: event.currentTarget.category.value, // Extract selected category from form
    };
    // Call the action to add the discussion to the database
    await addDiscussion(formData);
    // Reset the form after successful data submission
    ref.current?.reset();
  };
  return (
    <form
      ref={ref}
      onSubmit={addDiscussionHandler}
      className="max-w-xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl text-center text-black font-semibold mb-6">
        Erstelle eine neue Diskussion
      </h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-black">
          Titel
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={inputClass}
          placeholder="Titel eingeben"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-black"
        >
          Beschreibung
        </label>
        <textarea
          id="description"
          name="description"
          className={inputClass}
          placeholder="Beschreibung eingeben"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-black"
        >
          Kategorie
        </label>
        <select id="category" name="category" className={inputClass} required>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <SubmitButton label={"Beitrag erstellen"} color={"green"} />
    </form>
  );
};

export default AddDiscussionForm;
