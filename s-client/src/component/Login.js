import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import { Formik } from 'formik'
import {useHistory} from 'react-router-dom'
import { Input } from './customInput'
import {login } from '../api'
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actionTypes'
import {loginValidationSchema} from './validationSchema'

export default function Login({state, dispatch}) {
    const [err, setErr] = React.useState(null)
    let history = useHistory()
    const handleLogin = async (values) => {
        setErr(null)
        try {
            const result = await login(values)
            dispatch({ type: LOGIN_SUCCESS, payload: result })
            localStorage.setItem('token', result.token)
            localStorage.setItem('user', result.user.name)
            history.push('/')
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE})
            setErr(error.message)
        }
    }

    return(
        <Container className="pt-4">
            <div className="m-auto" style={{maxWidth: "360px"}}>
                {err && 
                <Alert variant="danger">
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{err}</p>
                </Alert>
                }

                <h2>Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleSubmit, isSubmitting }) => (

                        <Form noValidate onSubmit={handleSubmit}>
                            <Input 
                                label="Email address"
                                name="username"
                                type="email"
                                placeholder="Enter email"
                                autoComplete="username"
                                helpText="We'll never share your email with anyone else."
                            />
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                autoComplete="current-password"
                            />
                            
                            {/* <CheckInput type="checkbox" label="Check me out" name="remember" /> */}
                    
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Loading...' : 'Submit'}
                            </Button>

                        </Form>
                    )}
                </Formik>
            </div>
            
        </Container>
    )
}