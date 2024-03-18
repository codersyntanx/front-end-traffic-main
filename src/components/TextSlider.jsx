import { Carousel } from "react-bootstrap";

const TextSlider = () => (
  <div className="relative h-screen">
    <div className="hidden lg:block md:block absolute opacity-[0.4] w-full">
      <img
        style={{ width: "100%", height: "100vh" }}
        src="/bg_1.jpg"
        alt=""
        srcSet=""
      />
    </div>

    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
      <div>
        <Carousel
          fade
          style={{
            height: "60vh",
            marginTop: "200px",
          }}
        >
          <Carousel.Item>
            <div className="item-car">
              <h1 className="customHeading  ">
                <div className="welcome">Welcome to</div>
                <div className="heading">United CDL Software</div>
              </h1>
              <p className="paragraph">
                United Truck Driving School Management Software is designed to
                simplify a CDL School managing routines for both students and
                managers; Developed by United CDL Training School.
              </p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="item-car">
              <h1 className="customHeading  ">
                <div className="welcome">Welcome to</div>
                <div className="heading">United CDL Software</div>
              </h1>
              <p className="paragraph">
                If you are a student, then you can fill out all the necessary
                applications and sign them, learn online, check your knowledge
                with tests, record your visiting hours and hours behind the
                wheel, track your progress, schedule appointments, and more.
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="item-car">
              <h1 className="customHeading  ">
                <div className="welcome">Welcome to</div>
                <div className="heading">United CDL Software</div>
              </h1>
              <p className="paragraph">
                If you are a manager, then you can manage your students online,
                track their attendance and progress, schedule and manage
                appointments; provide driving scorings with the Instructors
                Portal.
              </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  </div>
);
export default TextSlider;
