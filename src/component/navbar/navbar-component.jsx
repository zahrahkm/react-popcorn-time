import {Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Nav} from "react-bootstrap";
import './navbar-component-style.css'
import PopcornTime from "../../popcorntime.svg"
import SearchBox from "../search-box/search-box-component";
import {Outlet, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import MoviesPage from "../../pages/movies-page/movies-page-component";


const NavbarComponent = (props) => {
    const {genreTitle, sortTitle} = useParams()
    const dropDownMenuTitleGenre = 'Genre';
    const dropDownMenuTitleSortBy = 'Sort by';
    const [genreVal, setGenreVal] = useState("All")
    const [sortVal, setSortVal] = useState("Trending")

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
    const handleGenreChange = (event) => {
        const genre = event.target.text
        setGenreVal(genre)
        console.log(genre)
    }
    const handleSortChange = (event) => {
        const sort = event.target.text
        setSortVal(sort)
    }
    return (
        <Fragment>
            <Navbar className="navbar navbar-dark">
                <Navbar.Brand href="/" className="navbar-brand">
                    <img
                        className="popcorn-image"
                        src={PopcornTime}
                        alt="Popcorn Time logo"
                    />
                    <span>Popcorn Time</span>
                </Navbar.Brand>
                <Container fluid className="nav-shadow">
                    <Nav className="me-auto">
                        <Nav.Link index className='nav-title navbar-item-active navbar-item-style style' href="/"
                                  active>Movies</Nav.Link>
                        <Nav.Link className='nav-title navbar-item-style style navbar-item-active'
                                  href="/favorites">Favorites</Nav.Link>
                        <NavDropdown
                            title={
                                <span>
                                    <span className='nav-title'>{dropDownMenuTitleGenre}</span>
                                    <span
                                        className='active-title'>{genreTitle === undefined ? genreVal : genreTitle}</span>
                                </span>
                            }

                            id="basic-nav-dropdown"
                            menuVariant="dark"
                        >
                            {genres.map((title, index) => {

                                return (
                                    <NavDropdown.Item key={index} eventKey={index} href={`/genres/${title}`}
                                                      onClick={handleGenreChange}>
                                        {title}
                                    </NavDropdown.Item>
                                )
                            })
                            }
                        </NavDropdown>
                        <NavDropdown
                            title={
                                <span>
                                    <span className='nav-title'>{dropDownMenuTitleSortBy}</span>
                                    <span
                                        className='active-title'>{sortTitle === undefined ? sortVal : sortTitle}</span>
                                </span>
                            }

                            id="basic-nav-dropdown"
                            menuVariant="dark">
                            {sortBy.map((title, index) => {

                                return (
                                    <NavDropdown.Item key={index} eventKey={index} href={`/sort/${title}`}
                                                      onClick={handleSortChange}>
                                        {title}
                                    </NavDropdown.Item>
                                )
                            })
                            }
                        </NavDropdown>
                    </Nav>
                    <SearchBox placeholder={'search'}/>
                </Container>
            </Navbar>

        </Fragment>
    )
}


export default NavbarComponent;