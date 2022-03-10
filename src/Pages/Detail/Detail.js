import React, {useEffect, useState} from "react"
import "./Detail.scss"
import makeRequest from "../../Request";
import Rate from "rc-rate";
import { useNavigate  } from "react-router-dom";
import Card from "../../Components/Card/Card";
import {useSelector} from "react-redux";
import cogoToast from 'cogo-toast';

const Detail = () => {
    const navigate = useNavigate()
    const [movieDetail, setMovieDetail] = useState({})
    const [similarMovies, setSimilarMovies] = useState([])
    const { sessionId } = useSelector((state) => state.movie)

    const fetchMovieDetail = () => {
        makeRequest({
            url: "movie/" + window.location.pathname.split("/").pop() + "?api_key=debc097a1224e588b4dbc844957259e9&language=en-US",
            method: "get"
        }).then((res) => {
            setMovieDetail(res.data)
        })
    }

    const getSimilarMovies = () => {
        makeRequest({
            url: "movie/" + window.location.pathname.split("/").pop() + "/similar?api_key=debc097a1224e588b4dbc844957259e9&language=en-US&page=1",
            method: "get"
        }).then((res) => {
            setSimilarMovies(res.data.results)
        })
    }

    const rateMovie = async (value) => {
        if (sessionId) {
            await makeRequest({
                url: "movie/" + window.location.pathname.split("/").pop() + "/rating?api_key=debc097a1224e588b4dbc844957259e9&guest_session_id=" + sessionId,
                method: "post",
                data: {
                    value,
                }
            }).then(() => cogoToast.success('Rate Success!!!'))
        } else {
            cogoToast.error('Error!!!')
        }
    }

    const cardOnClick = (item) => {
        navigate("/detail/" + item.id);
    }

    useEffect(() => {
        fetchMovieDetail()
        getSimilarMovies()
    }, [window.location.pathname.split("/").pop()]);

    return (
        <div className="detail-container">
            <div className="detail-left">
                <img alt="" src={movieDetail?.poster_path && ("https://image.tmdb.org/t/p/w500/" + movieDetail?.poster_path)}/>
            </div>
            <div className="detail-right">
                <div className="title">{movieDetail?.title}
                    <Rate
                        onChange={(value) => rateMovie(value)}
                        count={10}
                        value={movieDetail?.vote_average}
                        style={{ fontSize: 16, marginLeft: "10px" }}
                        allowHalf
                        character={<i className="anticon anticon-star"/>} />
                    <div className="rate">{movieDetail?.vote_average} ({movieDetail?.vote_count} votes)</div>
                </div>
                <div className="description">{movieDetail?.overview}</div>
                <div className="date">
                    <div>Release Date:</div>
                    <div>{movieDetail?.release_date}</div>
                </div>
                <div className="date">
                    <div>Language:</div>
                    <div>{movieDetail?.original_language?.toString().toUpperCase()}</div>
                </div>
                <div className="date">
                    <div>Duration:</div>
                    <div>{movieDetail?.runtime} Minutes</div>
                </div>
                <div className="date">
                    <div>Budget:</div>
                    <div>{movieDetail?.budget} $</div>
                </div>
                <div className="date">
                    <div>Revenue:</div>
                    <div>{movieDetail?.revenue} $</div>
                </div>
                Similar Movies:

                <div className="similar">
                        {similarMovies?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card width="280px" cardOnClick={() => cardOnClick(item)} rate={item.vote_average} description={item.overview} buttonName="Detail" name={item.title} logo={item.backdrop_path && ("https://image.tmdb.org/t/p/w500/" + item.backdrop_path)}/>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Detail
