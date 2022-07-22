import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isauth: false,
    role: '',
    username: "",
    id: null
}


const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.isauth = action.payload.isauth
            state.role = action.payload.role;
            state.username = action.payload.username
            state.id = action.payload.id
        },

    }
})

export const { setAuthData } = authenticationSlice.actions

export default authenticationSlice.reducer