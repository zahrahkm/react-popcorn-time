import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {
    auth, db, getFavoriteMoviesFromAuth
} from "../../utils/firebase/firebase-utils";
import {UserContext} from "../user-context/user-context";
import {createUserDocumentFromAuth} from "../../utils/firebase/firebase-utils";

const addFavoriteItem = (favoriteMovies, movieToAdd) => {
    const existingFavoriteMovie = favoriteMovies.find((fav) => fav.imdb_id === movieToAdd.imdb_id)
    if (existingFavoriteMovie) {
        return favoriteMovies.filter(
            (fav) => fav.imdb_id !== movieToAdd.imdb_id
        );
    }
    return '#ff0000';

}


export const FavoriteMoviesContext = createContext({
    favoriteMovies: [],
    addFavorite: () => [],
    isFavorite: false,
    setIsFavorite: () => false
})

const favoriteMoviesReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'FAVORITE_MOVIES':
            return {
                ...state,
                favoriteMovies: payload
            }
        default :
            throw new Error(`Unhandled type ${type} in Reducer!`)
    }
}

export const FavoriteMoviesProvider = ({children}) => {
    // const [favoriteMovies, setFavoriteMovies] = useState([])
    const [{favoriteMovies}, dispatch] = useReducer(favoriteMoviesReducer, {favoriteMovies: []})
    const setFavoriteMovies = (movie) => {
        dispatch({type: 'FAVORITE_MOVIES', payload: movie})
    }
    const [isFavorite, setIsFavorite] = useState(false);

    const {currentUser} = useContext(UserContext)
    const addMovieToFavorite = async (movieToAdd) => {
        await createUserDocumentFromAuth(currentUser, {}, movieToAdd)
        // isFavorite(addFavoriteItem(favoriteMovies,movieToAdd))

    }
    const fetchFavMovieFromAuth = async (currentUser) => {
        const res = await getFavoriteMoviesFromAuth(currentUser)
        setFavoriteMovies(res)
    }
    useEffect(() => {
        fetchFavMovieFromAuth(currentUser)
    }, [currentUser, favoriteMovies])

    const value = {favoriteMovies, setFavoriteMovies, addMovieToFavorite, isFavorite};
    return <FavoriteMoviesContext.Provider value={value}>{children}</FavoriteMoviesContext.Provider>
}