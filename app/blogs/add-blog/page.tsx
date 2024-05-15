import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddBlogForm from "@/app/components/forms/AddBlogForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AddBlog = async () => {
  //get user session
  const session: any = await getServerSession(authOptions);
  //if user is not logged in, redirect to landing page
  if (!session) {
    redirect("/");
  }
  //if user is logged in, show the add blog form
  return (
    <div>
      <AddBlogForm />
    </div>
  );
};

export default AddBlog;
