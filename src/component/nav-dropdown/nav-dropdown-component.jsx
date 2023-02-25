import NavDropdown from "react-bootstrap/NavDropdown";
import './nav-dropdown-style.css'

const NavDropdownComponent = (props) => {

    const {titles, fixTitle, handleChanges, firstItem} = props;
    return (
        <NavDropdown
            title={
                <span>
                        <span className='nav-title'>{fixTitle}</span>
                        <span className='active-title'>{firstItem}</span>
                   </span>
            }
            id="basic-nav-dropdown"
            menuVariant="dark">
            {titles.map((title, index) => {
                return (
                    <NavDropdown.Item key={index} eventKey={index} onClick={handleChanges}>
                        {title}
                    </NavDropdown.Item>
                )
            })}
        </NavDropdown>
    )


}
export default NavDropdownComponent