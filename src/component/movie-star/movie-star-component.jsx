import {Component} from "react";
import {Star, StarFill} from "react-bootstrap-icons";


class MovieStar extends Component {
    render() {
        const {rating, size} = this.props;
        const filledStars = [...Array(Math.round(rating * 5 / 100))]
        const emptyStars = [...Array(5 - Math.round(rating * 5 / 100))]
        return (
            <div>
                {filledStars.map((val, i) =>
                    <StarFill style={{color: '#ffbf00'}} size={size} key={i}/>
                )}
                {emptyStars.map((val, i) =>
                    <Star style={{color: '#ffbf00'}} size={size} key={i}/>
                )}
            </div>
        )
    }

}

export default MovieStar;