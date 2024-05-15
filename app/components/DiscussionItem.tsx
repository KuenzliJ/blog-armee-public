import Link from "next/link";

const DiscussionItem = ({ discussion }: { discussion: any }) => {
  //define discussion item
  const { id, title, description, category } = discussion || {};

  return (
    <div className="item">
      <Link href={`/forum/${id}`}></Link>
      <Link href={`/forum/${id}`}>
        <h2 className="text-x1 text-white font-semibold mb-2">{title}</h2>
      </Link>

      <p className="category"> {category} </p>
      <p className="text-gray-300"> {description.slice(0, 100)} ...</p>
    </div>
  );
};

export default DiscussionItem;
