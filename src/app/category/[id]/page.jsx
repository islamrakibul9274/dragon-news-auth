import HomeLayout from "../../../layouts/HomeLayout";
import CategoryNews from "../../../components/CategoryNews";
import HeroFeatured from "../../../components/HeroFeatured";
import NewsletterSubscribe from "../../../components/NewsletterSubscribe";

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

  const leadStory = news.length > 0 ? news[0] : null;
  const feedStories = news.length > 1 ? news.slice(1) : news;

  return (
    <HomeLayout>
      {leadStory && <HeroFeatured article={leadStory} />}
      <CategoryNews news={feedStories} title="Category Dispatches" />
      <div className="mt-10">
        <NewsletterSubscribe variant="banner" />
      </div>
    </HomeLayout>
  );
}
