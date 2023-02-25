import {Component, useEffect, useState} from "react";
import './component/navbar/navbar-component-style.css'
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/navbar/navbar-component";
import MoviesPage from "./pages/movies-page/movies-page-component";
import SingleMoviePage from "./pages/single-movie-page/single-movie-page-component";
import GenreMoviePage from "./pages/single-movie-page/single-movie-page-component";
import MoviesList from "./component/movies-list/movies-list-component";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [genreVal, setGenreVal] = useState("All")
    const [sortVal, setSortVal] = useState("Trending")
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const [render, setRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [noMovies, setNoMovies] = useState(true)
    const [otherMovies, setOtherMovies] = useState('ali')


    console.log('render')
    useEffect(() => {
        console.log('useEffect fired')

        async function getFirstPageMovies(genreVal, sortVal) {
            setLoading(true)
            const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/1?sort=${sortVal.toLocaleLowerCase()}&order=-1&genre=${genreVal.toLocaleLowerCase()}`);
            const data = await response.json()
            setLoading(false)
            if (movies.length === 0) {
                setNoMovies(false)
            }
            setMovies(data)
        }

        getFirstPageMovies(genreVal, sortVal)
    }, []);


    const getOtherPageMovies = async () => {
        console.log('getOtherPageMovies')
        const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/${page}?sort=${sortVal.toLocaleLowerCase()}&order=-1&genre=${genreVal.toLocaleLowerCase()}`);
        const otherMoviesData = response.json()
        return otherMoviesData
    }

    const fetchMovies = async () => {
        console.log('fetch')
        const dataFromServer = await getOtherPageMovies();
        setMovies([...movies, ...dataFromServer])
        setPage(page + 1)

        if (dataFromServer === 0 || dataFromServer.length < 50) {
            setHasMore(false)
        }
    }

    const handelChanges = () => {
        console.log('handeled')
        setOtherMovies('zahra')
    }

    return (

        <div>
            <MoviesPage movies={movies} fetchMovies={fetchMovies} render={render} hasMore={hasMore} loading={loading}
                        noMovies={noMovies}/>
            <button onClick={handelChanges}>{otherMovies}</button>
        </div>

        // <Routes>
        //     <Route element={<NavbarComponent handleSearchChange={handleSearchChange} handleSelectedMenu={handleSelectedMenu} handleSortBy={handleSortBy}  genres={genres} genreVal={genreVal} dropDownMenuTitleGenre={dropDownMenuTitleGenre} dropDownMenuTitleSortBy={dropDownMenuTitleSortBy} sortBy={sortBy} sortVal={sortVal}/>} >
        //         <Route path="/movies" element={<MoviesPage render={render} movies={movies} filteredMovies={filteredByGenre} hasMore={hasMore} loading={loading} noMovies={noMovies} fetchMovies={fetchMovies}/>} />
        //         <Route path="/movies/:imdb_id" element={<SingleMoviePage/>} />
        //     </Route>
        // </Routes>
    )
}
// class App extends Component{
//     constructor(props) {
//         super(props);
//         this.state={
//             movies: [],
//             searchField:'',
//             genres:[
//                 'All',
//                 'Action',
//                 'Adventure',
//                 'Animation',
//                 'Comedy',
//                 'Crime',
//                 'Disaster',
//                 'Documentary',
//                 'Drama',
//                 'Eastern',
//                 'Family',
//                 'Fan-Film',
//                 'Fantasy',
//                 'Film-Noir',
//                 'History',
//                 'Holiday',
//                 'Horror',
//                 'Indie',
//                 'Music',
//                 'Mystery',
//                 'None',
//                 'Road',
//                 'Romance',
//                 'Science-Fiction',
//                 'Short',
//                 'Sports',
//                 'Sporting-Event',
//                 'Suspense',
//                 'Thriller',
//                 'Tv-Movie',
//                 'War',
//                 'Western'
//             ],
//             genreVal:'All',
//             page:2,
//             hasMore:true,
//             render:true,
//             loading:false,
//             noMovies:true,
//             dropDownMenuTitleGenre: "Genre" ,
//             dropDownMenuTitleSortBy: "Sort by",
//             sortBy:[
//                 'Trending',
//                 'Released',
//                 'Updated',
//                 'Year',
//                 'Name',
//                 'Rating'
//             ],
//             sortVal:'Trending'
//
//         }
//     }
//
//     componentDidMount() {
//         console.log('componentDidMount')
//         this.getFirstPageMovies(this.state.genreVal,this.state.sortVal);
//     }
//
//     getFirstPageMovies=async (genreVal,sortVal)=>{
//         this.setState({loading:true})
//         const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/1?sort=${sortVal.toLocaleLowerCase()}&order=-1&genre=${genreVal.toLocaleLowerCase()}`);
//         const movies = await response.json()
//         if(movies.length===0){
//             this.setState({noMovies:false})
//         }
//         this.setState({loading:false})
//         this.setState(()=> {
//             return {movies}
//         })
//     }
//
//     getOtherPageMovies=async ()=>{
//         const response = await fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movies/${this.state.page}?sort=${this.state.sortVal.toLocaleLowerCase()}&order=-1&genre=${this.state.genreVal.toLocaleLowerCase()}`);
//         return await response.json();
//
//     }
//
//     fetchMovies= async ()=>{
//         console.log('fetch')
//         const dataFromServer= await this.getOtherPageMovies();
//         this.setState({movies:[...this.state.movies,...dataFromServer]})
//         this.setState(()=>{
//             return {page: this.state.page + 1}
//         },()=>{console.log(this.state.page)})
//
//         if(dataFromServer===0||dataFromServer.length<50){
//             this.setState({hasMore:false})
//         }
//     }
//
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         console.log('componentDidUpdate')
//
//         // if(this.state.render === false){
//         //     this.getFirstPageMovies(this.state.genreVal,this.state.sortVal);
//         //     return this.setState({render:true})
//         // }
//         // if(this.state.noMovies===false && this.state.movies.length !== 0){
//         //     return this.setState({noMovies:true})
//         // }
//     }
//
//
//     handleSearchChange=(event)=>{
//         const searchField=event.target.value.toLocaleLowerCase()
//         this.setState(()=>{
//             return {searchField}
//         },()=>{console.log(this.state.searchField)})
//     }
//
//     handleSelectedMenu=(event)=> {
//         const genreVal = event.target.text;
//         this.setState(() => {
//             return {genreVal}
//         }, () => {
//             console.log(this.state.genreVal)
//         })
//         if (genreVal !== this.state.genreVal&& this.state.page>2) {
//             this.setState({page:2})
//         }
//             //     if (this.state.page > 2) {
//         // if (genreVal !== this.state.genreVal) {
//         //     if (this.state.page > 2) {
//         //         this.setState({page: 2})
//         //         return this.setState({render: false})
//         //     }
//         //     this.setState(() => {
//         //         return {loading: true}
//         //     })
//             return this.getFirstPageMovies(genreVal, this.state.sortVal);
//         }
//
//
//     handleSortBy=(event)=>{
//         const sortVal=event.target.text
//         this.setState(()=>{
//             return {sortVal}
//         },()=>{console.log(this.state.sortVal)
//         });
//         if(sortVal !== this.state.sortVal&& this.state.page > 2){
//             this.setState({page:2})
//         }
//         //     if(this.state.page > 2){
//         //         this.setState({page:2})
//         //         return this.setState({render:false})
//         //     }
//         //     this.setState(()=>{
//         //         return {loading: true}
//         //     })
//         return this.getFirstPageMovies(this.state.genreVal,sortVal);
//
//     }
//
//     render() {
//         const {genres,genreVal,dropDownMenuTitleGenre,dropDownMenuTitleSortBy,sortBy,sortVal}=this.state;
//         const {handleSearchChange,handleSelectedMenu,handleSortBy}=this;
//         const {render,movies,hasMore,loading,noMovies}=this.state
//         const {fetchMovies}=this;
//         const filteredMovies=this.state.movies.filter((movie)=>{
//             return movie.title.toLocaleLowerCase().includes(this.state.searchField)
//         })
//
//         const filteredByGenre = this.state.movies.filter((movie) => {
//            return movie.genres.includes(genreVal.toLocaleLowerCase())
//         })
// console.log(filteredByGenre)
//         return(
//             <Routes>
//                 <Route element={<NavbarComponent handleSearchChange={handleSearchChange} handleSelectedMenu={handleSelectedMenu} handleSortBy={handleSortBy}  genres={genres} genreVal={genreVal} dropDownMenuTitleGenre={dropDownMenuTitleGenre} dropDownMenuTitleSortBy={dropDownMenuTitleSortBy} sortBy={sortBy} sortVal={sortVal}/>} >
//                     <Route path="/movies" element={<MoviesPage render={render} movies={movies} filteredMovies={filteredByGenre} hasMore={hasMore} loading={loading} noMovies={noMovies} fetchMovies={fetchMovies}/>} />
//                     <Route path="/movies/:imdb_id" element={<SingleMoviePage/>} />
//                 </Route>
//             </Routes>
//         )
//     }
// }
export default App;