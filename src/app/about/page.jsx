import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "About Us - Dragon News",
};

export default function AboutPage() {
  return (
    <div className="font-poppins min-h-screen bg-white text-gray-900 pb-12">
      <header className="py-4">
        <Header />
      </header>
      <nav className="w-11/12 mx-auto py-2">
        <Navbar />
      </nav>

      <main className="w-11/12 max-w-4xl mx-auto mt-8 p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">About Dragon News</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Dragon News is dedicated to honest, impactful journalism. Our mission is to report stories with integrity, clarity, and courage — journalism without fear or favour.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          From international politics to cultural movements, science, sports, and entertainment, we bring you curated real-time reporting from across the globe.
        </p>
        <Link href="/" className="btn btn-neutral rounded-none text-white px-6">
          ← Back to Headlines
        </Link>
      </main>
    </div>
  );
}
