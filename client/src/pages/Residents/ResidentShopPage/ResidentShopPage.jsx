
import React from 'react';
import { Card , Button} from 'react-bootstrap';
import {products} from './Products';
import './ResidentShopPage.css';
import {Link} from 'react-router-dom';


const ResidentShopPage = () => {

    const getProducts = () => {
       return products.map((product) => {
            return(
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.imagePath} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                     {product.price} CAD
                </Card.Text>
                <Button variant="primary" className="shop-button"><Link to="/checkout">Buy</Link></Button>
            </Card.Body>
        </Card>

            )
            

        });
    }
    return ( 

        <div>
            {products ? getProducts() : null}
        </div>
        
    
     );
}
 
export default ResidentShopPage;