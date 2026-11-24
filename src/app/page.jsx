import { Envelope, KeepsakeFooter, Masthead } from "../components/Stationery";

export default function Home() {
  return (
    <div className="stationery-page">
      <Masthead />
      <main className="cover">
        <p className="cover-eyebrow">
          <span lang="ms">Persaudaraan Kristian Agape</span> · USM
        </p>
        <h1>
          Graduation
          <br />
          <em>Keepsake</em>
        </h1>
        <Envelope />
        <p className="landing-copy">
          Please open your personal link to read the graduation letters and prayers prepared for
          you by your PKA family.
        </p>
      </main>
      <KeepsakeFooter />
    </div>
  );
}
