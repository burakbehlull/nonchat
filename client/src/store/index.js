import { configureStore } from "@reduxjs/toolkit"
import themeSlice from "./actions/themeSlice"

export const store = configureStore({
    reducer: {
        theme: themeSlice,
    },
})

