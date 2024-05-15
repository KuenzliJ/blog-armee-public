import { fetchSingleDiscussion, getUserId } from "@/actions/actions";
import UpdateDiscussionForm from "@/app/components/forms/UpdateDiscussionForm";
import { redirect } from "next/navigation";

const UpdateDiscussionPage = async ({ params }: { params: any }) => {
  const id = params?.id;
  const discussion:any = await fetchSingleDiscussion(id);
  const loggedInUserId = await getUserId();
  const isAuthor = loggedInUserId === discussion?.authorId;
  if (!isAuthor) {
    redirect("/forum");
  }

  return (
    <div>
      <UpdateDiscussionForm discussion={discussion} />
    </div>
  );
};

export default UpdateDiscussionPage;
