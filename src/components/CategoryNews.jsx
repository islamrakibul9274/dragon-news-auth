import NewsCard from "./NewsCard";

const CategoryNews = ({ news = [], title = "Dragon News Home" }) => {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-4 text-gray-800">
        {title} ({news.length})
      </h2>
      {news.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          No news articles found in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((singleNews) => (
            <NewsCard key={singleNews._id} news={singleNews} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNews;
