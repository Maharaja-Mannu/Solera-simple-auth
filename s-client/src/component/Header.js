import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {NavLink} from 'react-router-dom'
import { LOGOUT_SUCCESS} from '../actionTypes'
import {logout} from '../api'

function Header({state, dispatch}) {
    const [isLoading, setIsLoading] = React.useState(false)

    // console.log(state)
    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await logout(state.token)
            dispatch({ type: LOGOUT_SUCCESS})
            setIsLoading(false)
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }

    }
    return(
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Solera</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {state.isLoggedIn ? 
                            <>
                                <Nav.Link as={NavLink} to="/">{state.user.name}</Nav.Link>
                                <Button onClick={handleLogout} variant="outline-light" disabled={isLoading}>{isLoading ? 'Loading...': 'Logout'}</Button>
                            </>
                            :
                            <>
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                            </>
                            }
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header