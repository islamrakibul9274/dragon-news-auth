import HomeLayout from "../layouts/HomeLayout";
import CategoryNews from "../components/CategoryNews";
import HeroFeatured from "../components/HeroFeatured";
import MorningDigestAI from "../components/MorningDigestAI";
import NewsletterSubscribe from "../components/NewsletterSubscribe";

async function getCategoryNews(categoryId = "01") {
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

export default async function HomePage() {
  const news = await getCategoryNews("01");

  const leadStory = news.length > 0 ? news[0] : null;
  const feedStories = news.length > 1 ? news.slice(1) : news;

  return (
    <HomeLayout>
      {/* Lead Story */}
      {leadStory && <HeroFeatured article={leadStory} />}

      {/* AI Morning Briefing Digest */}
      <MorningDigestAI />

      {/* Main Feed */}
      <CategoryNews news={feedStories} title="Today's Top Dispatches" />

      {/* Bottom Newsletter Subscribe Banner */}
      <div className="mt-10">
        <NewsletterSubscribe variant="banner" />
      </div>
    </HomeLayout>
  );
}
