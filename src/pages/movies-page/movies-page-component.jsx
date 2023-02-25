import Container from "react-bootstrap/Container";
import LoadingMovies from "../../component/loading-movies/loading-movies-component";


const MoviesPage = ({movies, fetchMovies, hasMore, render, loading, noMovies}) => {
    // const {render, movies, fetchMovies, hasMore, loading, noMovies,filteredByGenre} = props;
    return (
        <Container fluid className='container-padding'>
            <LoadingMovies movies={movies} fetchMovies={fetchMovies} hasMore={hasMore} render={render} loading={loading}
                           noMovies={noMovies}/>
        </Container>
    )
}
export default MoviesPage;