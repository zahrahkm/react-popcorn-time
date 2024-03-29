import {Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Nav} from "react-bootstrap";
import {Fragment, useContext, useEffect, useState} from "react";
import {LockFill, UnlockFill} from "react-bootstrap-icons";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import NavbarDropdownComponent from "../navbar-dropdown/navbar-dropdown-component";
// import PopcornTime from "../../popcorntime.svg"
import SearchBox from "../search-box/search-box-component";
import './navbar-component-style.css'
import {UserContext} from "../../contexts/user-context/user-context";
import {signOutUser} from "../../utils/firebase/firebase-utils";
import {MoviesContext} from "../../contexts/movies-context/movies-context";

const NavbarComponent = () => {
    const dropDownMenuTitleGenre = 'Genre';
    const dropDownMenuTitleSortBy = 'Sort by';
    const [genreVal, setGenreVal] = useState("")
    const [sortVal, setSortVal] = useState("")
    const [searchField, setSearchField] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const {setSelectedGenre} = useContext(MoviesContext)
    const {setSelectedSort} = useContext(MoviesContext)

    const sortBy = [
        'Trending',
        'Released',
        'Updated',
        'Year',
        'Name',
        'Rating'
    ]

    const genres = [
        'All',
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Crime',
        'Disaster',
        'Documentary',
        'Drama',
        'Eastern',
        'Family',
        'Fan-Film',
        'Fantasy',
        'Film-Noir',
        'History',
        'Holiday',
        'Horror',
        'Indie',
        'Music',
        'Mystery',
        'None',
        'Road',
        'Romance',
        'Science-Fiction',
        'Short',
        'Sports',
        'Sporting-Event',
        'Suspense',
        'Thriller',
        'Tv-Movie',
        'War',
        'Western'
    ]
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const {genreTitle, sortTitle} = useParams()

    useEffect(() => {
        if (genreTitle === undefined) {
            setGenreVal(genres[0])
            setSelectedGenre(genres[0])
        } else {
            setGenreVal(genreTitle)
            setSelectedGenre(genreTitle)
        }
    }, [genreVal])

    useEffect(() => {
        if (sortTitle === undefined) {
            setSortVal(sortBy[0])
            setSelectedSort(sortBy[0])

        } else {
            setSortVal(sortTitle)
            setSelectedSort(sortTitle)
        }
    }, [sortVal])

    const handleGenreChange = (event) => {
        const genre = event.target.text
        setGenreVal(genre)
        setSortVal(sortBy[0])
        navigate(`/genre/${genre}`)
    }

    const handleSortChange = (event) => {
        const sort = event.target.text
        setSortVal(sort)
        setGenreVal(genres[0])
        navigate(`/sort/${sort}`)
    }


    const handleInputChange = (event) => {
        const searchString = event.target.value;
        console.log(searchString)
        setSearchField(searchString)
        event.preventDefault();
    }
    const handleSearchText = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            navigate(`/search?${searchField}`)
            console.log('Start search...');
        }

    }
    const handleClose = () => {
        setIsOpen(false);
        setSearchField('')
        if (searchField !== '') {
            navigate('/')
        }
    }

    return (
        <Fragment>
            <Navbar className="navbar navbar-dark">
                <Navbar.Brand href="/" className="navbar-brand">
                    {/*<img*/}
                    {/*    className="popcorn-image"*/}
                    {/*    src={PopcornTime}*/}
                    {/*    alt="Popcorn Time logo"*/}
                    {/*/>*/}
                    <span>Popcorn Time</span>
                </Navbar.Brand>
                <Container fluid className="nav-shadow">
                    <Nav className="me-auto">
                        <Nav.Link index className='nav-title navbar-item-active navbar-item-style style' href="/"
                                  active>Movies</Nav.Link>
                        <Nav.Link className='nav-title navbar-item-style style navbar-item-active '
                                  href="/favorites">Favorites</Nav.Link>
                        <NavbarDropdownComponent dropDownMenuTitle={dropDownMenuTitleGenre} selectTitle={genreVal}
                                                 dropdownItems={genres} handleChanges={handleGenreChange}/>
                        <NavbarDropdownComponent dropDownMenuTitle={dropDownMenuTitleSortBy} selectTitle={sortVal}
                                                 dropdownItems={sortBy} handleChanges={handleSortChange}/>
                    </Nav>
                    <div>
                        <SearchBox handleClose={handleClose} handleInputChange={handleInputChange}
                                   handleSearchText={handleSearchText} searchField={searchField} isOpen={isOpen}
                                   setIsOpen={setIsOpen}/>
                    </div>
                    {currentUser ? (
                        <Nav.Link href="/sign-out" onClick={signOutUser}>
                            <LockFill size={16}></LockFill>
                        </Nav.Link>
                    ) : (
                        <Nav.Link href="/sign-in">
                            <UnlockFill size={16}></UnlockFill>
                        </Nav.Link>
                    )}

                </Container>
            </Navbar>
            <Outlet/>
        </Fragment>
    )
}


export default NavbarComponent;