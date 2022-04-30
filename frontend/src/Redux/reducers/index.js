import { combineReducers } from 'redux'
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducer.js'

const RootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})
export default RootReducer;