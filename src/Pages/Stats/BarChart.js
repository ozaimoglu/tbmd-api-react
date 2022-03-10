import React, {useEffect} from 'react';
import "./BarChart.scss"

const COLORS = ["red", "green", "blue", "orange", "pink", "yellow", "darkblue", "grey", "black", "brown"]

const BarChart = ({ data, title, yData, tooltipText }) => {

    useEffect(() => {
        setTimeout(() => {
            const ele = document.getElementsByClassName("bar")
            for (let i = 0; i < ele.length; i++) {
                ele[i].className += " show"
            }
        }, 500)
    }, [])

    return (
        <div className="chart">
            {title}
            <div className="chart-container">
                <div className="chart-top">
                    <div className="chart-y-title">
                        {!yData ? [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(item => <div key={item}>{item}</div>) : yData.map(item => <div key={item}>{item}</div>)}
                    </div>
                    <div className="bar-chart">
                        {data.map((item, index) => <div key={index} className="bar" style={{ height: yData ? (item.rate / 1000 * 16).toString() + "px" : (item.rate * 40).toString() + "px", backgroundColor: COLORS[index]}}>
                            <span className="tooltiptext title">{item.title}</span>
                            <span className="tooltiptext">{tooltipText + ": " + item.rate}</span>
                        </div>)}
                    </div>
                </div>
                <div className="chart-bottom">
                    <div className="chart-bottom-left"/>
                    <div className="chart-x-title">
                        {data.map(item => <div key={item.title}>{item.title}</div>)}
                    </div>
                </div>
            </div>
        </div>

    )

}

export default BarChart;
