import React from "react";

const Slider = () => {
  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div
            className="carousel-item active mt-5 py-5"
            style={{ height: "100%" }}
          >
            <div
              className={"d-flex"}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <img
                src={"/logo.png"}
                style={{ width: "30%" }}
                className=""
                alt="..."
              />
            </div>

            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item  mt-5 py-5" style={{ height: "100%" }}>
            <div
              className={"d-flex"}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <img
                src={"/logo.png"}
                style={{ width: "30%" }}
                className=""
                alt="..."
              />
            </div>

            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item  mt-5 py-5" style={{ height: "100%" }}>
            <div
              className={"d-flex"}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <img
                src={"/logo.png"}
                style={{ width: "30%" }}
                className=""
                alt="..."
              />
            </div>

            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
