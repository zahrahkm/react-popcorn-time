import Container from "react-bootstrap/Container";
import LoadingMovies from "../loading-movies/loading-movies-component";


const MoviesDataLoading = ({movies, fetchMovies, hasMore, render, loading, noMovies}) => {
    return (
        <Container fluid className='container-padding'>
            <LoadingMovies movies={movies} fetchMovies={fetchMovies} hasMore={hasMore} render={render} loading={loading}
                           noMovies={noMovies}/>
        </Container>
    )
}
export default MoviesDataLoading;