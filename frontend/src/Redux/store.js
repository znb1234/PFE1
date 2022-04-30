import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

const logger = createLogger({
    collapsed: true,
    colors: {
        title: () => "#0B698F",
        prevState: () => "#7286E9",
        action: () => "#bd2839",
        nextState: () => "#1DB954",
        error: () => "#FF534D",
    },
});

const userInfoFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

const initialState = {
    userLogin: { user: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;