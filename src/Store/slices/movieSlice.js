import { createSlice } from "@reduxjs/toolkit"

const movieSlice = createSlice({
    name: "movieSlice",
    initialState: {
        movieInfo: {},
        sessionId: sessionStorage.getItem("sessionId") || "",
    },
    reducers: {
        setMovieInfo: (state, action) => {
            state.movieInfo = action.payload
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload
            sessionStorage.setItem("sessionId", action.payload)
        }
    },
})

export const { setMovieInfo, setSessionId } = movieSlice.actions
export default movieSlice.reducer
