import {Component, Fragment} from "react";
import {Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './navbar-component-style.css'
import PopcornTime from "../../popcorntime.svg"
import {Nav} from "react-bootstrap";
import SearchBox from "../search-box/search-box-component";
import MoviesList from "../movies-list/movies-list-component";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../loading-spinner/loading-spinner-component";
import NavDropdownComponent from "../nav-dropdown/nav-dropdown-component";
import {Outlet, Route, Routes} from "react-router-dom";
import SingleMoviePage from "../../pages/single-movie-page/single-movie-page-component";
import MoviesPage from "../../pages/movies-page/movies-page-component";

const NavbarComponent = (props) => {
    const {genres, genreVal, dropDownMenuTitleGenre, dropDownMenuTitleSortBy, sortBy, sortVal} = props;
    const {handleSearchChange, handleSelectedMenu, handleSortBy} = props;
    return (
        <Fragment>
            <Navbar className="navbar navbar-dark">
                <Navbar.Brand href="#home" className="navbar-brand">
                    <img
                        className="popcorn-image"
                        src={PopcornTime}
                        alt="Popcorn Time logo"
                    />
                    <span>Popcorn Time</span>
                </Navbar.Brand>
                <Container fluid className="nav-shadow">
                    <Nav className="me-auto">
                        <Nav.Link index className='nav-title style' href="/">Movies</Nav.Link>
                        <Nav.Link className='nav-title style' href="/favorites">Favorites</Nav.Link>
                        <NavDropdownComponent titles={genres} fixTitle={dropDownMenuTitleGenre} firstItem={genreVal}
                                              genreVal={genreVal}
                                              handleChanges={handleSelectedMenu}/>
                        <NavDropdownComponent titles={sortBy} fixTitle={dropDownMenuTitleSortBy} firstItem={sortVal}
                                              handleChanges={handleSortBy}/>
                    </Nav>
                    <SearchBox placeholder={'search'} handleChange={handleSearchChange}/>
                </Container>
            </Navbar>
            <Outlet/>
        </Fragment>
    )
}


export default NavbarComponent;