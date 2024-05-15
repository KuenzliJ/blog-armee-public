import { getUserFromPrisma } from '@/actions/actions';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from '@/app/ui/LogoutButton';
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';

const prisma = new PrismaClient();


const ProfileDetail =  async () => {
  const user = await getUserFromPrisma();
  const session:any = await getServerSession(authOptions);
  if (session?.user?.id !== user?.id) {
    redirect("/auth/login");
  }
  else {
    null;
  }
  // Continue rendering the profile details
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-4 text-center text-white">
        <h1 className="text-2xl font-semibold">Profil</h1>
      </div>
      <div className="p-6">
        {user?.userImage && (
              <Image
                src={user.userImage}
                alt="Profilbild"
                width={300}
                height={300}
                className="mx-auto rounded-full object-cover mb-4"
              />
        )}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-800">Benutzername: {user?.username}</p>
          <p className="text-lg font-semibold text-gray-800">Email: {user?.email}</p>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <LogoutButton label="Abmelden" />
          <Link href={`/profil/update-user/${user?.id}`} className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Benutzer anpassen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;