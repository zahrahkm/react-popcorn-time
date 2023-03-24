import {Fragment} from "react";
import {CloseButton, FormControl, InputGroup} from "react-bootstrap";
import {Search} from "react-bootstrap-icons";
import './search-box-style.css'


const SearchBox = ({handleInputChange, handleSearchText, handleClose, searchField, isOpen, setIsOpen}) => {


    return (
        <InputGroup className='input-style'>
            <InputGroup.Text id="basic-addon1" className='input-text-style'>
                <Search onClick={() => setIsOpen(!isOpen)} className='search-icon-style'/>
            </InputGroup.Text>
            {isOpen && (
                <Fragment>
                    <FormControl autoFocus id='mySearch' onChange={handleInputChange}
                                 onKeyDown={handleSearchText} placeholder="Search" className='form-style'/>
                    {searchField && (
                        <InputGroup.Text className='input-text-style'>
                            <CloseButton variant='white' onClick={handleClose} className='close-icon-style'/>
                        </InputGroup.Text>
                    )}

                </Fragment>
            )}
        </InputGroup>

    )

}

export default SearchBox;