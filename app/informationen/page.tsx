import { PrismaClient } from "@prisma/client";
import InfoItem from "../components/InfoItem";

const prisma = new PrismaClient();

const categories = ["Vor dem Dienst", "Rekrutenschule", "Wiederholungskurs", "Pflichten ausser Dienst", "Karriere"];

const InfoPage = async () => {
  const infos = await prisma.info.findMany({
    orderBy: {
      category: 'asc', // Sortieren nach Kategorie, wenn die Datenbank dies unterstützt
    }
  });

  // Gruppieren der Infos nach Kategorie
  const categorizedInfos = categories.reduce((acc:any, category:any) => {
    acc[category] = infos.filter(info => info.category === category);
    return acc;
  }, {});

  return (
    <div>
      {categories.map(category => (
        <div key={category}>
          <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">{category}</h2>
          {categorizedInfos[category].length > 0 ? (
            categorizedInfos[category].map((info:any) => (
              <InfoItem key={info.id} info={info} />
            ))
          ) : (
            <p>Keine Informationen verfügbar.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default InfoPage;
