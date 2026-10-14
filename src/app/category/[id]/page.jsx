import HomeLayout from "../../../layouts/HomeLayout";
import CategoryNews from "../../../components/CategoryNews";
import HeroFeatured from "../../../components/HeroFeatured";
import NewsletterSubscribe from "../../../components/NewsletterSubscribe";
import { fetchNewsByCategory } from "../../../data/newsData";

export default async function CategoryPage({ params }) {
  const { id } = params;
  const news = await fetchNewsByCategory(id);

  const leadStory = news.length > 0 ? news[0] : null;
  const feedStories = news.length > 1 ? news.slice(1) : news;

  return (
    <HomeLayout>
      {leadStory && <HeroFeatured article={leadStory} />}
      <CategoryNews news={feedStories} title="Category Dispatches" />
      <div className="mt-10 mb-8">
        <NewsletterSubscribe variant="banner" />
      </div>
    </HomeLayout>
  );
}
