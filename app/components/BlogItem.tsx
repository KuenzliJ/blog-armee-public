import Link from "next/link";
import Image from "next/image";

const BlogItem = ({ blog }: { blog: any }) => {
  const { id, title, description, imageUrl, category } = blog || {};

  return (
    <div className="item">
      <Link href={`/blogs/${id}`}>
        {imageUrl ? (
          <Image
            blurDataURL={imageUrl}
            placeholder="blur"
            loading="lazy"
            quality={100}
            width="600"
            height="400"
            src={imageUrl}
            className="w-full h-[200px] lg:h-[250px] object-cover mb-4 rounded-md"
            alt={blog?.title}
          />
        ) : null}
      </Link>
      <Link href={`/blogs/${id}`}>
        <h2 className="text-x1 text-white font-semibold mb-2">{title}</h2>
      </Link>

      <p className="category"> {category} </p>
      <p className="text-gray-300">
        {" "}
        {description.slice(0, 100)}
        {description.length > 100 ? "..." : ""}
      </p>
    </div>
  );
};

export default BlogItem;
