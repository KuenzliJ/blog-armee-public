import { fetchSingleFoto, getUserId } from "@/actions/actions";
import UpdateFotoForm from "@/app/components/forms/UpdateFotoForm";
import { redirect } from "next/navigation";

const UpdateFotoPage = async ({ params }: { params: any }) => {
  const id = params?.id;
  const foto = await fetchSingleFoto(id);
  const loggedInUserId = await getUserId();
  const isAuthor = loggedInUserId === foto?.authorId;
  if (!isAuthor) {
    redirect("/fotos");
  }
  return (
    <div>
      <UpdateFotoForm foto={foto} />
    </div>
  );
};

export default UpdateFotoPage;
