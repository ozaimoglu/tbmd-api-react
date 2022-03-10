import React from "react"
import Header from "../Header/Header";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLineChart} from "@fortawesome/free-solid-svg-icons"
import "./Layout.scss"

const Layout = ({children}) => {
    const navigate = useNavigate()
    return (
        <div className="layout">
            <Header
                headerLeftContent={<img style={{cursor: "pointer"}} onClick={() => navigate("/")} width="100%" src={logo} alt=""/>}
                headerRightContent={
                <div  style={{cursor: "pointer"}} onClick={() => navigate("/stats")} className="right-header">
                    <FontAwesomeIcon color="#04B4E3" icon={faLineChart} />
                    <div style={{cursor: "pointer", color: "#04B4E3"}}>Stats</div>
                </div>}
            />
            <div className="content">
                {children}
            </div>
        </div>
    )
}
export default Layout
