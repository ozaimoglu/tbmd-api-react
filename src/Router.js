import React  from "react"
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Detail from "./Pages/Detail/Detail"
import Stats from "./Pages/Stats/Stats"
import Layout from "./Components/Layout/Layout";

const RouterCore = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path=""
                    element={<Layout children={<Home />} />}
                />
                <Route
                    path="/detail/:id"
                    element={<Layout children={<Detail />} />}
                />
                <Route
                    path="/stats"
                    element={<Layout children={<Stats />} />}
                />
            </Routes>
        </Router>
    )
}
export default RouterCore
