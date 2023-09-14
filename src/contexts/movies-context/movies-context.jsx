import {createContext, useEffect, useReducer, useState} from "react";
import {useLocation, useParams} from "react-router-dom";


export const MoviesContext = createContext({
    movies: [],
    setMovies: () => [],
    page: 1,
    setPage: () => 1,
    hasMore: true,
    setHasMore: () => true,
    render: true,
    loading: false,
    noMovies: true,
    OtherPageMovies: [],
    setOtherPageMovies: () => [],
    genreTitle: 'all',
    sortTitle: 'trending'
})

const movieReducer = (state, action) => {
    const {type, payload} = action;
    console.log(action)
    switch (type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in Reducer!`)
    }
}
export const MoviesProvider = ({children}) => {
    // const [movies, setMovies] = useState([])
    const [{movies}, dispatch] = useReducer(movieReducer, {movies: []})
    const setMovies = (movie) => {
        dispatch({type: 'SET_MOVIES', payload: movie})
    }
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const [render, setRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [noMovies, setNoMovies] = useState(true)
    const [otherPageMovies, setOtherPageMovies] = useState([])
    const {genreTitle, sortTitle} = useParams()
    const searchString = useLocation().search
    const searchQuery = searchString.substring(1)
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [isFav, setIsFav] = useState(false)


    useEffect(() => {
        async function getFirstPageMovies() {
            setLoading(true)
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://shows.cf/movies/1?sort=${selectedSort ? `${selectedSort.toLocaleLowerCase()}` : "trending"}&order=-1&genre=${selectedGenre ? `${selectedGenre.toLocaleLowerCase()}` : "all"}&keywords=${searchQuery}`);
            const data = await response.json()
            setLoading(false)
            if (noMovies === false && movies.length !== 0) {
                return setNoMovies(false)
            } else {
                setNoMovies(true)
            }
            setMovies(data)
        }

        getFirstPageMovies()
    }, [selectedGenre, selectedSort, searchQuery]);

    useEffect(() => {
        const getOtherPageMovies = async () => {
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://shows.cf/movies/${page}?sort=${selectedSort ? `${selectedSort.toLocaleLowerCase()}` : "trending"}&order=-1&genre=${selectedGenre ? `${selectedGenre.toLocaleLowerCase()}` : "all"}&keywords=${searchQuery}`)
            const otherData = await response.json()
            setOtherPageMovies(otherData)
        }
        getOtherPageMovies()
    }, [page, selectedGenre, selectedSort, searchQuery])

    const fetchMovies = async () => {
        console.log('fetch')
        setMovies(movies.concat(otherPageMovies))
        setPage(page + 1)
    }

    const value = {
        movies,
        setSelectedGenre,
        setSelectedSort,
        setMovies,
        fetchMovies,
        hasMore,
        setHasMore,
        noMovies,
        loading,
        render
    };

    return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
}