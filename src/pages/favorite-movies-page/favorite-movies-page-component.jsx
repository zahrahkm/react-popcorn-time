import MoviesList from "../../component/movies-list/movies-list-component";
import {useContext, useEffect} from "react";
import {FavoriteMoviesContext} from "../../contexts/favorite-movies-context/favorite-movies-context";
import {
    createUserDocumentFromAuth,
    onAuthFavoriteMoviesStateChangedListener,
    onAuthStateChangedListener
} from "../../utils/firebase/firebase-utils";


const FavoriteMoviesPageComponent = () => {
    const {favoriteMovies} = useContext(FavoriteMoviesContext)
    return <MoviesList movies={favoriteMovies}></MoviesList>
}

export default FavoriteMoviesPageComponent