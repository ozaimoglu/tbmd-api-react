import React from "react"
import "./Header.scss"
import PropTypes from "prop-types"

const Header = ({className, headerLeftClassName, headerRightClassName, id, headerLeftContent, headerRightContent, style,}) =>
    (
    <div id={id} className={`header ${className}`} style={style}>
        <div className={`header-left ${headerLeftClassName}`}>
            {headerLeftContent}
        </div>
        <div className={`header-right ${headerRightClassName}`}>
            {headerRightContent}
        </div>
    </div>
)
Header.propTypes = {
    headerLeftContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    id: PropTypes.string,
    headerLeftClassName: PropTypes.string,
    headerRightClassName: PropTypes.string,
    className: PropTypes.string,
    headerRightContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    style: PropTypes.oneOfType([PropTypes.object]),

}

Header.defaultProps = {
    id: "",
    headerRightClassName: "",
    className: "",
    headerLeftClassName: "",
    headerLeftContent: null,
    headerRightContent: null,
    style: {},
}

export default Header
