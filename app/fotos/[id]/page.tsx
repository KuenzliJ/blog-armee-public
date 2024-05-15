import { fetchSingleFoto, getUserId } from "@/actions/actions";
import CommentListings from "@/app/components/CommentListings";
import CommentAddForm from "@/app/components/forms/CommentAddForm";
import Image from "next/image";
import Link from "next/link";

const FotoDetail = async ({ params }: { params: any }) => {
  const id = params?.id;
  const foto = await fetchSingleFoto(id);

  const loggedInUserId = await getUserId();
  const isAuthor = loggedInUserId === foto?.authorId;

  return (
    <div>
      <div className="item w-100% flex flex-col items-center">
        <div className="w-full flex justify-center">
          {foto?.imageUrl ? (
            <Image
              blurDataURL={foto?.imageUrl}
              placeholder="blur"
              quality={100}
              src={foto?.imageUrl}
              alt="Foto"
              width={700}
              height={500}
              className="mt-2 px-2 py-2 object-cover mb-2 rounded-sm shadow-sm"
            />
          ) : null}
        </div>
        <div className="w-full flex justify-center">
          <p className="text-center text-gray-300 my-2 mx-2 px-2 py-2">
            {foto?.description}
          </p>
        </div>
        <div className="w-full flex justify-center">
          {isAuthor && (
            <Link
              className="text-gray-800 bg-gray-300 rounded-sm shadow-sm mx-2 px-2 border-2"
              href={`/fotos/update-foto/${foto?.id}`}
            >
              Foto anpassen
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

export default FotoDetail;
