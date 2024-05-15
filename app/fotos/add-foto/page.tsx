import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddFotoForm from "@/app/components/forms/AddFotoForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AddFoto = async () => {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <AddFotoForm />
    </div>
  );
};

export default AddFoto;