"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Search = ({ placeholder }: { placeholder: string }) => {
  // Access search parameters and the current URL path from the router
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter(); // Destructure the replace method from useRouter to update URL without navigation

  // Function to handle changes in the search input and update the URL accordingly
  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query); // Set the query parameter if there is a search input
    } else {
      params.delete("query"); // Remove the query parameter if the search input is cleared
    }
    replace(`${pathName}?${params.toString()}`); // Update the current URL with the new or updated query parameter
  };
  return (
    <>
      <label htmlFor="search" className="sr-only">
        Suchen
      </label>
      <input
        className="peer block w-full mx-4 mt-2 px-3 py-2 rounded-md border text-gray-200 bg-gray-800 border-gray-200 pl-10 text-sm outline-2 placeholder:text-gray-400"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </>
  );
};

export default Search;
