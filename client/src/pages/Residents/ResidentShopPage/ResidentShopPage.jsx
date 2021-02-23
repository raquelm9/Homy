import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./ResidentShopPage.css";
import { Link } from "react-router-dom";
import HttpService from "../../../services/http-service";
import { config } from "../../../config/config";
import { fetchNotificationDone } from "../../../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../../../components/BackButton/BackButton";

const ResidentShopPage = () => {
  const [products, setProducts] = useState([]);
  const isLoggedIn = useSelector((state) => state.userReducer.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    //look if there's DONE notification
    if (isLoggedIn) dispatch(fetchNotificationDone());
  }, []);

  useEffect(() => {
    new HttpService().getProducts().then((data) => setProducts(data));
  }, []);

  const getImagePath = (path = "") => {
    if (path.includes("http")) {
      return path;
    }

    return `${config.SERVER_URL}/${path}`;
  };

  const getProducts = () => {
    return products.map((product) => {
      return (
        <Card
          style={{ width: "18rem" }}
          key={product._id}
          className="shopping-card"
        >
          <Card.Img variant="top" src={getImagePath(product.imagePath)} />
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {product.title}
            </Card.Title>
            <Card.Text style={{ textAlign: "center" }}>
              {product.price} CAD
            </Card.Text>
            <Button
              variant="warning"
              style={{
                backgroundColor: "white",
                display: "block",
                margin: "auto",
              }}
              className="shop-button "
            >
              <Link
                style={{ textDecoration: "none", color: "#fafafa" }}
                to={{
                  pathname: "/checkout",
                  state: { product: product },
                }}
              >
                Buy
              </Link>
            </Button>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <div className="container-fluid">
      <BackButton />
      <div className="row">
        <div className="col-12">
          <h1 style={TITLE_STYLE} className="resident-request-title">
            SHOP
          </h1>
        </div>
      </div>
      <div className="shopping-container">
        {products ? getProducts() : null}
      </div>
    </div>
  );
};

export default ResidentShopPage;

const TITLE_STYLE = {
  marginTop: "0",
  paddingTop: "0",
};
