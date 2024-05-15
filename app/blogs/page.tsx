import { PrismaClient } from "@prisma/client";
import BlogItem from "../components/BlogItem";
import Search from "../components/Search";
import CreateButton from "../components/CreateButton";
import Link from "next/link";

// Initialize the Prisma client to interact with the database
const prisma = new PrismaClient();

// Function to map category names to URL-friendly strings
function formatCategoryToURL(category: string) {
  switch (category) {
    case "Rekrutenschule":
      return "rekrutenschule";
    case "Wiederholungskurs":
      return "wiederholungskurs";
    case "Karriere":
      return "karriere";
    case "Ausrüstung und Technik":
      return "ausruestungundtechnik";
    case "International":
      return "international";
    default:
      return category.toLowerCase().replace(/\s+/g, ""); // Replace spaces with nothing for other categories
  }
}

// Asynchronous function component for rendering blog posts based on categories or search
const Blogs = async ({ searchParams }: { searchParams: any }) => {
  const query = searchParams?.query; // Extracting the search query from URL parameters

  let latestBlogs = []; // Array to hold the latest blogs or search results
  let blogsByCategory: any = []; // Array to hold blogs categorized by type
  const categories = [
    "Rekrutenschule",
    "Wiederholungskurs",
    "Karriere",
    "Ausrüstung und Technik",
    "International",
  ];

  if (query) {
    // Fetch blogs that match the search query
    latestBlogs = await prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  } else {
    // Fetch the latest three blogs in general if no search query
    latestBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    // Fetch the latest three blogs for each category asynchronously
    blogsByCategory = await Promise.all(
      categories.map((category) =>
        prisma.blog.findMany({
          where: { category: category },
          orderBy: { createdAt: "desc" },
          take: 3,
        })
      )
    );
  }

  // Render the blogs or search results

  return (
    <div>
      <div className="flex flex-1 w-[500] flex-shrink-0 py-1">
        <Search placeholder="Suche einen Beitrag" />
        <CreateButton url={"/blogs/add-blog"} label={"+ Blog erstellen"} />
      </div>
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        {query ? "Suchergebnisse" : "Neueste Beiträge"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {latestBlogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
      {!query &&
        categories.map((category, index) => (
          <div key={category}>
            <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
              {blogsByCategory[index].map((blog: any) => (
                <BlogItem key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="text-center mb-8">
              <Link
                href={`/blogs/${formatCategoryToURL(category)}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Mehr Beiträge anzeigen
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
