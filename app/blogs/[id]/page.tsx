import { fetchSingleBlog, getUserId } from "@/actions/actions";
import CommentListings from "@/app/components/CommentListings";
import CommentAddForm from "@/app/components/forms/CommentAddForm";
import Image from "next/image";
import Link from "next/link";

const BlogDetail = async ({ params }: { params: any }) => {
  // Extract the blog ID from the URL parameters
  const id = params?.id;

  // Fetch the blog details using the blog ID
  const blog = await fetchSingleBlog(id);

  // Retrieve the ID of the currently logged-in user
  const loggedInUserId = await getUserId();

  // Check if the logged-in user is the author of the blog
  const isAuthor = loggedInUserId === blog?.authorId;

  return (
    <div>
      <div className="item w-100% flex flex-col items-center">
        <div className="w-full flex justify-center md:rounded-md">
          {blog?.imageUrl ? (
            <Image
              blurDataURL={blog?.imageUrl}
              placeholder="blur"
              quality={100}
              src={blog?.imageUrl}
              alt="Foto"
              width={700}
              height={500}
            />
          ) : null}
        </div>
        <div className="w-full flex justify-center">
          <h2 className="font-semibold text-center text-2xl text-gray-200 my-2 mx-2 px-2 py-2">
            {blog?.title}
          </h2>
        </div>
        <div className="w-full flex justify-center">
          <p className="text-center text-gray-300 my-2 mx-2 px-2 py-2">
            {blog?.description}
          </p>
        </div>
        <div className="w-full flex justify-center">
          {isAuthor && (
            <Link
              className="text-gray-800 bg-gray-300 rounded-sm shadow-sm mx-2 px-2 border-2"
              href={`/blogs/update-blog/${blog?.id}`}
            >
              Beitrag anpassen
            </Link>
          )}
        </div>
      </div>
      <div>
        <CommentAddForm blogId={id} />
      </div>
      <div>
        <CommentListings blogId={id} />
      </div>
    </div>
  );
};

export default BlogDetail;
