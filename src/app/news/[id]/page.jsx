import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import RightNav from "../../../components/layout-component/RightNav";
import PrivateRoute from "../../../components/PrivateRoute";
import ArticleReader from "../../../components/ArticleReader";

async function getNewsDetail(id) {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch news detail:", error);
    return null;
  }
}

export default async function NewsDetailsPage({ params }) {
  const news = await getNewsDetail(params.id);

  return (
    <PrivateRoute>
      <div className="font-poppins min-h-screen bg-white text-gray-900 pb-16">
        <Header />
        <Navbar />

        <main className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          <section className="lg:col-span-8">
            {news ? (
              <ArticleReader news={news} />
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center text-gray-500">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Dispatch Not Found
                </h3>
                <p className="text-xs">
                  This article may have been archived or moved.
                </p>
              </div>
            )}
          </section>

          <aside className="lg:col-span-4">
            <RightNav />
          </aside>
        </main>
      </div>
    </PrivateRoute>
  );
}
