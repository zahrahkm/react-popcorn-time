import {Component} from "react";
import MovieCard from "../movie-card/movie-card-component";
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import {Nav} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import SingleMoviePage from "../../pages/single-movie-page/single-movie-page-component";

const MoviesList = ({movies}) => {
    return (
        <Container fluid>
            <Row>

                {movies?.map((movie) => {
                    return <MovieCard movie={movie} key={movie.imdb_id}/>
                })
                }


            </Row>
        </Container>
    )

}

export default MoviesList;