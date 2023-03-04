import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarDropdownComponent = ({dropDownMenuTitle, selectTitle, dropdownItems, handleChanges}) => {
    return (
        <NavDropdown
            title={
                <span>
                    <span className='nav-title'>{dropDownMenuTitle}</span>
                    <span
                        className='active-title'>{selectTitle}</span>
                </span>
            }

            id="basic-nav-dropdown"
            menuVariant="dark">
            {dropdownItems?.map((item, index) => {

                return (
                    <NavDropdown.Item key={index} eventKey={index} onClick={handleChanges}>
                        {item}
                    </NavDropdown.Item>
                )
            })
            }
        </NavDropdown>
    )
}

export default NavbarDropdownComponent;