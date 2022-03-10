import React, {useEffect, useState} from "react"
import "./Stats.scss"
import BarChart from "./BarChart";
import makeRequest from "../../Request";

const Stats = () => {
    const [data, setData] = useState([]);
    const [countData, setCountData] = useState([]);

    const fetchTopMovies = () => {
        makeRequest({
            url: "movie/top_rated?api_key=debc097a1224e588b4dbc844957259e9&page=1",
            method: "get"
        }).then((res) => {
            let obj = {}
            let countObj = {}
            let arr = []
            let countArr = []
            for (let i = 0; i < 10; i++) {
                obj = {
                    rate: res.data.results[i].vote_average,
                    title: res.data.results[i].title,
                    count: res.data.results[i].vote_count
                }
                countObj = {
                    rate: res.data.results[i].vote_count,
                    title: res.data.results[i].title
                }
                countArr.push(countObj)
                arr.push(obj)
            }
            setData(arr)
            setCountData(countArr)
        })
    }

    useEffect(() => {
       fetchTopMovies()
    }, []);


    return (
        <div className="stats-container">
            <BarChart tooltipText="Rate" title="Top Movies Ratings" data={data} />
            <BarChart tooltipText="Rate Count" yData={["25k +", "20k", "15k", "10k", "5k", "0"]} title="Top Movies Ratings Counts" data={countData} />
        </div>
    )
}

export default Stats
