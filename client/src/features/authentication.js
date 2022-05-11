import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isauth : false,
    role : '',
    user : null
}


const authenticationSlice = createSlice({
    name : 'authentication',
    initialState,
    reducers : {

    }
})

export const {} = authenticationSlice.actions

export  default  authenticationSlice.reducer