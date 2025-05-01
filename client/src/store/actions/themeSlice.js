import { createSlice } from "@reduxjs/toolkit";

export const keepSlice = createSlice({
    name: 'keep',
    initialState: {
        userData: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        getUserData: (state) => {
			return state.userData ? state.userData : null
		}
    }
})

export const { setUserData, getUserData } = keepSlice.actions
export default keepSlice.reducer