import {Fragment, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Accordion, Card} from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './single-movie-page-style.css'
import MovieStar from "../../component/movie-star/movie-star-component";
import {PeopleFill} from "react-bootstrap-icons";
import CustomToggle from "../../component/custom-toggle/custom-toggle-component";
import Button from 'react-bootstrap/Button';
import {downloadTorrent} from "../../utils/webTorrent/webTorrent";

const SingleMoviePage = () => {
    const [movie, setMovie] = useState([])
    const [background, setBackground] = useState('grey');
    const [ratingPercentage, setRatingPercentage] = useState(1);
    const downloadBadges = ['720p', '1080p', '2106']
    let {imdb_id} = useParams();
    useEffect(() => {
        fetch(`https://shy-meadow-371f.vsg24.workers.dev/?https://popcorn-time.ga/movie/${imdb_id}`)
            .then(response => response.json())
            .then(movie => {
                setMovie(movie);
                setBackground(movie?.images?.fanart)
                setRatingPercentage(movie?.rating?.percentage)
            })

            .catch(err => {
                console.log(err);
            })
    }, [])
    useEffect(() => {
        document.title = movie?.title
    },)


    // const getMovieFromTorrent=(movie)=>{
    //     downloadTorrent(movie)
    // }


    return (
        <Fragment>
            <div style={{backgroundImage: `linear-gradient(rgb(0 0 0 / 88%), rgb(0 0 0 / 70%)),url(${background})`}}
                 className='movie-page-background-image'/>
            <Container className='movie-page-background-text'>
                <Row style={{flexWrap: "nowrap", marginTop: '20px'}} className='single-movie-style'>
                    <Col lg={3}>
                        <Card bg={'Dark'.toLowerCase()}>
                            <Card.Img src={movie?.images?.banner}/>
                        </Card>
                    </Col>
                    <Col lg={9}>
                        <Card className='movie-page-details'>
                            <Accordion flush defaultActiveKey={''}>
                                <Card.Title className='movie-page-title'>{movie.title}</Card.Title>
                                <Card.Body className="movie-page-body">
                                    <Card.Text className='movie-page-body-items'>{movie.year}</Card.Text>
                                    <span className='movie-page-items-space'>.</span>
                                    <Card.Text>{movie.runtime} min</Card.Text>
                                    <span style={{margin: '0 15px'}}>.</span>

                                    {movie?.genres?.map((genre, index, arr) => {
                                        return (
                                            <Card.Text
                                                key={index}>{genre}{index < arr.length - 1 ? ' / ' : ''}</Card.Text>
                                        )
                                    })}

                                    <span className='movie-page-items-space'>.</span>
                                    <Card.Text>{movie.certification}</Card.Text>
                                    <span className='movie-page-items-space'>.</span>

                                    <OverlayTrigger
                                        key={movie.certification}
                                        placement='top'
                                        overlay={
                                            <Tooltip id={`tooltip-'${movie.title}'`}>
                                                Show cast
                                            </Tooltip>
                                        }
                                    >
                                        <i>
                                            <CustomToggle eventKey={movie._id}><PeopleFill style={{color: '#fff'}}
                                                                                           size={16}/></CustomToggle>
                                        </i>
                                    </OverlayTrigger>
                                    <span className='movie-page-items-space'>.</span>
                                    <OverlayTrigger
                                        key={movie.imdb_id}
                                        placement='right'
                                        overlay={
                                            <Tooltip id={`tooltip-'${movie.title}'`}>
                                                {ratingPercentage / 10}/10
                                            </Tooltip>
                                        }
                                    >
                                        <i>
                                            <MovieStar rating={ratingPercentage} size={16}></MovieStar>
                                        </i>
                                    </OverlayTrigger>


                                </Card.Body>
                                <Accordion.Collapse eventKey={movie._id}>
                                    <Card.Body>
                                        Sorry the API does not have this part :)
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Card.Text className='movie-explanation'>{movie.synopsis}</Card.Text>
                            </Accordion>
                            <Card.Body className="movie-page-body bottom-items">
                                {downloadBadges.map((download) => {
                                    return <Button
                                        onClick={() => downloadTorrent(`${movie.torrents.en[download].url}`)}>Download</Button>
                                })}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default SingleMoviePage;