import HomeLayout from "../layouts/HomeLayout";
import CategoryNews from "../components/CategoryNews";
import HeroFeatured from "../components/HeroFeatured";
import MorningDigestAI from "../components/MorningDigestAI";
import NewsletterSubscribe from "../components/NewsletterSubscribe";
import { fetchNewsByCategory } from "../data/newsData";

export default async function HomePage() {
  const news = await fetchNewsByCategory("01");

  const leadStory = news.length > 0 ? news[0] : null;
  const feedStories = news.length > 1 ? news.slice(1) : news;

  return (
    <HomeLayout>
      {/* Lead Feature Story */}
      {leadStory && <HeroFeatured article={leadStory} />}

      {/* AI Morning Briefing Digest */}
      <MorningDigestAI />

      {/* Main Feed */}
      <CategoryNews news={feedStories} title="Today's Top Dispatches" />

      {/* Bottom Newsletter Subscribe Banner */}
      <div className="mt-10 mb-8">
        <NewsletterSubscribe variant="banner" />
      </div>
    </HomeLayout>
  );
}
