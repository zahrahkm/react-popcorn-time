import {Fragment, useEffect, useState} from "react";
import {
    signInWithGooglePopUp,
    createUserDocumentFromAuth,
    auth,
    createAuthUserWithEmailAndPassword, signInWithEmail
} from "../../utils/firebase/firebase-utils";
import {Button, Card, Form} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './sign-in-style.css'
import {CardText, Google, PersonAdd} from "react-bootstrap-icons";
import {signInWithEmailAndPassword} from "firebase/auth";
import SignUpPageComponent from "../sign-up-page/sign-up-page-component";
import {useNavigate} from "react-router-dom";

const userDefaultData = {
    email: '',
    password: ''
}

const SignInPageComponent = () => {

    const [userFieldData, setUserFieldData] = useState(userDefaultData)
    const {email, password} = userFieldData;

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopUp()
        await createUserDocumentFromAuth(user)
    }
    const handleSignInUserChanges = (event) => {
        const {name, value} = event.target;
        setUserFieldData({...userFieldData, [name]: value})
    }
    const clearFormFields = () => {
        setUserFieldData(userDefaultData);
    }
    const handleSignInForm = async (event) => {
        event.preventDefault()
        try {
            const response = await signInWithEmail(email, password)
            return clearFormFields()

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email.')
                    break
                case 'auth/user-not-found':
                    alert('No user associated with this email!')
                    break
                default:
                    console.log(error);
                    break
            }
            console.log('An error has been occurred in user sign in.', error)
        }
    }


    const navigate = useNavigate()


    console.log(userFieldData)
    return (
        <Fragment>
            <div className='auth-background'></div>
            <Container className='auth-container'>
                <Card className='auth-card pt-3' bg={'Dark'.toLowerCase()}>
                    <Card.Title className='auth-card-title-style'><i>Sign In</i></Card.Title>
                    <Form.Text>
                        Please sign in to continue.
                    </Form.Text>
                    <Card.Body>
                        <Form validated onSubmit={handleSignInForm}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" className="input-style" placeholder="Enter email"
                                              name='email' value={email} onChange={handleSignInUserChanges}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" className="input-style" placeholder="Password"
                                              name='password' value={password} onChange={handleSignInUserChanges}/>
                            </Form.Group>

                            <div className='form-button-style'>
                                <div>
                                    <Button variant="primary" type='submit' className="mt-4 mb-5 px-4">
                                        <i>Sign In</i>
                                    </Button>
                                </div>
                            </div>
                        </Form>
                        <span>
                            <i className='button-style'>Don't have an account?</i>
                            <button className='button-style-text' onClick={() => {
                                navigate('/sign-up')
                            }}> sign up</button>
                        </span>

                        <div className='hr-box mt-3'>
                            <hr className='hr-style'/>
                            <p className='hr-text'>or</p>
                            <hr className='hr-style'/>
                        </div>

                        <Button type='button' variant="light" onClick={logGoogleUser} className='google-button mb-3'>
                            <Google/><i> Sign in with Google Account</i>
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    )

}


export default SignInPageComponent;