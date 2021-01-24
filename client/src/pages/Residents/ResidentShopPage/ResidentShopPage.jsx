
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ResidentShopPage.css';
import { Link } from 'react-router-dom';


const ResidentShopPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3008/api/shop/products')
            .then(resp => resp.json())
            .then(data => setProducts(data))

    }, [])

    const getProducts = () => {
        return products.map((product) => {
            return (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`http://localhost:3008/${product.imagePath}`} />
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            {product.price} CAD
                </Card.Text>
                        <Button variant="primary" className="shop-button">
                            <Link to={{
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

        <div>
            {products ? getProducts() : null}
        </div>


    );
}

export default ResidentShopPage;