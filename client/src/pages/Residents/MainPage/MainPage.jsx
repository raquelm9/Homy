import React from "react";
import { Container, Button} from "react-bootstrap";
import { LoginPageImage } from "../../../components/LoginPageImage.js";
import { useHistory } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  const history = useHistory();

  const goToServiceRequest = () => history.push("/resident-request");

  return (
    <>
      <Container fluid>
        <LoginPageImage/>
        <div className="LoginPageBottom">
          <Button
                className="buttonGetStarted"
                variant="dark"
                onClick={goToServiceRequest}>
                Get Started
          </Button>
        </div>
      </Container>
    </>
  );
}

export default MainPage;
