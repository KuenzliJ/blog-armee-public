//This Page is for the Admin to manage the users and their permissions, yet to be implemented

"use client";

import { assignPermission } from "@/actions/actions";
import Button from "@/app/ui/Button";
import { useRef } from "react";

const AdminTable = ({ users }: { users: any }) => {
  // Create a ref object to interact with the form elements directly
  const ref: any = useRef(null);

  // Define an asynchronous function to handle permission assignment
  const handleAssignPermission = async (formData: any) => {
    // Extract userId from the form data
    const userId: any = formData.get("userId");
    // Call the assignPermission action to update the user's permissions
    await assignPermission(userId, formData);
    // Reset the form after submitting
    ref.current.reset();
  };

  // Render the table with user information and actions
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full border bg-gray-900">
        <thead>
          <tr>
            <th className="border p-2 text-gray-300">ID</th>
            <th className="border p-2 text-gray-300">Email</th>
            <th className="border p-2 text-gray-300">Role</th>
            <th className="border p-2 text-gray-300">Permissions</th>
            <th className="border p-2 text-gray-300">Assign Permissions</th>
            <th className="border p-2 text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/*sample Data*/}
          {users.map((user: any, index: any) => {
            return (
              <tr key={user?.id}>
                <td className="boarder p-4">{index + 1}</td>
                <td className="boarder p-4">{user?.email}</td>
                <td className="boarder p-4">{user?.role}</td>
                <td className="boarder p-4">{user?.permissions}</td>
                <td className="boarder p-4">
                  <form ref={ref} action={handleAssignPermission}>
                    <input type="hidden" name="userId" value={user.id} />
                    <input
                      type="text"
                      name="permission_name"
                      className="mx-2 rounded-md text-center text-gray-200 shadow-md px-2 my-1 py-1"
                      placeholder="Berechtigung vergeben"
                    />
                    <Button label={"Assign"} color={"green"} />
                  </form>
                </td>
                <td className="boarder p-4">
                  <Button label={"Edit"} color={"blue"} />
                  <Button label={"Delete"} color={"red"} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
