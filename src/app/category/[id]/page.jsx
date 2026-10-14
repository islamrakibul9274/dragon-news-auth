import HomeLayout from "../../../layouts/HomeLayout";
import CategoryNews from "../../../components/CategoryNews";

async function getCategoryNews(categoryId) {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${categoryId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch category news:", error);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  const { id } = params;
  const news = await getCategoryNews(id);

  return (
    <HomeLayout>
      <CategoryNews news={news} title="Dragon News Home" />
    </HomeLayout>
  );
}
