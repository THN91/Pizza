import React, {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router-dom"

import {SearchContent} from "../App";
import {setCategoryId, setCurrentPage, setParamsUrl} from "../store/Slice/filterSlice";
import {fetchPizzas} from "../store/Slice/pizzaSlice";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";


function Home() {
    const {categoryId, sort, toggleAscDesc, currentPage} = useSelector((state) => state.filter)
    const {items, status} = useSelector((state) => state.pizza)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isMounted = useRef(false)

    const {searchValue} = useContext(SearchContent)

    const pizzas = items.filter((obj) => {
        return obj.name.toLowerCase().includes(searchValue.toLowerCase());
    }).map(obj => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const changeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const changePage = (id) => {
        dispatch(setCurrentPage(id))
    }

    const getPizzas = async () => {

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const orderAscDesc = toggleAscDesc ? 'asc' : 'desc'
        dispatch(fetchPizzas({
            category,
            search,
            orderAscDesc,
            sort,
            currentPage
        }))
        window.scrollTo(0, 0)
    }


    useEffect(() => {
        getPizzas()
    }, [categoryId, sort, toggleAscDesc, searchValue, currentPage])


    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sortList = list.find(item => item.sortBy === params.sort)
            dispatch(setParamsUrl({
                    ...params,
                    sortList
                })
            )
        }
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sort.sortBy,
                categoryId,
                currentPage,
                toggleAscDesc
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort, toggleAscDesc, searchValue, currentPage])


    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={(id) => changeCategory(id)}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error'
                    ? (<div className="content__error-info">
                        <h2>
                            Произошла ошибка <i>😕</i>
                        </h2>
                        <p>
                            К сожалению, не удалось загрузить пиццы! Попробуйте повторить попытку позже
                        </p>
                    </div>)
                    : (<div className="content__items">
                        {status === 'loading'
                            ? skeletons
                            : pizzas
                        }
                    </div>)
            }

            <Pagination currentPage={currentPage} changePage={(id) => changePage(id)}/>
        </div>
    )
}

export default Home;
