import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../../component/loading-spinner/loading-spinner-component";
import MoviesList from "../../component/movies-list/movies-list-component";
import {useContext} from "react";
import {MoviesContext} from "../../contexts/movies-context/movies-context";
import {FavoriteMoviesContext} from "../../contexts/favorite-movies-context/favorite-movies-context";


const LoadingMovies = () => {
    const {movies, fetchMovies, hasMore, noMovies, loading, render} = useContext(MoviesContext)
    return (
        <Container fluid className='container-padding' key={render}>
            <div id="scrollableDiv" className='scroll'>
                <InfiniteScroll
                    render={false}
                    dataLength={movies?.length}
                    next={fetchMovies}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <LoadingSpinner loading={loading}></LoadingSpinner>
                    {noMovies ? false : <h2>No movies found...</h2>}
                    {loading ? false : <MoviesList movies={movies}/>}
                </InfiniteScroll>
            </div>
        </Container>
    )

}
export default LoadingMovies;