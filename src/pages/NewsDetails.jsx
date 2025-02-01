import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import RightNav from "../components/layout-component/RightNav";


const NewsDetails = () => {
    const data = useLoaderData();
    const news = data.data[0];
    console.log(news);
    return (
        <div className="font-poppins">
            <header>
                <Header></Header>
            </header>
            <main className="w-11/12 mx-auto grid grid-cols-12 gap-5">
                <section className="col-span-9" >
                    <h2 className="font-semibold mb-3">Dragon News</h2>
                    {/* Card */}

                    <div className="card bg-base-100  shadow-sm">
                        <figure className="px-10 pt-10">
                            <img
                                src={news?.image_url}
                                alt="News"
                                class="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{ news?.title}</h2>
                            <p>{news?.details}</p>
                            
                            <Link to={`/category/${news?.category_id}`} className="card-actions">
                                <button className="btn btn-primary">Back to Category</button>
                            </Link>
                        </div>
                    </div>
                    {/* END OF CARD */}
                </section>

                <aside className="col-span-3">
                    <RightNav></RightNav>
                </aside>
            </main>
        </div>
    );
};

export default NewsDetails;