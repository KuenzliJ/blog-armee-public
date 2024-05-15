"use client";
import { CldUploadWidget } from "next-cloudinary";
import { addFoto } from "@/actions/actions";
import React, { useRef, useState } from "react";
import SubmitButton from "@/app/ui/Button";

const formFields = [
  {
    id: "description",
    name: "Beschreibung",
    type: "textarea",
    placeholder: "Inhalt eingeben (max. 100 Zeichen)",
    maxLength: 100,
  },
];

// List of categories for classification
const categories = [
  "Rekrutenschule",
  "Wiederholungskurs",
  "Karriere",
  "Ausrüstung und Technik",
  "International",
];

// CSS classes for styling form input fields
const inputClass =
  "mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm text-black";

// Functional component to render individual form fields dynamically
const FormField = ({
  id,
  name,
  type,
  placeholder,
  maxLength,
}: {
  id: string;
  name: string;
  type: any;
  placeholder: string;
  maxLength?: number;
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-black">
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={name}
        className={inputClass}
        placeholder={placeholder}
        required
        maxLength={maxLength}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        className={inputClass}
        placeholder={placeholder}
        required
        maxLength={maxLength}
      />
    )}
  </div>
);

// Main component for the photo upload form
const AddFotoForm = () => {
  const ref = useRef<HTMLFormElement>(null); // Use ref to access the form element directly
  const [imageUrl, setImageUrl] = useState(""); // State to hold the uploaded image URL

  // Handler for the form submission
  const addFotoHandler = async (event: any) => {
    event.preventDefault(); // Prevent default form behavior
    // Ensure an image has been uploaded before submitting form
    if (!imageUrl) {
      alert("Bitte laden Sie ein Bild hoch, bevor Sie das Formular absenden.");
      return;
    }
    const formData = {
      description: event.currentTarget.description.value, // Get description from the form
      category: event.currentTarget.category.value, // Get selected category from the form
      imageUrl: imageUrl, // Use state-held URL
    };
    await addFoto(formData); // Submit the data using the addFoto action
    ref.current?.reset(); // Reset form fields after submission
    setImageUrl(""); // Clear the image URL state
  };

  // Handle successful image uploads
  const handleUploadSuccess = (uploadResult: any) => {
    const url = uploadResult.info?.url; // Extract URL from upload result
    setImageUrl(url); // Set the state with the new image URL
  };

  return (
    <form
      ref={ref}
      onSubmit={addFotoHandler}
      className="max-w-xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl text-center text-black font-semibold mb-6">
        Erstelle einen neuen Beitrag
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
            Bild hochladen
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
            alt="Vorschau"
            className="mt-1 w-full rounded-md shadow-sm"
          />
        </div>
      )}

      {formFields.map((field) => (
        <FormField key={field.id} {...field} />
      ))}

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

      <SubmitButton label="Beitrag hinzufügen" color="green" />
    </form>
  );
};

export default AddFotoForm;
