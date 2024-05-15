import { PrismaClient } from "@prisma/client";
import BlogItem from "../../components/BlogItem";
import Search from "../../components/Search";
import CreateButton from "../../components/CreateButton";

// Initializing an instance of PrismaClient to interact with the database
const prisma = new PrismaClient();

// Asynchronous function component for displaying blogs related to 'Ausrüstung und Technik'
const BlogsAusruestungTechnik = async ({
  searchParams,
}: {
  searchParams: any;
}) => {
  // Extracting the search query from the URL search parameters
  const query = searchParams?.query;

  // Fetching blogs from the database where the category matches 'Ausrüstung und Technik'
  // and optionally filtering by title or description based on the search query
  const blogs = await prisma.blog.findMany({
    where: {
      category: "Ausrüstung und Technik",
      AND: query
        ? [
            {
              OR: [
                { title: { contains: query, mode: "insensitive" } }, // Search in title, case insensitive
                { description: { contains: query, mode: "insensitive" } }, // Search in description, case insensitive
              ],
            },
          ]
        : {}, // If no query is present, do not apply any additional filters
    },
    orderBy: {
      createdAt: "desc", // Sorting blogs by creation date in descending order
    },
  });

  return (
    <div>
      <div className="flex flex-1 w-[500] flex-shrink-0 py-1">
        <Search placeholder="Suche einen Beitrag" />
        <CreateButton url={"/blogs/add-blog"} label={"+ Blog erstellen"} />
      </div>
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        Beiträge über Ausrüstung und Technik
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center w-full">Keine Beiträge gefunden.</p>
        )}
      </div>
    </div>
  );
};

export default BlogsAusruestungTechnik;
