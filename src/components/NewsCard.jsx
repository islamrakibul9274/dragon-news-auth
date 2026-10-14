import { FaRegBookmark, FaRegEye, FaStar } from "react-icons/fa";
import Link from "next/link";

const NewsCard = ({ news = {} }) => {
  const authorName = news?.author?.name || "Anonymous";
  const authorDate = news?.author?.published_date || "";
  const authorImg = news?.author?.img || "/assets/user.png";
  const title = news?.title || "Untitled Article";
  const imageUrl = news?.image_url || "/assets/demo-card-thumbnail.png";
  const details = news?.details || "";
  const ratingNumber = news?.rating?.number || 0;
  const totalView = news?.total_view || 0;
  const newsId = news?._id || "";

  return (
    <div className="card w-full bg-white shadow-sm border mb-4 border-gray-200 rounded-lg overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 border-b border-gray-100">
        <img
          src={authorImg}
          alt={authorName}
          className="w-10 h-10 rounded-full object-cover border"
          onError={(e) => {
            e.currentTarget.src = "/assets/user.png";
          }}
        />
        <div className="flex-1">
          <h2 className="font-semibold text-gray-800 text-sm">{authorName}</h2>
          {authorDate && <p className="text-xs text-gray-500">{authorDate}</p>}
        </div>
        <div className="flex gap-3 text-gray-500 text-base">
          <FaRegBookmark className="cursor-pointer hover:text-black transition-colors" />
          <FaStar className="cursor-pointer hover:text-yellow-500 transition-colors" />
        </div>
      </div>

      {/* Card Title */}
      <h2 className="px-4 pt-4 text-lg font-bold text-gray-900 leading-snug hover:text-red-600 transition-colors">
        <Link href={`/news/${newsId}`}>{title}</Link>
      </h2>

      {/* Card Image */}
      <figure className="px-4 pt-3">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-lg w-full h-[260px] object-cover"
          onError={(e) => {
            e.currentTarget.src = "/assets/demo-card-thumbnail.png";
          }}
        />
      </figure>

      {/* Card Details */}
      <div className="p-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {details.length > 180 ? `${details.slice(0, 180)}...` : details}
        </p>
        <Link
          href={`/news/${newsId}`}
          className="text-orange-500 font-semibold text-sm mt-2 inline-block hover:underline"
        >
          Read More
        </Link>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-1.5 text-orange-500 text-sm">
          <FaStar />
          <span className="font-semibold text-gray-800">{ratingNumber}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <FaRegEye />
          <span>{totalView}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
