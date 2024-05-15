import { PrismaClient } from "@prisma/client";
import BlogItem from "../../components/BlogItem";
import Search from "../../components/Search";
import CreateButton from "../../components/CreateButton";

// Initializing PrismaClient to connect to the database
const prisma = new PrismaClient();

// Asynchronous function component to render blogs categorized under 'International'
const BlogsInternational = async ({ searchParams }: { searchParams: any }) => {
  // Extracting the search query from URL parameters
  const query = searchParams?.query;

  // Querying the database for blogs in the 'International' category that match the search query
  const blogs = await prisma.blog.findMany({
    where: {
      category: "International", // Filtering by category
      AND: query
        ? [
            {
              OR: [
                { title: { contains: query, mode: "insensitive" } }, // Searching in title, case insensitive
                { description: { contains: query, mode: "insensitive" } }, // Searching in description, case insensitive
              ],
            },
          ]
        : {}, // If no query provided, no additional filters are applied
    },
    orderBy: {
      createdAt: "desc", // Sorting results by creation date in descending order
    },
  });

  return (
    <div>
      <div className="flex flex-1 w-[500] flex-shrink-0 py-1">
        <Search placeholder="Suche einen Beitrag" />
        <CreateButton url={"/blogs/add-blog"} label={"+ Blog erstellen"} />
      </div>
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        Internationale Beiträge
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

export default BlogsInternational;
