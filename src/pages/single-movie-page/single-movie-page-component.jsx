import {Fragment, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";
import './single-movie-page-style.css'
import MovieStar from "../../component/movie-star/movie-star-component";


const SingleMoviePage = () => {
    const [movie, setMovie] = useState([])
    const [background, setBackground] = useState('grey');
    const [ratingPercentage, setRatingPercentage] = useState(1);
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

    return (
        <Fragment>
            <div style={{backgroundImage: `linear-gradient(rgb(0 0 0 / 88%), rgb(0 0 0 / 70%)),url(${background})`}}
                 className='movie-page-background-image'/>
            <Container className='movie-page-background-text'>
                <Row style={{flexWrap: "nowrap"}} style={{marginTop: '20px'}} className='single-movie-style'>
                    <Col lg={3}>
                        <Card bg={'Dark'.toLowerCase()}>
                            <Card.Img src={movie?.images?.banner}/>
                        </Card>
                    </Col>
                    <Col lg={9}>
                        <Card className='movie-page-details'><
                            Card.Title className='movie-page-title'>{movie.title}</Card.Title>
                            <Card.Body className="movie-page-body">
                                <Card.Text className='movie-page-body-items'>{movie.year}</Card.Text>
                                <span className='movie-page-items-space'>.</span>
                                <Card.Text>{movie.runtime} min</Card.Text>
                                <span style={{margin: '0 15px'}}>.</span>

                                {movie?.genres?.map((genre, index, arr) => {
                                    return <Card.Text
                                        key={index}>{genre}{index < arr.length - 1 ? ' / ' : ''}</Card.Text>

                                })}

                                <span className='movie-page-items-space'>.</span>
                                <Card.Text>{movie.certification}</Card.Text>
                                <span className='movie-page-items-space'>.</span>
                                <MovieStar rating={ratingPercentage} size={16}></MovieStar>
                            </Card.Body>
                            <Card.Text className='movie-explanation'>{movie.synopsis}</Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default SingleMoviePage;