import {Component} from "react";


class RatingNumber extends Component {
    render() {
        return (
            <div className='right'>{this.props.rating / 10}/10</div>
        )
    }
}

export default RatingNumber;