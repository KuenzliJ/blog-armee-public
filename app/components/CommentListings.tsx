import { fetchComments } from "@/actions/actions";
import CommentItem from "./CommentItem";

const CommentListings = async ({ blogId }: any) => {
  //fetch comments via Id
  const comments = await fetchComments(blogId);
  return (
    <div>
      <h2 className="font-semibold text-center text-gray-200 my-2 mx-2 px-2 py-2 ">
        Kommentare ({comments.length})
      </h2>
      {comments?.length > 0 ? (
        comments?.map((comment: any) => {
          return <CommentItem key={comment?.id} comment={comment} />;
        })
      ) : (
        <p className="font-semibold text-center text-black-200 my-2 mx-2 px-2 py-2 ">
          Schreib als erster einen Kommentar!
        </p>
      )}
    </div>
  );
};

export default CommentListings;
