import { PrismaClient } from "@prisma/client";
import BlogItem from "../../components/BlogItem";
import Search from "../../components/Search";
import CreateButton from "../../components/CreateButton";

const prisma = new PrismaClient();

const ForumKarriere = async ({ searchParams }:{searchParams:any}) => {
  const query = searchParams?.query;

  const blogs = await prisma.discussion.findMany({
    where: {
      category: "Karriere",
      AND: query ? [
        {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        }
      ] : {}
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <div className="flex flex-1 w-[500] flex-shrink-0 py-1">
          <Search placeholder="Suche einen Beitrag" />
          <CreateButton url={"/blogs/add-blog"} label={"+ Blog erstellen"} />
        </div>
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        Beiträge zur Karriere
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {blogs.length > 0 ? (
          blogs.map(blog => <BlogItem key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center w-full">Keine Beiträge gefunden.</p>
        )}
      </div>
    </div>
  );
};

export default ForumKarriere;
