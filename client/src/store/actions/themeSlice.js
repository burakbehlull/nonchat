import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'light'
    },
    reducers: {
        setStoreTheme: (state, action) => {
			localStorage.setItem("theme", action.payload)
            state.value = action.payload
        },
        getStoreTheme: (state) => {
			return state?.value
		}
    }
})

export const { setStoreTheme, getStoreTheme } = themeSlice.actions
export default themeSlice.reducer