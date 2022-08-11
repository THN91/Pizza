import React, {useContext, useEffect, useRef, useState} from "react";
import {SearchContent} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setParamsUrl} from "../store/Slice/FilterSlice";
import axios from "axios";
import qs from "qs";
import {useNavigate} from "react-router-dom"


import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";


function Home() {
    const {categoryId, sort, toggleAscDesc, currentPage} = useSelector((state) => state.filter)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {searchValue} = useContext(SearchContent)
    const [item, setItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const pizzas = item.filter((obj) => {
        return obj.name.toLowerCase().includes(searchValue.toLowerCase());

    }).map(obj => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const changeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const changePage = (id) => {
        dispatch(setCurrentPage(id))
    }

    const fetchPizzas = () => {
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
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false;
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
            isSearch.current = true;
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
