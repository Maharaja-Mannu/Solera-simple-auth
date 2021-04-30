import React from 'react'
import Container from 'react-bootstrap/Container'

export default function NoMatch() {
    return (
        <Container className="text-center pt-4">
            <h3>404 - Page Not Found</h3>
            <p>The page is missing.</p>
        </Container>
    )   
}