import { configureStore } from '@reduxjs/toolkit'

import filter from './Slice/filterSlice'
import cart from './Slice/cartSlice'

export const store = configureStore({
    reducer: {
        filter,
        cart,
    },
})
