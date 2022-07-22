import React from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import './scss/app.scss'


function App() {
    const [item, setItem] = React.useState([])

    React.useEffect(() => {
        fetch('https://62dac46ce56f6d82a76955d1.mockapi.io/items')
            .then(response => response.json())
            .then(data => setItem(data));
    }, [])

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {item.map(obj =>
                            <PizzaBlock key={obj.id} {...obj}
                            />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
