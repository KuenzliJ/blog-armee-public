import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddDiscussionForm from "@/app/components/forms/AddDiscussionForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AddDiscussion = async () => {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <AddDiscussionForm />
    </div>
  );
};

export default AddDiscussion;
