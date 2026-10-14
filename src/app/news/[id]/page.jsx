import Header from "../../../components/Header";
import RightNav from "../../../components/layout-component/RightNav";
import PrivateRoute from "../../../components/PrivateRoute";
import Link from "next/link";

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
      <div className="font-poppins min-h-screen bg-white text-gray-900 pb-12">
        <header className="py-4">
          <Header />
        </header>

        <main className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          <section className="col-span-12 md:col-span-9">
            <h2 className="font-bold text-xl mb-4 text-gray-900">Dragon News</h2>

            {news ? (
              <div className="card bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden p-6 md:p-8">
                <figure className="mb-6">
                  <img
                    src={news?.image_url || "/assets/demo-card-thumbnail.png"}
                    alt={news?.title || "News"}
                    className="rounded-xl w-full max-h-[500px] object-cover"
                  />
                </figure>
                <div className="space-y-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    {news?.title}
                  </h1>
                  <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                    {news?.details}
                  </p>

                  <div className="pt-4">
                    <Link
                      href={`/category/${news?.category_id || "01"}`}
                      className="btn bg-[#D72050] hover:bg-[#b0173e] text-white border-none rounded-none px-6"
                    >
                      ← Back to Category
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
                News article not found.
              </div>
            )}
          </section>

          <aside className="col-span-12 md:col-span-3">
            <RightNav />
          </aside>
        </main>
      </div>
    </PrivateRoute>
  );
}
