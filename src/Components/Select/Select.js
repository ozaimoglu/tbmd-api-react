import React from "react"
import "./Select.scss"

const Select = ({options, name, id, onChange}) => {
    return (
        <select className="select" name={name} id={id} onChange={onChange}>
            {options.map((item, index) => {
                return (
                    <option key={index} value={item.value}>{item.text}</option>
                )
            })}
        </select>
    )
}

export default Select
