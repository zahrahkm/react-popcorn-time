import {useAccordionButton} from "react-bootstrap";

const CustomToggle = ({children, eventKey}) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <button
            type="button"
            style={{backgroundColor: 'transparent'}}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    )
}
export default CustomToggle