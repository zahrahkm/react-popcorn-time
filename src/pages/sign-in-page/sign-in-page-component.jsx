import {Fragment, useState} from "react";
import {signInWithGooglePopUp, db, createUserDocumentFromAuth} from "../../utils/firebase/firebase-utils";
import {Button, Card, Form} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './sign-in-style.css'
import {Google, PersonAdd} from "react-bootstrap-icons";
import {collection, addDoc} from "firebase/firestore";


const SignInPageComponent = () => {
    const [email, setEmail] = useState('')
    const handleUsersEmail = (event) => {
        const emailString = event.target.value
        setEmail(emailString)
    }

    const logGoogleUser = async () => {
        const result = await signInWithGooglePopUp()
        await createUserDocumentFromAuth(result.user)
    }

    return (
        <Fragment>
            <div className='sign-in-background'></div>

            <Container className='sign-in-container'>
                <Card className='sign-in-card' bg={'Dark'.toLowerCase()}>
                    <Card.Title className='sign-in-card-title-style'><i>Sign In</i> </Card.Title>
                    <Card.Body>
                        <Form validated>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={handleUsersEmail}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                <PersonAdd/><i>Create Account</i>
                            </Button>
                            <Button variant="warning" onClick={logGoogleUser}>
                                <Google/><i>Sign in with Google Account</i>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    )

}


export default SignInPageComponent;