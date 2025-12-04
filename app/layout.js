import "../styles/globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { PageTransition } from "../components/UI";

export const metadata = {
  title: "RankPost",
  description: "AI blog generator and publisher for WordPress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Nav />

        <PageTransition>
          <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
            {children}
          </main>
        </PageTransition>

        <Footer />
      </body>
    </html>
  );
}
