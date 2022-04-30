import { combineReducers } from 'redux'
import { userLoginReducer } from '../reducers/userReducer.js'

const RootReducer = combineReducers({
    userLogin: userLoginReducer,
})
export default RootReducer;