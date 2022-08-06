import React from "react";
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sort: {name: "популярности", sortBy: "rating"},
    toggleAscDesc: true,
    currentPage: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sort = action.payload
        },
        setToggle(state, action) {
            state.toggleAscDesc = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }

    },
})

export const {setCategoryId, setSortType, setToggle, setCurrentPage} = filterSlice.actions

export default filterSlice.reducer
