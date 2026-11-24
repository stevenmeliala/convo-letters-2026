import { KeepsakeFooter, Masthead } from "../components/Stationery";

export default function NotFound() {
  return (
    <div className="stationery-page">
      <Masthead />
      <main className="cover cover-missing">
        <h1>Card link<br /><em>unavailable</em></h1>
        <p className="landing-copy">Check the personal link you received and try again.</p>
      </main>
      <KeepsakeFooter />
    </div>
  );
}
