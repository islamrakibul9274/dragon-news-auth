import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const LatestNews = () => {
    return (
        <div className="flex gap-2 justify-center items-center bg-base-300 p-3" >
            <p className="bg-[#D72050] text-base-100 px-3 py-1">Latest</p>


            <Marquee pauseOnHover={true} speed={100} className=" space-x-10">
                <Link to={'/news'}>
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, minima?
                </Link>
                <Link to={'/news'}>
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, minima?
                </Link>
                <Link to={'/news'}>
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, minima?
                </Link>
                <Link to={'/news'}>
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, minima?
                </Link>

            </Marquee>
        </div>
    );
};

export default LatestNews;