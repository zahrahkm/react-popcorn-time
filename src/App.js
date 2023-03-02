import './component/navbar/navbar-component-style.css'
import {Route, Routes, useParams} from "react-router-dom";
import NavbarComponent from "./component/navbar/navbar-component";
import SingleMoviePage from "./pages/single-movie-page/single-movie-page-component";
import GenreComponent from "./component/genre-component";
import MoviesPage from "./pages/movies-page/movies-page-component";
import {useEffect} from "react";

const App = () => {
    useEffect(() => {
        document.title = 'Popcorn-Time'
    }, [document.title])
    return (
        <Routes>

            <Route path='/' element={<GenreComponent/>}>
                <Route path='genres/:genreTitle' element={<MoviesPage/>}/>
                <Route path='sort/:sortTitle' element={<MoviesPage/>}/>
            </Route>
            <Route path=":imdb_id" element={<SingleMoviePage/>}/>

        </Routes>
    )
}
export default App;