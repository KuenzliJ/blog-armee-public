"use client";
import { deleteComment, getUserFromPrisma } from "@/actions/actions";
import Button from "../ui/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";

const CommentItem = ({ comment }: any) => {
  //get session information
  const session: any = useSession();
  //define comment item
  const { id, text, blogId, authorId, author } = comment || {};

  const DeleteCommentHandler = async (formData: any) => {
    //get Id from fromData
    const commentId = formData.get("id");
    //confirm if user is sure to delete
    const isDelete = confirm(
      "Bist du dir sicher, dass du diesen Kommentar löschen willst?"
    );
    if (isDelete) {
      await deleteComment(commentId, blogId);
    }
  };
  return (
    <div>
      <div className="item">
        <div className="flex items-center mb-2">
          <Image
            className="h-8 w-8 rounded-full flex items-center justify-center m-2"
            src={author.userImage}
            height={70}
            width={70}
            alt={"Avatar"}
          />
          <div className="font-bold text-gray-200">
            <p>{author.username}</p>
          </div>
        </div>
        <p className="text-lg text-gray-300">{text}</p>
        <form className="mt-2" action={DeleteCommentHandler}>
          <input type="hidden" name="id" value={id} />
          {session?.data?.user?.id === authorId && (
            <Button label={"Löschen"} color={"red"}></Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CommentItem;
