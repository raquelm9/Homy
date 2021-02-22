import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import HttpService from "../../../services/http-service";
import swal from "sweetalert";
import "./CheckoutForm.css";
import { config } from "../../../config/config";
import BackButton from '../../../components/BackButton/BackButton';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#5ba1f7",
      color: "#a9b4f2",
      fontWeight: 700,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "22px",
      fontSmoothing: "antialiased",
      backgroundColor: "#d9dddc",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "black",
    },
  },
};

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="">
    <label htmlFor={id} className="">
      {label}
    </label>
    <input
      className=""
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);
const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useLocation();
  const userId = useSelector((state) => state.userReducer.user._id);
  const userName = useSelector((state) => state.userReducer.user.name);
  const userEmail = useSelector((state) => state.userReducer.user.email);
  const history = useHistory();
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    if (userEmail && userName && !billingDetails.email.lenght) {
      setBillingDetails({ email: userEmail, name: userName });
    }
  }, [userEmail, userName, billingDetails.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });
    if (error) {
      swal({
        title: "Error",
        text: error.message,
        button: "Dismiss",
      });
    } else {
      console.log("PaymentMethod", paymentMethod);
      new HttpService()
        .postPaymentMethod(paymentMethod.id, state.product._id, userId)
        .then((data) => handleMessageModal(data));
    }
  };

  const handleMessageModal = (msg) => {
    if (msg.success) {
      swal({
        title: "Thanks",
        text: "Your payment has been processed",
        icon: "success",
        button: "Dismiss",
      }).then(() => {
        history.push("/resident-request");
      });
    } else {
      swal({
        title: "Oops",
        text: msg.error || "An error happened while processing your payment",
        icon: "error",
        button: "Dismiss",
      });
    }
  };

  const getImagePath = (path = "") => {
    if (path.includes("http")) {
      return path;
    }

    return `${config.SERVER_URL}/${path}`;
  };

  return (
    <>
      {state ? (
        <div className="container-fluid">
          <BackButton />
          <div className="row">
            <div className="col"></div>
            <div className="col-12">
              <img
                className="img-fluid image-adjustment"
                alt="product"
                src={getImagePath(state.product.imagePath)}
              />
            </div>
            <div className="col"></div>
          </div>

          <div className="row">
            <div className="col-12 center-title">
              <h4>{state.product.title}</h4>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col"></div>
              <div className="col-md-6 col-sm-12">
                <fieldset className="center-items">
                  <div className="form-group row input-margin">
                    <Field
                      label="Name:"
                      id="name"
                      type="text"
                      placeholder=""
                      required
                      autoComplete="name"
                      value={billingDetails.name}
                      onChange={(e) => {
                        setBillingDetails({
                          ...billingDetails,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="form-group row input-margin">
                    <Field
                      label="Email: "
                      id="email"
                      type="text"
                      placeholder=""
                      required
                      autoComplete="email"
                      value={billingDetails.email}
                      onChange={(e) => {
                        setBillingDetails({
                          ...billingDetails,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 col-sm-12 center-card">
                      <CardElement options={CARD_OPTIONS} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 button-center">
                      <button
                        className="btn btn-lg btn-outline-secondary"
                        type="submit"
                        disabled={!stripe}
                      >
                        Pay {state.product.price}$
                      </button>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="col"></div>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

//4000001240000000 canada card number
//4000000000009995 insuficient funds
//4242424242424242
export default CheckoutForm;
