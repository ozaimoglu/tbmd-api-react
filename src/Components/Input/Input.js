import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Input.scss"

const Input = ({placeholder, id, icon, iconOnClick, onChange, onKeyPress}) => {
    return (
        <>
            <div id={id} className="input-container">
                <FontAwesomeIcon style={{cursor: "pointer"}} icon={icon} onClick={iconOnClick} />
                <input onKeyPress={onKeyPress} onChange={onChange} className="input" placeholder={placeholder} />
            </div>
        </>
    )
}

Input.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.object,
    iconOnClick: PropTypes.func,
    onKeyPress: PropTypes.func,
}

Input.defaultProps = {
    id: "",
    placeholder: "",
    icon: <></>,
    iconOnClick: () => null,
    onKeyPress: () => null
}

export default Input
