import {Fragment, useContext, useState} from "react";
import Container from "react-bootstrap/Container";
import {Button, Card, Form, FormControl} from "react-bootstrap";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {Google, PersonAdd} from "react-bootstrap-icons";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase-utils";
import '../sign-in-page/sign-in-style.css'
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../contexts/user-context/user-context";
import {FavoriteMoviesContext} from "../../contexts/favorite-movies-context/favorite-movies-context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpPageComponent = () => {
    const [inputField, setInputField] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = inputField;
    const handleInputChanges = (event) => {
        const {name, value} = event.target;
        console.log(name, value)
        setInputField({...inputField, [name]: value})
    }
    const {favoriteMovies} = useContext(FavoriteMoviesContext)
    const clearFormFields = () => {
        setInputField(defaultFormFields);
    }
    const handleSignUpForm = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!')
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName})
            clearFormFields()

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('User already exist!')
            }
            if (error.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters')
            }
            console.log('An error has been occurred in user creation.', error)
        }
    }
    const navigate = useNavigate()
    return (
        <Fragment>
            <Container className='auth-container'>
                <Card className='auth-card pt-3' bg={'Dark'.toLowerCase()}>
                    <Card.Title className='auth-card-title-style'><i>Sign up</i> </Card.Title>
                    <Form.Text className="text-muted">
                        Please fill out this form.
                    </Form.Text>
                    <Card.Body>
                        <Form validated onSubmit={handleSignUpForm}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="text" className='input-style' placeholder="Enter Name"
                                              name='displayName' value={displayName} onChange={handleInputChanges}/>
                            </Form.Group>


                            <Form.Group controlId="formBasicEmail2">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" className='input-style' placeholder="Enter email"
                                              name='email' value={email} onChange={handleInputChanges}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" className='input-style' placeholder="Password"
                                              name='password' value={password} onChange={handleInputChanges}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" className='input-style' placeholder="confirm password"
                                              name='confirmPassword' value={confirmPassword}
                                              onChange={handleInputChanges}/>
                            </Form.Group>

                            <Button variant="primary" type="submit" className='my-4'>
                                <PersonAdd/><i>Create Account</i>
                            </Button>

                        </Form>
                        <span>
                            <i className='button-style'>Already have an account?</i>
                            <button className='button-style-text' onClick={() => {
                                navigate('/sign-in')
                            }}> sign in</button>
                        </span>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    )
}
export default SignUpPageComponent