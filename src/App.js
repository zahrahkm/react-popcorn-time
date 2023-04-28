import './component/navbar/navbar-component-style.css'
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/navbar/navbar-component";
import SingleMoviePage from "./pages/single-movie-page/single-movie-page-component";
import {useEffect} from "react";
import SignUpPageComponent from "./pages/sign-up-page/sign-up-page-component";
import SignInPageComponent from "./pages/sign-in-page/sign-in-page-component";
import FavoriteMoviesPageComponent from "./pages/favorite-movies-page/favorite-movies-page-component";
import MoviesPage from "./pages/movies-page/movies-page";

const App = () => {
    useEffect(() => {
        document.title = 'Popcorn-Time'
    }, [document.title])
    return (
        <Routes>
            <Route path='/' element={<NavbarComponent/>}>
                <Route index element={<MoviesPage/>}/>
                <Route path='/search?' element={<MoviesPage/>}/>
                <Route path='/:search' element={<MoviesPage/>}/>
                <Route path='genre/:genreTitle' element={<MoviesPage/>}/>
                <Route path='sort/:sortTitle' element={<MoviesPage/>}/>
                <Route path="movies/:imdb_id" element={<SingleMoviePage/>}/>
                <Route path="favorites" element={<FavoriteMoviesPageComponent/>}/>
                <Route path="sign-in" element={<SignInPageComponent/>}/>
                <Route path="sign-up" element={<SignUpPageComponent/>}/>
            </Route>
        </Routes>
    )
}
export default App;