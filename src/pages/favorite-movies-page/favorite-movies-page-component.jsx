import MoviesList from "../../component/movies-list/movies-list-component";
import {useContext} from "react";
import {FavoriteMoviesContext} from "../../contexts/favorite-movies-context/favorite-movies-context";


const FavoriteMoviesPageComponent = () => {
    const {favoriteMovies} = useContext(FavoriteMoviesContext)
    console.log(favoriteMovies)
    return <MoviesList movies={favoriteMovies}></MoviesList>
}

export default FavoriteMoviesPageComponent