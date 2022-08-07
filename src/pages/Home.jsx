import React, {useContext, useEffect, useState} from "react";
import {SearchContent} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../store/Slice/FilterSlice";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";


function Home() {
    const {categoryId, sort, toggleAscDesc, currentPage} = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    const {searchValue} = useContext(SearchContent)
    const [item, setItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const pizzas = item.filter((obj) => {
        if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map(obj => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const changeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const changePage = (id) => {
        dispatch(setCurrentPage(id))
    }

    useEffect(() => {
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const orderAscDesc = toggleAscDesc ? 'asc' : 'desc'


        setIsLoading(true)
        axios.get(`https://62dac46ce56f6d82a76955d1.mockapi.io/items?${
            category}&page=${currentPage}&limit=4&sortBy=${sort.sortBy}&order=${orderAscDesc}${search}`)
            .then((res) => {
                setItem(res.data);
                setIsLoading(false)
            })

        window.scrollTo(0, 0)
    }, [categoryId, sort, toggleAscDesc, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={(id) => changeCategory(id)}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeletons
                    : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} changePage={(id) => changePage(id)}/>
        </div>
    )
}

export default Home;
