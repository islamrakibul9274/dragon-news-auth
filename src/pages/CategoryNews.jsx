import { useLoaderData } from "react-router-dom";
import NewsCard from "../components/NewsCard";


const CategoryNews = () => {
    ///  News is using relatively instead of data for better understanding
    const {data:news} = useLoaderData()
    console.log(news);

    return (
        <div>
            <h2 className="font-semibold mb-3">Dragon News Home</h2>
            <div>
                {
                    news.map((singleNews) => <NewsCard key={singleNews._id} news={singleNews} />)
                }
            </div>
        </div>
    );
};

export default CategoryNews;