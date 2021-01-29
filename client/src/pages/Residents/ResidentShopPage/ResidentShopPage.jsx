import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ResidentShopPage.css';
import { Link } from 'react-router-dom';
import HttpService from '../../../services/http-service';



const ResidentShopPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        new HttpService().getProducts()
            .then(data => setProducts(data))
    }, [])

    const getProducts = () => {
        return products.map((product) => {
            return (
                <Card style={{ width: '18rem' }} key={product._id} className="shopping-card">
                    <Card.Img variant="top" src={`http://localhost:3008/${product.imagePath}`} />
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            {product.price} CAD
                </Card.Text>
                        <Button variant="primary" style={{backgroundColor:"white",}}  className="shop-button btn btn-outline-warning">
                            <Link style={{textDecoration:"none", color:"grey"}} to={{
                                pathname: "/checkout",
                                state: { product: product }
                            }} >Buy</Link>
                        </Button>
                    </Card.Body>
                </Card>
            )
        });
    }

    return (

        <div className="shopping-container">
            {products ? getProducts() : null}
        </div>


    );
}

export default ResidentShopPage;