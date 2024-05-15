import { PrismaClient } from "@prisma/client";
import BlogItem from "../../components/BlogItem";
import Search from "../../components/Search";
import CreateButton from "../../components/CreateButton";

// Initialize the Prisma client for accessing the database
const prisma = new PrismaClient();

// Define an asynchronous function component for rendering blogs related to 'Karriere'
const BlogsKarriere = async ({ searchParams }: { searchParams: any }) => {
  // Extract the search query from the provided URL search parameters
  const query = searchParams?.query;

  // Fetch blog posts from the database where the category is 'Karriere'
  const blogs = await prisma.blog.findMany({
    where: {
      category: "Karriere", // Specifying the category to filter by
      AND: query
        ? [
            {
              OR: [
                { title: { contains: query, mode: "insensitive" } }, // Search in title, case-insensitive
                { description: { contains: query, mode: "insensitive" } }, // Search in description, case-insensitive
              ],
            },
          ]
        : {}, // No additional conditions if no query is provided
    },
    orderBy: {
      createdAt: "desc", // Sort the blogs by creation date in descending order
    },
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
          blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center w-full">Keine Beiträge gefunden.</p>
        )}
      </div>
    </div>
  );
};

export default BlogsKarriere;
