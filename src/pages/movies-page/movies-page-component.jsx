import NavbarComponent from "../../component/navbar/navbar-component";
import MoviesDataLoading from "../../component/movies-data-loading/movies-data-loading-component";
import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import * as querystring from "querystring";
import * as queryString from "querystring";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const [render, setRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [noMovies, setNoMovies] = useState(true)
    const [otherPageMovies, setOtherPageMovies] = useState([])
    const {genreTitle, sortTitle} = useParams()
    const searchString = useLocation().search
    const searchQuery = searchString.substring(1)

    useEffect(() => {
        async function getFirstPageMovies() {
            setLoading(true)
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/1?sort=${sortTitle ? `${sortTitle.toLocaleLowerCase()}` : "trending"}&order=-1&genre=${genreTitle ? `${genreTitle.toLocaleLowerCase()}` : "all"}&keywords=${searchQuery}`);
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
    }, [genreTitle, sortTitle, searchQuery]);

    useEffect(() => {
        const getOtherPageMovies = async () => {
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/${page}?sort=${sortTitle ? `${sortTitle.toLocaleLowerCase()}` : "trending"}&order=-1&genre=${genreTitle ? `${genreTitle.toLocaleLowerCase()}` : "all"}&keywords=${searchQuery}`)
            const otherData = await response.json()
            setOtherPageMovies(otherData)
        }
        getOtherPageMovies()
    }, [page, genreTitle, sortTitle, searchQuery])

    const fetchMovies = async () => {
        console.log('fetch')
        setMovies(movies.concat(otherPageMovies))
        setPage(page + 1)
    }


    return (
        <div>
            <MoviesDataLoading render={render} movies={movies} hasMore={hasMore} loading={loading} noMovies={noMovies}
                               fetchMovies={fetchMovies}/>} />
        </div>

    )



}
export default MoviesPage;