import "../styles/globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "RankPost",
  description: "AI blog generator and publisher for WordPress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Nav />

        {/* Main content wrapper under navbar spacing */}
        <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
