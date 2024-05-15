import { PrismaClient } from "@prisma/client";
import FotoItem from "../components/FotoItem";
import Search from "../components/Search";
import CreateButton from "../components/CreateButton";
import Link from 'next/link';

const prisma = new PrismaClient();


function formatCategoryToURL(category: string) {
  switch (category) {
    case 'Rekrutenschule':
        return 'rekrutenschule';
    case 'Wiederholungskurs':
        return 'wiederholungskurs';
    case 'Karriere':
        return 'karriere';
    case 'Ausrüstung und Technik':
        return 'ausruestungundtechnik';
    case 'International':
        return 'international';
    default:
        return category.toLowerCase().replace(/\s+/g, '');
  }
}

const Fotos = async ({ searchParams }: { searchParams: any }) => {
  const query = searchParams?.query;

  let latestFotos = [];
  let fotosByCategory:any = [];
  const categories = ['Rekrutenschule', 'Wiederholungskurs', 'Karriere', 'Ausrüstung und Technik', 'International'];

  if (query) {
    // Suchergebnisse abrufen
    latestFotos = await prisma.foto.findMany({
      where: {
        OR: [{ description: { contains: query, mode: "insensitive" } }]
      },
    });
  } else {
    // Die drei neuesten Fotos insgesamt abrufen
    latestFotos = await prisma.foto.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    // Asynchron die neuesten drei Fotos für jede Kategorie abrufen
    fotosByCategory = await Promise.all(categories.map(category => 
      prisma.foto.findMany({
        where: { category: category },
        orderBy: { createdAt: 'desc' },
        take: 3
      })
    ));
  }

  return (
    <div>
      <div className="flex flex-1 w-[500] flex-shrink-0 py-1">
        <Search placeholder="Suche ein Foto" />
        <CreateButton url={"/fotos/add-foto"} label={"+ Foto hochladen"} />
      </div>
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        {query ? "Suchergebnisse" : "Neueste Fotos"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {latestFotos.map(foto => (
          <FotoItem key={foto.id} foto={foto} />
        ))}
      </div>
      {!query && categories.map((category, index) => (
        <div key={category}>
          <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
            {fotosByCategory[index].map((foto:any) => (
              <FotoItem key={foto.id} foto={foto} />
            ))}
          </div>
          <div className="text-center mb-8">
            <Link href={`/fotos/${formatCategoryToURL(category)}`} className="text-blue-500 hover:text-blue-700">
              Mehr Fotos anzeigen
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fotos;
