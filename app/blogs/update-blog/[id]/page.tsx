import { fetchSingleBlog, getUserId } from "@/actions/actions";
import UpdateBlogForm from "@/app/components/forms/UpdateBlogForm";
import { redirect } from "next/navigation";

const UpdateBlogPage = async ({ params }: { params: any }) => {
  // Extract the blog ID from the URL parameters
  const id = params?.id;

  // Retrieve the blog post by its ID
  const blog = await fetchSingleBlog(id);

  // Get the current logged-in user's ID
  const loggedInUserId = await getUserId();

  // Check if the current user is the author of the blog post
  const isAuthor = loggedInUserId === blog?.authorId;

  // Redirect the user to the blogs page if they are not the author
  if (!isAuthor) {
    redirect("/blogs");
  }

  return (
    <div>
      <UpdateBlogForm blog={blog} />
    </div>
  );
};

export default UpdateBlogPage;
