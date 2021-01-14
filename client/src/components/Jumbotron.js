import React from 'react'
import {Jumbotron as Jumbo, Container, Row} from 'react-bootstrap'
import mainImage from '../assets/main1.jpg';
// import styled from 'styled-components';

// const Styles = styled.div``;

export const Jumbotron = () => (
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


export default Jumbotron
