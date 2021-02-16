import React from 'react';
import {Card, Button} from 'react-bootstrap';


const Announcements = () => {
    return ( 
 <Card>
    <Card.Header as="h2">Announcements</Card.Header>
    <Card.Body>
    <Card.Title>Parking lot cleaning</Card.Title>
    <Card.Text>
        The parking lot will be cleaned on the 20th of March. All residents are advised to park on the side of the road 
    </Card.Text>
    </Card.Body>
    <Card.Body>
    <Card.Title>Parking lot cleaning</Card.Title>
    <Card.Text>
        The parking lot will be cleaned on the 20th of March. All residents are advised to park on the side of the road 
    </Card.Text>
    </Card.Body>
    <Button variant="primary">Go somewhere</Button>
</Card>
     );
}
 
export default Announcements ;