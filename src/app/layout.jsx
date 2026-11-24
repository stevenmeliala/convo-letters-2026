import "@fontsource-variable/dm-sans";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "./globals.css";

export const metadata = {
  title: "PKA USM · Class of 2026 Graduation Keepsake",
  description:
    "Congratulatory letters and prayers from Persaudaraan Kristian Agape (PKA), Universiti Sains Malaysia, for the Class of 2026.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
