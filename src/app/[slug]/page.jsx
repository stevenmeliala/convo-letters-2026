import { notFound } from "next/navigation";
import { CardReveal } from "../../components/CardReveal";
import { MemoriesGallery } from "../../components/MemoriesGallery";
import { CrossFiligree, KeepsakeFooter, Masthead } from "../../components/Stationery";
import dataset from "../../data/cards.json";
import { MEMORY_PHOTOS, MEMORY_VIDEOS } from "../../data/memories";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(dataset.cards).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!Object.hasOwn(dataset.cards, slug)) notFound();
  return {
    title: `Happy Graduation, ${dataset.cards[slug].name}! · PKA USM Class of 2026`,
  };
}

export default async function GraduateCard({ params }) {
  const { slug } = await params;
  if (!Object.hasOwn(dataset.cards, slug)) notFound();
  const { name, messages } = dataset.cards[slug];

  return (
    <div className="stationery-page">
      <Masthead />
      <CardReveal name={name}>
        <div className="note-stack">
          {messages.map(({ sender, text }, index) => (
            <article className="note" aria-label={`Message from ${sender}`} key={index}>
              <div className="note-header" aria-hidden="true">
                <CrossFiligree className="note-ornament" />
              </div>
              <p className="note-message" dir="auto">
                {text}
              </p>
              <p className="note-sender" dir="auto">
                — From {sender}
              </p>
            </article>
          ))}
        </div>
        <MemoriesGallery
          photos={MEMORY_PHOTOS}
          videos={MEMORY_VIDEOS}
          driveLinks={dataset.memories}
        />
      </CardReveal>
      <KeepsakeFooter />
    </div>
  );
}
