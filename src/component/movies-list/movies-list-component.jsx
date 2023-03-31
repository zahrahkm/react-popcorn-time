import MovieCard from "../movie-card/movie-card-component";
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import {useContext} from "react";
import {MoviesContext} from "../../contexts/movies-context/movies-context";


const MoviesList = ({movies}) => {
    return (
        <Container fluid>
            <Row>
                {
                    movies?.map((movie) => {
                        return <MovieCard movie={movie} key={movie.imdb_id}/>
                    })
                }
            </Row>
        </Container>
    )
}

export default MoviesList;