import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Container";
import Col from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import mainImage from "../../../assets/main1.jpg";
import { Jumbotron } from "../../../components/Jumbotron";
import { useHistory } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  const history = useHistory();

  const goToServiceRequest = () => history.push("/resident-request");

  return (
    <>
      <Container className="container" fluid xs={12} xl={6}>
        <Jumbotron className="jumbotron"></Jumbotron>
        <Row className="text-center buttonRow">
          <Col xl={12}>
            <Button
              className="buttonGetStarted"
              variant="dark"
              onClick={goToServiceRequest}
            >
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainPage;
