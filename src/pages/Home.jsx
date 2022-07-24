import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";


function Home() {
    const [item, setItem] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('https://62dac46ce56f6d82a76955d1.mockapi.io/items')
            .then(response => response.json())
            .then((arr) => {
                setItem(arr);
                setIsLoading(false)
            });
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : item.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
                }
            </div>
        </div>
    )
}

export default Home;