"use client";
import { addCommentToBlog, getUserFromPrisma } from "@/actions/actions";
import Button from "@/app/ui/Button";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const CommentAddForm = ({ blogId }: any) => {
  const { data: session } = useSession(); // Retrieve session data to check if the user is logged in
  const [user, setUser] = useState(null); // State to store user details
  const ref = useRef<HTMLFormElement>(null); // Ref to interact directly with the form element

  useEffect(() => {
    // Function to fetch user data from Prisma
    const fetchUser = async () => {
      const userData: any = await getUserFromPrisma();
      setUser(userData); // Set user data to state
    };

    if (session) {
      fetchUser(); // Fetch user data if session exists
    }
  }, [session]); // Effect depends on changes in the session

  // If there is no session, display a message prompting the user to log in
  if (!session)
    return (
      <div>
        <p className="text-center font-semibold mt-5 mb-2 px-2 py-3">
          Du musst angemeldet sein, um einen Kommentar hinzufügen zu können.
        </p>
      </div>
    );

  // Handler for form submission to add a comment
  const addCommentHandler: any = async (formData: any) => {
    await addCommentToBlog(blogId, formData);
    ref.current?.reset(); // Reset the form after submission
  };

  return (
    <div>
      <h2 className="text-center font-semibold mt-5 mb-2 px-2 py-3">
        Kommentar hinzufügen
      </h2>
      <div className="h-[2px] w-1/4 items-center mx-auto bg-gray-600"></div>

      <form
        ref={ref}
        action={addCommentHandler}
        className="max-w-md flex mx-auto mt-8"
      >
        <div className="mb-2 mr-5">
          <Image
            className="rounded-full mt-6"
            src={(user as any)?.userImage}
            height={70}
            width={70}
            alt={"Avatar"}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="text" className="block  text-gray-600 font-medium">
            Kommentar
          </label>
          <textarea
            id="text"
            name="text"
            placeholder="Kommentar eingeben"
            rows={4}
            className="mt-1 p-2 w-600 text-gray-800 border rounded-md"
            required
          ></textarea>
        </div>
        <div className="mt-5 py-1 px-2">
          <Button label={"Kommentar hinzufügen"} color={"green"} />
        </div>
      </form>
    </div>
  );
};

export default CommentAddForm;
