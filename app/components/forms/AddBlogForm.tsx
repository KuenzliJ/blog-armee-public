"use client";
import { CldUploadWidget } from "next-cloudinary";
import { addBlog } from "@/actions/actions";
import React, { useRef, useState } from "react";
import SubmitButton from "@/app/ui/Button";

// Form fields definition array
const formFields = [
  { id: "title", name: "Titel", type: "text", placeholder: "Titel eingeben" },
  {
    id: "description",
    name: "Beschreibung",
    type: "textarea",
    placeholder: "Inhalt eingeben",
  },
];

// Array of categories for blog posts
const categories = [
  "Rekrutenschule",
  "Wiederholungskurs",
  "Karriere",
  "Ausrüstung und Technik",
  "International",
];

// Common CSS class string for input fields
const inputClass =
  "mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm text-black";

// Functional component to render form fields
const FormField = ({
  id,
  name,
  type,
  placeholder,
}: {
  id: string;
  name: string;
  type: any;
  placeholder: string;
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
      ></textarea>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        className={inputClass}
        placeholder={placeholder}
        required
      />
    )}
  </div>
);

// Main component to handle the blog creation form
const AddBlogForm = () => {
  const ref = useRef<HTMLFormElement>(null); // Reference to access form DOM for resetting
  const [imageUrl, setImageUrl] = useState(""); // State for storing the image URL

  // Handler for form submission
  const addBlogHandler = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = {
      title: event.currentTarget.title.value, // Extract the title from the form
      description: event.currentTarget.description.value, // Extract the description
      category: event.currentTarget.category.value, // Extract the selected category
      imageUrl: imageUrl, // Include the uploaded image URL
    };
    await addBlog(formData); // Call the addBlog action to submit the data
    ref?.current?.reset(); // Reset the form after submission
    setImageUrl(""); // Clear the image URL state
  };

  // Handler for successful image uploads
  const handleUploadSuccess = (uploadResult: any) => {
    const url = uploadResult.info?.url; // Extract the URL from the upload result
    setImageUrl(url); // Update the state with the new image URL
  };

  return (
    <form
      ref={ref}
      onSubmit={addBlogHandler}
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

export default AddBlogForm;
