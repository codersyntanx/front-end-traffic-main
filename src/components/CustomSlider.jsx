import Carousel from "react-bootstrap/Carousel";
function CustomSlider() {
  return (
    <>
      <div className="display-6 text-center" style={{ color: "white" }}>
        Our Trainees
      </div>
      <Carousel fade>
        <Carousel.Item>
          <div
            className={"d-flex"}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <img
              className="d-block "
              src="/slider-1.jpeg"
              alt="First slide"
              style={{ paddingTop: "10px", borderRadius: "20px", width: "40%" }}
            />
          </div>

          <Carousel.Caption>
            <h3 style={{ fontSize: "30px", color: "black" }}>
              First slide label
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className={"d-flex"}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <img
              className="d-block "
              src="/slider-2.jpeg"
              alt="First slide"
              style={{ paddingTop: "10px", borderRadius: "20px", width: "40%" }}
            />
          </div>

          <Carousel.Caption>
            <h3 style={{ fontSize: "30px", color: "black" }}>
              Second slide label
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className={"d-flex"}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <img
              className="d-block "
              src="/slider-3.jpeg"
              alt="First slide"
              style={{ paddingTop: "10px", borderRadius: "20px", width: "40%" }}
            />
          </div>

          <Carousel.Caption>
            <h3 style={{ fontSize: "30px", color: "black" }}>
              Third slide label
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CustomSlider;
