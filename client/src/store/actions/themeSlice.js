import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'light'
    },
    reducers: {
        setStoreTheme: (state, action) => {
			console.log("redux", action.payload)
            state.value = action.payload
        },
        getStoreTheme: (state) => {
			console.log("state", state.value)
			return state?.value
		}
    }
})

export const { setStoreTheme, getStoreTheme } = themeSlice.actions
export default themeSlice.reducer