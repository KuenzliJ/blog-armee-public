import { fetchUsers } from "@/actions/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminTable from "@/app/components/admin/AdminTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/**
 * Async function for rendering the Admin Dashboard page.
 * This page is intended for ADMIN users only.
 */
const AdminDashboard = async () => {
  // Retrieve session data for the current user
  const session: any = await getServerSession(authOptions);

  // Redirect non-ADMIN users to the blogs page
  if (session?.users?.role !== "ADMIN") {
    redirect("/blogs");
  }

  // Redirect if no session is found (i.e., the user is not logged in)
  if (!session) {
    redirect("/blogs");
  }

  // Fetch user data to be displayed in the admin table
  const users = await fetchUsers();

  // Render the component only if there are users to display
  return (
    <div className="mt-5 justify-center items-start flex">
      {users?.length > 0 && <AdminTable users={users} />}
    </div>
  );
};

export default AdminDashboard;
