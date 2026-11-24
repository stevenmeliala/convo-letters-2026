import { KeepsakeFooter, Masthead } from "../components/Stationery";

export default function NotFound() {
  return (
    <div className="stationery-page">
      <Masthead />
      <main className="cover cover-missing">
        <h1>
          Letter link
          <br />
          <em>unavailable</em>
        </h1>
        <p className="landing-copy">
          Please check the personal PKA graduation link you received and try again.
        </p>
      </main>
      <KeepsakeFooter />
    </div>
  );
}
