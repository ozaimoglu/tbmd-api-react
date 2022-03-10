import React, {useEffect, useState} from "react"
import './Home.scss';
import Card from "../../Components/Card/Card";
import { useNavigate  } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {setMovieInfo, setSessionId} from "../../Store/slices/movieSlice";
import makeRequest from "../../Request";
import {Col, Row} from "react-bootstrap"
import {faArrowRight, faArrowLeft, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import Button from "../../Components/Button/Button"
import Input from "../../Components/Input/Input"
import Select from "../../Components/Select/Select"

const Home = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const { sessionId } = useSelector((state) => state.movie)
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [order, setOrder] = useState("popularity.desc")
    const [search, setSearch] = useState("")

    const fetchMovies = () => {
        makeRequest({
            url: "discover/movie?api_key=debc097a1224e588b4dbc844957259e9&language=en-US&sort_by=" + order + "&include_adult=true&include_video=false&page=" + page + "&with_watch_monetization_types=flatrate",
            method:"get",
        }).then((res) => {
            setMovies(res.data.results)
            if (res.data.results.length === 20) {
                setHasMore(true)
            } else {
                setHasMore(false)
            }
        }).catch((err) => console.log("Error!!"))

    }

    const searchMovie = () => {
        makeRequest({
            url: "search/movie?api_key=debc097a1224e588b4dbc844957259e9&language=en-US&query=" + search + "&page=" + page + "&include_adult=false",
            method:"get",
        }).then((res) => {
            setMovies(res.data.results)
            if (res.data.results.length === 20) {
                setHasMore(true)
            } else {
                setHasMore(false)
            }
        }).catch((err) => console.log("Error!!"))
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if (search.length > 3) {
                setPage(1)
                searchMovie()
            } else if(search.length === 0){
                fetchMovies()
            }
        }
    }

    const cardOnClick = (item) => {
        dispatch(setMovieInfo(item))
        navigate("/detail/" + item.id);
    }

    const getSessionId = () => {
        makeRequest({
            url: "authentication/guest_session/new?api_key=debc097a1224e588b4dbc844957259e9",
            method: "get"
        }).then((res) => {
            dispatch(setSessionId(res.data.guest_session_id))
        })
    }

    useEffect(() => {
        if (search.length > 3) {
            searchMovie()
        } else {
            fetchMovies()
        }

        if (!sessionId) {
            getSessionId()
        }
    }, [page, order])

    return (
        <div className="home-container">
            <div className="home-header">
                <Select options={[
                    {
                        text: "Popularity",
                        value: "popularity.desc"
                    },
                    {
                        text: "Release Date",
                        value: "release_date.desc"
                    },
                    {
                        text: "Rate",
                        value: "vote_average.desc"
                    }
                ]}
                onChange={(e) => {
                    setOrder(e.target.value)
                }}
                />
                <Input onKeyPress={handleKeyPress} iconOnClick={() => {
                    if (search.length > 3) {
                        setPage(1)
                        searchMovie()
                    } else if(search.length === 0){
                        fetchMovies()
                    }
                }} onChange={(e) => setSearch(e.target.value)} icon={faMagnifyingGlass} placeholder="Search" />
            </div>
            <Row className="movies-container">
                {movies?.map((item, index) => {
                    return (
                        <Col key={index} className="mt-4" lg={3}>
                            <Card cardOnClick={() => cardOnClick(item)} rate={item.vote_average} description={item.overview} buttonName="Detail" name={item.title} logo={item.backdrop_path && ("https://image.tmdb.org/t/p/w500/" + item.backdrop_path)}/>
                        </Col>
                    )
                })}
            </Row>
            <div className="mt-4 page-buttons">
                {page > 1 &&
                    <Button icon={faArrowLeft} onClick={() => {
                        document.getElementsByClassName("home-header")[0].scrollIntoView({
                            behavior: "smooth"
                        })
                        setPage(page - 1)
                    }}>Previous Page</Button>
                }
                {hasMore && <Button icon={faArrowRight} onClick={() => {
                    document.getElementsByClassName("home-header")[0].scrollIntoView({
                        behavior: "smooth"
                    })
                    setPage(page + 1)
                }}>Next Page</Button>}
            </div>
        </div>
    );
}

export default Home;
