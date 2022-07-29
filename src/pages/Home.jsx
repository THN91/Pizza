import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";


function Home({searchValue}) {
    const [item, setItem] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({name: "популярности", sortBy: "rating"})

    const pizzas = item.filter((obj) => {
        if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map(obj => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)


    React.useEffect(() => {
        const categoty = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        setIsLoading(true)

        fetch(`https://62dac46ce56f6d82a76955d1.mockapi.io/items?${
            categoty}&sortBy=${sortType.sortBy}&order=${sortType.order}${search}`)
            .then(response => response.json())
            .then((arr) => {
                setItem(arr);
                setIsLoading(false)
            });
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
                <Sort sort={sortType} setSortType={setSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeletons
                    : pizzas
                }
            </div>
        </div>
    )
}

export default Home;