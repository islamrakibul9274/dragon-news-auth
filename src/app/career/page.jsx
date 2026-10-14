import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Careers - Dragon News",
};

export default function CareerPage() {
  return (
    <div className="font-poppins min-h-screen bg-white text-gray-900 pb-12">
      <header className="py-4">
        <Header />
      </header>
      <nav className="w-11/12 mx-auto py-2">
        <Navbar />
      </nav>

      <main className="w-11/12 max-w-4xl mx-auto mt-8 p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Careers at Dragon News</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Join our global newsroom of passionate storytellers, investigative journalists, editors, and digital creators.
        </p>
        <div className="space-y-4 my-6">
          <div className="p-4 bg-white border border-gray-200 rounded">
            <h3 className="font-semibold text-lg">Senior Investigative Journalist</h3>
            <p className="text-sm text-gray-500">Remote / Full-time</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded">
            <h3 className="font-semibold text-lg">Frontend Engineer (React / Next.js)</h3>
            <p className="text-sm text-gray-500">Hybrid / Full-time</p>
          </div>
        </div>
        <Link href="/" className="btn btn-neutral rounded-none text-white px-6">
          ← Back to Headlines
        </Link>
      </main>
    </div>
  );
}
