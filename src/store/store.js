import { configureStore } from '@reduxjs/toolkit'

import filter from './Slice/filterSlice'
import cart from './Slice/cartSlice'
import pizza from './Slice/pizzaSlice'

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
})
