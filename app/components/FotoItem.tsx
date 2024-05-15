import Image from "next/image";
import Link from "next/link";

const FotoItem = ({ foto }: { foto: any }) => {
  //define foto item
  const { id, description, imageUrl } = foto || {};

  return (
    <div className="item">
      <Link href={`/fotos/${id}`}>
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
            alt={foto?.description}
          />
        ) : null}
      </Link>
      <Link href={`/fotos/${id}`}></Link>
      <Link href={`/fotos/${id}`}>
        <h2 className="text-x1 text-white mb-2">
          {description.slice(0, 100)}
          {description.length > 100 ? "..." : ""}
        </h2>
      </Link>
    </div>
  );
};

export default FotoItem;
