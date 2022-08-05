import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import './scss/app.scss'


export const SearchContent = React.createContext();

function App() {
    const [searchValue, setSearchValue] = React.useState('')

    return (
        <div className="wrapper">
            <SearchContent.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </SearchContent.Provider>
        </div>
    );
}

export default App;
