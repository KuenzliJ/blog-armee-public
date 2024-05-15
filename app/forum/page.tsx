import { PrismaClient } from "@prisma/client";
import DiscussionItem from "../components/DiscussionItem";
import Search from "../components/Search";
import CreateButton from "../components/CreateButton";
import Link from 'next/link'; // Import für Next.js Link

const prisma = new PrismaClient();

function formatCategoryToURL(category:string) {
  switch (category) {
      case 'Rekrutenschule':
          return 'rekrutenschule';
      case 'Wiederholungskurs':
          return 'wiederholungskurs';
      case 'Karriere':
          return 'karriere';
      case 'Ausrüstung und Technik':
          return 'ausruestungundtechnik'; // Spezifische Anpassung für diese Kategorie
      case 'International':
          return 'international';
      default:
          return category.toLowerCase().replace(/\s+/g, '');
  }
}

const Forum = async ({ searchParams }: { searchParams: any }) => {
  const categories = ['Rekrutenschule', 'Wiederholungskurs', 'Karriere', 'Ausrüstung und Technik', 'International'];
  const query = searchParams?.query;
  let discussions:any = [];
  let discussionsByCategory:any = [];
  if (query) {
    // Zuweisung der Suchergebnisse zu `discussions`
    discussions = await prisma.discussion.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: 'desc' }
    });
  } else {
    // Die drei neuesten Diskussionen insgesamt abrufen
    const latestDiscussions = await prisma.discussion.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });
  
    // Asynchron die neuesten drei Diskussionen für jede Kategorie abrufen
    discussionsByCategory = await Promise.all(categories.map(category => 
      prisma.discussion.findMany({
        where: { category: category },
        orderBy: { createdAt: 'desc' },
        take: 3
      })
    ));
  
    discussions = latestDiscussions; // Setze die neuesten Diskussionen als Hauptdiskussionsliste
  }
  return (
    <div>
      <div className="flex flex-1 w-[500] flex-shrink-0 py-1">
        <Search placeholder="Suche eine Diskussion oder Frage" />
        <CreateButton
          url={"forum/add-discussion"}
          label={"+ Diskussion starten"}
        />
      </div>
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        {query ? "Suchergebnisse" : "Neueste Diskussionen"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {discussions.length > 0 ? discussions.map((discussion:any) => (
          <DiscussionItem key={discussion.id} discussion={discussion} />
        )) : (
          <p className="text-center w-full">Keine Diskussionen gefunden.</p>
        )}
      </div>
      {!query && categories.map((category, index) => (
        <div key={category}>
          <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
            {discussionsByCategory[index].map((discussion:any) => (
              <DiscussionItem key={discussion.id} discussion={discussion} />
            ))}
          </div>
          <div className="text-center mb-8">
            <Link href={`/forum/${formatCategoryToURL(category)}`} className="text-blue-500 hover:text-blue-700">Mehr Diskussionen anzeigen
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forum;