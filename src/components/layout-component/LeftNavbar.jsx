import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


const LeftNavbar = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://openapi.programming-hero.com/api/news/categories")
            .then(result => result.json())
            .then((data) => setCategories(data.data.news_category))
            .catch((error) => console.error(error));

    }, [])

    // {
    //     "category_id": "01",
    //         "category_name": "Breaking News"
    // }

    return (
        <div>
            <h2 className="font-semibold mb-3">All Caterogy: {categories.length}</h2>
            <div className="flex flex-col gap-2">
                {
                    categories.map((categorie) =>
                        <NavLink
                            to={`category/${categorie.category_id}`}
                            key={categorie.category_id}
                            className="btn"
                        >

                            {categorie.category_name}
                        </NavLink>)
                }
            </div>
        </div>
    );
};

export default LeftNavbar;