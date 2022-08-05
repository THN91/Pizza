import { configureStore } from '@reduxjs/toolkit'

import filter from './Slice/FilterSlice'

export const store = configureStore({
    reducer: {
        filter,
    },
})
