import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import movieSlice from "./slices/movieSlice";

const rootReducer = combineReducers({
    movie: movieSlice,
})

const store = configureStore({
    reducer: rootReducer,
    enhancers: [],
})

export default store
