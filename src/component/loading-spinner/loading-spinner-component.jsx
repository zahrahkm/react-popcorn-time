import {BounceLoader} from "react-spinners";
import './loading-spinner-style.css'


const LoadingSpinner = ({loading}) => {
    return (
        <BounceLoader
            color='#0d6efd'
            loading={loading}
            size={100}
            className='loadingStyle'
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={1}
        />
    )
}
export default LoadingSpinner;