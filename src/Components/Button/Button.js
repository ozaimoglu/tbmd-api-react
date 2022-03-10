import React, { useState } from "react"
import "./Button.scss"
import PropTypes from "prop-types"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function generateUniqueKey() {
    return `_${Math.random()
        .toString(36)
        .substr(2, 9)}`
}

const Button = React.forwardRef((props, ref) => {
    const {
        id,
        icon,
        className,
        text,
        textColor,
        borderColor,
        backgroundColor,
        onClick, style, disabled, children, variant, size,
    } = props
    const [styles] = useState({
        color: textColor,
        borderColor,
        backgroundColor,
    })

    return (
        <button
            ref={ref}
            disabled={disabled}
            onClick={onClick}
            id={id}
            key={generateUniqueKey()}
            style={{ ...styles, ...style, width: (!children && !text) ? "40px" : "" }}
            type="button"
            className={`button ${variant} ${size} ${className}`}
        >
            {icon && (
                <FontAwesomeIcon style={{cursor: "pointer", marginRight: "5px"}} icon={icon} />
            ) }
            {text}
            {children}
        </button>
    )
})

Button.propTypes = {
    icon: PropTypes.object,
    text: PropTypes.string,
    id: PropTypes.string,
    variant: PropTypes.oneOf(["success", "warning", "danger", "primary", "darknes-outline", "secondary", "borderless", "darkness", "darknessOutline", "filter"]),
    className: PropTypes.string,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object]),
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    size: PropTypes.oneOf(["small"]),

}

Button.defaultProps = {
    text: "",
    icon: <></>,
    textColor: null,
    borderColor: null,
    backgroundColor: "",
    id: "",
    className: "",
    onClick: null,
    style: {},
    disabled: false,
    children: null,
    variant: "primary",
    size: null,
}

export default Button
