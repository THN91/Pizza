import React from "react";
import axios from "axios";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const {category, search, orderAscDesc, sort, currentPage} = params
        const { data } = await axios.get(`https://62dac46ce56f6d82a76955d1.mockapi.io/items?${
            category}&page=${currentPage}&limit=4&sortBy=${sort.sortBy}&order=${orderAscDesc}${search}`)
        return data

    });

const initialState = {
    items: [],
    status: 'loading',
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItem(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        }
    }
})

export const {setItem} = pizzaSlice.actions

export default pizzaSlice.reducer
