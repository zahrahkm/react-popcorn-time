import {createContext, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import LoadingMovies from "../../component/loading-movies/loading-movies-component";


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
    genreTitle: 'zall',
    sortTitle: 'trending'
})


export const MoviesProvider = ({children}) => {
    const [movies, setMovies] = useState([])
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


    useEffect(() => {
        async function getFirstPageMovies() {
            setLoading(true)
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/1?sort=${selectedSort ? `${selectedSort.toLocaleLowerCase()}` : "trending"}&order=-1&genre=${selectedGenre ? `${selectedGenre.toLocaleLowerCase()}` : "all"}&keywords=${searchQuery}`);
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
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/${page}?sort=${selectedSort ? `${selectedSort.toLocaleLowerCase()}` : "trending"}&order=-1&genre=${selectedGenre ? `${selectedGenre.toLocaleLowerCase()}` : "all"}&keywords=${searchQuery}`)
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