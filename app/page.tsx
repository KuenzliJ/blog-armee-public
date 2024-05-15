import Link from "next/link";

const boxStyle ="flex-grow border-2 border-gray-300 m-2 p-2 rounded flex flex-col items-stretch w-full md:w-72 min-h-60";
const h2Style = "text-lg font-bold text-center m-1 text-gray-300";
const pStyle = "text-center text-gray-300";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-between p-6 bg-cover bg-center"
      style={{
        backgroundImage: `url(/Grenadier.png)`,
        minHeight: "calc(100vh - 4rem)",
      }}
    >
      <h1 className="font-bold text-4xl text-gray-300">
        Willkommen bei Swiss Army Legends
      </h1>
      <div className="container mx-auto flex flex-wrap justify-center items-stretch">
        <Link href="/blogs">
          <div className={boxStyle}>
            <h2 className={h2Style}>Blog</h2>
            <div className={pStyle}>
              <p>
                Willst du ein persönliches Erlebnis aus dem militärischen
                Alltag teilen? Oder doch lieber deine Meinung zu einem
                militärischen Thema äußern? Dann ist das hier der richtige Ort.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/forum">
          <div className={boxStyle}>
            <h2 className={h2Style}>Forum</h2>
            <div className={pStyle}>
              <p>
                Du hast eine Frage zum Militärdienst? Egal ob es um die
                Rekrutenschule, Wiederholungskurse oder sonst was geht, hier
                bist du richtig! Stelle einfach deine Frage und lass dir von der
                Community helfen.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/fotos">
          <div className={boxStyle}>
            <h2 className={h2Style}>Fotogalerie</h2>
            <div className={pStyle}>
              <p>
                Du hast ein super Bild aus deiner RS oder aus dem WK?
                Dann teile es hier mit der Community und lass sie an deinem
                Erlebnis teilhaben.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/informationen">
          <div className={boxStyle}>
            <h2 className={h2Style}>Infos</h2>
            <div className={pStyle}>
              <p>
                Du suchst Informationen zum Militärdienst? Hier findest du
                alles, was du wissen musst. Von der Rekrutenschule bis zu den
                Wiederholungskursen ist alles dabei.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
