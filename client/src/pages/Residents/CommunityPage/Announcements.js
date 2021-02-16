import React from 'react';
import {Card, Button, Image} from 'react-bootstrap';
import './Annoucements.css'


const Announcements = ({username, image, title, announcement}) => {
    return ( 
 <Card>
    <Card.Header as="h2">Announcements</Card.Header>

    <Card.Body>
    <Image className="announcement__image" src={image} fluid />
    <Card.Title>{title}</Card.Title>
    <Card.Text>
        {announcement} 
    </Card.Text>
    </Card.Body>
    {/* <Button variant="dark">Got it</Button> */}
</Card>
     );
}
 
export default Announcements ;