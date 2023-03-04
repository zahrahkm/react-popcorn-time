import {Component} from "react";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import './movie-card-style.css'
import MovieStar from "../movie-star/movie-star-component";
import {EyeFill, HeartFill} from "react-bootstrap-icons";
import RatingNumber from "../rating-number/rating-number-component";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const MovieCard = ({movie}) => {
    const {title, year, images, rating, imdb_id} = movie
    const poster = images?.poster
    const percentage = rating?.percentage

    return (
        <Col lg={2} md={3}>
            <Link to={imdb_id} to={{pathname: `/movies/${imdb_id}`, state: {movie}}}>
                <Card className='card-style'>
                    <div className='image-container'>
                        <Card.Img src={poster} className='image'/>
                        <div className='top-overlay'>
                            <div className='right'>
                                <HeartFill className='heart-fill-icon' color='#b4afaf' size={20}/>
                            </div>
                            <div className='left'>
                                <EyeFill className='eye-fill-icon' color='#b4afaf' size={20}/>
                            </div>
                        </div>
                        <div className='bottom-overlay'>
                            <RatingNumber rating={percentage}/>
                            <MovieStar className='left' rating={percentage} size={16}/>
                        </div>
                    </div>

                    <Card.Body className='card-body-style'>
                        <Card.Title className='card-title-style'>{title}</Card.Title>
                        <Card.Text className='card-text-style'>{year}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}
export default MovieCard;