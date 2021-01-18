import React from 'react'
import {Jumbotron as Jumbo, Container} from 'react-bootstrap'

export const LoginPageImage = () => (
    <Jumbo fluid>
        <div className="overlay">
        </div>
        <Container>
            <div className="mainPageLogo">
                <p className="homyText">homy</p>
                <p className="homyTextIntro">your very personal</p>  
                <p className="homyTextIntro">concierge</p> 
            </div>
        </Container>
    </Jumbo>
    )

export default LoginPageImage
