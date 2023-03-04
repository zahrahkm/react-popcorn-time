import './component/navbar/navbar-component-style.css'
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/navbar/navbar-component";
import SingleMoviePage from "./pages/single-movie-page/single-movie-page-component";
import MoviesPage from "./pages/movies-page/movies-page-component";
import {useEffect} from "react";

const App = () => {
    useEffect(() => {
        document.title = 'Popcorn-Time'
    }, [document.title])
    return (
        <Routes>

            <Route path='/' element={<NavbarComponent/>}>
                <Route index element={<MoviesPage/>}/>
                <Route path='genre/:genreTitle' element={<MoviesPage/>}/>
                <Route path='sort/:sortTitle' element={<MoviesPage/>}/>
                <Route path="movies/:imdb_id" element={<SingleMoviePage/>}/>
            </Route>


        </Routes>
    )
}
export default App;