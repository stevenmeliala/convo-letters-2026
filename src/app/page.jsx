import { Envelope, KeepsakeFooter, Masthead } from "../components/Stationery";

export default function Home() {
  return (
    <div className="stationery-page">
      <Masthead />
      <main className="cover">
        <h1>Graduation<br /><em>Keepsake</em></h1>
        <Envelope />
        <p className="landing-copy">Please open your personal link to view your graduation card.</p>
      </main>
      <KeepsakeFooter />
    </div>
  );
}
