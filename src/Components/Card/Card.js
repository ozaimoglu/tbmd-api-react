import React  from "react"
import PropTypes from "prop-types"
import "./Card.scss"
import Button from "../Button/Button"
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

const Card = (props) => {
    const {
        logo,
        buttonName,
        className,
        id,
        cardOnClick,
        buttonOnClick,
        name,
        description,
        rate,
        width,
        height,
    } = props

    return (
        <div style={{minWidth: width, height: height}} className={`outer-wrapper`}>
            <div className={`card-wrapper ${className}`} id={id} onClick={cardOnClick}>
                <div className="card-header">
                    <Rate
                        count={10}
                        value={rate}
                        style={{ fontSize: 16 }}
                        allowHalf
                        disabled
                        character={<i className="anticon anticon-star" />}
                    />
                    {logo && (<div className="img-wrapper">
                        <img src={logo} alt="card-img" loading="lazy" />
                    </div>)}
                </div>
                <div className="card-info">
                    <div className="card-info-header">
                        {name}
                    </div>
                    <div className="info-paragraph">
                        {description}
                    </div>
                </div>
                <div className="button-group">
                    {buttonName && (
                        <div className="button">
                            <Button
                                onClick={buttonOnClick}
                                icon={null}
                            >
                                {buttonName}
                            </Button
                            >
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    logo: PropTypes.string,
    subLogo: PropTypes.string,
    buttonName: PropTypes.string,
    showFavourite: PropTypes.bool,
    isFavourite: PropTypes.bool,
    productCard: PropTypes.bool,
    productImage: PropTypes.oneOf(["", "h-136"]),
    sponsorText: PropTypes.string,
    cardInfo: PropTypes.oneOfType([PropTypes.array]),
    starToggle: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.string,
    dimension: PropTypes.bool,
    dimensionText: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    buttonOnClick: PropTypes.func,
    cardOnClick: PropTypes.func,
    rate: PropTypes.number,
    height: PropTypes.string,
    width: PropTypes.string,
}

Card.defaultProps = {
    logo: "",
    subLogo: "",
    buttonName: "",
    showFavourite: false,
    isFavourite: false,
    sponsor: "",
    productImage: "",
    sponsorText: "",
    cardInfo: [{ title: "Title", text: "Text" }],
    className: "",
    name: "",
    id: "",
    dimension: false,
    dimensionText: "",
    rate: 5,
    width: "",
    height: "",
}

export default Card
