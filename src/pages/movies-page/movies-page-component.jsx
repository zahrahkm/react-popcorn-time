import NavbarComponent from "../../component/navbar/navbar-component";
import MoviesDataLoading from "../../component/movies-data-loading/movies-data-loading-component";
import {Fragment} from "react";

const MoviesPage = (props) => {
    const {render, genreTitle, sortTitle, movies, hasMore, loading, noMovies, fetchMovies} = props
    return (
        <Fragment>
            <NavbarComponent genreTitle={genreTitle} sortTitle={sortTitle}/>
            <MoviesDataLoading render={render} movies={movies} hasMore={hasMore} loading={loading} noMovies={noMovies}
                               fetchMovies={fetchMovies}/>} />
        </Fragment>
    )
}
export default MoviesPage;