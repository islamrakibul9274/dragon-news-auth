import { FaRegBookmark, FaRegEye, FaStar } from "react-icons/fa";
// New Method of handling props
const NewsCard = (props = {}) => {
    const { news } = props || {};
    return (
        <div className="card w-full bg-base-100 shadow-xl border mb-3 p-3 border-gray-200">
            {/* Card Header */}
            <div className="flex items-center gap-4 p-4">
                <img
                    src={news.author.img}
                    alt={news.author.name}
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">{news.author.name}</h2>
                    <p className="text-sm text-gray-500">{news.author.published_date}</p>
                </div>
                <div className="flex gap-2 text-gray-500">
                    <FaRegBookmark className="cursor-pointer" />
                    <FaStar className="cursor-pointer" />
                </div>
            </div>

            {/* Card Title */}
            <h2 className="px-4 text-lg font-bold">
                {news.title}
            </h2>

            {/* Card Image */}
            <figure className="px-4 pt-2">
                <img
                    src={news.image_url}
                    alt="News Thumbnail"
                    className="rounded-lg w-full  object-cover mb-4"
                />
            </figure>

            {/* Card Details */}
            <div className="p-4">
                <p className="text-gray-700 text-sm">
                    {news.details.slice(0, 150)}.....{""}
                </p>
                <a href="#" className="text-orange-500 font-semibold mt-2 inline-block">
                    Read More
                </a>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <div className="flex items-center gap-1 text-orange-500">
                    <FaStar />
                    <span className="font-semibold">{news.rating.number}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                    <FaRegEye />
                    <span>{news.total_view}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
