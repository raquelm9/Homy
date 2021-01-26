import React from "react";
import image1 from "../../assets/concierge-1.jpg";
import image2 from "../../assets/concierge-2.jpg";

function HomeCarousel() {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner carousel-size">
          <div className="carousel-item active">
            <img src={image1} className="d-block w-80" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={image2} className="d-block w-80" alt="..." />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </>
  );
}

export default HomeCarousel;
