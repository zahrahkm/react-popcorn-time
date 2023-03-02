import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import MoviesPage from "../pages/movies-page/movies-page-component";
import NavbarComponent from "./navbar/navbar-component";

const GenreComponent = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const [render, setRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [noMovies, setNoMovies] = useState(true)
    const [otherPageMovies, setOtherPageMovies] = useState([])
    const [genreVal, setGenreVal] = useState("All")
    const [sortVal, setSortVal] = useState("Trending")
    const {genreTitle, sortTitle} = useParams()


    useEffect(() => {
        async function getFirstPageMovies(genreVal, sortVal) {
            setLoading(true)
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/1?sort=${sortTitle ? `${sortTitle.toLocaleLowerCase()}` : "trending"}&order=-1&genre=${genreTitle ? `${genreTitle.toLocaleLowerCase()}` : "all"}`);
            const data = await response.json()
            setLoading(false)
            if (noMovies === false && movies.length !== 0) {
                return setNoMovies(true)
            } else {
                setMovies(false)
            }
            setMovies(data)
        }

        getFirstPageMovies(genreTitle, sortTitle)
    }, [genreTitle, sortTitle]);

    useEffect(() => {
        const getOtherPageMovies = async () => {
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/${page}?sort=${sortTitle ? `${sortTitle.toLocaleLowerCase()}` : "trending"}&order=-1&genre=${genreTitle ? `${genreTitle.toLocaleLowerCase()}` : "all"}`)
            const otherData = await response.json()
            setOtherPageMovies(otherData)
        }
        getOtherPageMovies()
    }, [page, genreTitle, sortTitle])
    const fetchMovies = async () => {
        console.log('fetch')
        setMovies(movies.concat(otherPageMovies))
        setPage(page + 1)
    }


    return (
        <MoviesPage movies={movies} fetchMovies={fetchMovies} hasMore={hasMore} render={render} loading={loading}
                    noMovies={noMovies}/>
    )


}

export default GenreComponent;