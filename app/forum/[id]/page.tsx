import { fetchSingleDiscussion, getUserId } from "@/actions/actions";
import CommentListings from "@/app/components/CommentListings";
import CommentAddForm from "@/app/components/forms/CommentAddForm";
import Image from "next/image";
import Link from "next/link";

const DiscussionDetail = async ({ params }: { params: any }) => {
  const id = params?.id;
  const discussion = await fetchSingleDiscussion(id);
  const loggedInUserId = await getUserId();
  const isAuthor = loggedInUserId === discussion?.authorId;

  return (
    <div className="">
      <div className="item">
        <h3 className="font-semibold text-center text-2xl text-gray-200 my-2 mx-2 px-2 py-2">
           {discussion?.title}
        </h3>

        <p className="text-center text-gray-300 my-2 mx-2 px-2 py-2">
          {discussion?.description}
        </p>
        <div className="w-full flex justify-center">
          {isAuthor && (
            <Link
              className="text-gray-800 bg-gray-300 rounded-sm shadow-sm mx-2 px-2 border-2"
              href={`/forum/update-discussion/${discussion?.id}`}
            >
              Beitrag anpassen
            </Link>
          )}
        </div>
      </div>
      <div><CommentAddForm blogId={id}/></div>
      <div> <CommentListings blogId={id} /></div>
    </div>
  );
};

export default DiscussionDetail;
