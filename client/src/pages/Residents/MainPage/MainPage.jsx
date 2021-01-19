import React from "react";
import { Container, Button } from "react-bootstrap";
import { LoginPageImage } from "../../../components/LoginPageImage.js";
import { useHistory } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  const history = useHistory();

  const goToServiceRequest = () => {
    history.push("/resident-request");
  };

  return (
    <>
      <Container fluid className="p-0 mainPage">
        <div className="overlay" />
        <LoginPageImage />
        <div className="button-adjustment">
          <div className="col-sm-12">
            <Button
              className="buttonGetStarted"
              variant="dark"
              onClick={goToServiceRequest}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default MainPage;
