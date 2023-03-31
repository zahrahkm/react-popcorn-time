import './component/navbar/navbar-component-style.css'
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/navbar/navbar-component";
import SingleMoviePage from "./pages/single-movie-page/single-movie-page-component";
import {useEffect} from "react";
import SignUpPageComponent from "./pages/sign-up-page/sign-up-page-component";
import SignInPageComponent from "./pages/sign-in-page/sign-in-page-component";
import LoadingMovies from "./component/loading-movies/loading-movies-component";
const App = () => {

    useEffect(() => {
        document.title = 'Popcorn-Time'
    }, [document.title])
    return (
        <Routes>
            <Route path='/' element={<NavbarComponent/>}>
                <Route index element={<LoadingMovies/>}/>
                <Route path='/search?' element={<LoadingMovies/>}/>
                <Route path='/:search' element={<LoadingMovies/>}/>
                <Route path='genre/:genreTitle' element={<LoadingMovies/>}/>
                <Route path='sort/:sortTitle' element={<LoadingMovies/>}/>
                <Route path="movies/:imdb_id" element={<SingleMoviePage/>}/>
                <Route path="sign-in" element={<SignInPageComponent/>}/>
                <Route path="sign-up" element={<SignUpPageComponent/>}/>
            </Route>
        </Routes>
    )
}
export default App;