import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="d-flex justify-content-around">
          <div
            className="d-flex  flex-column"
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <h1 className="text-center">About Us</h1>
            <h6 className="px-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              eum officia vel in necessitatibus sit perferendis ea cum nostrum
              dolor, amet id explicabo pariatur perspiciatis nisi tenetur
              molestiae eaque consectetur.
            </h6>
          </div>
          <div
            className="d-flex  flex-column"
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
              width: "100%",
            }}
          >
            {/* <input className="form-control my-2" placeholder="First Name" />

            <input className="form-control my-2" placeholder="Last Name" />
            <input className="form-control my-2" placeholder="Email" />

            <textarea
              style={{ resize: "none", height: "20vh" }}
              className="form-control"
              placeholder="How we Can Help you?"
            ></textarea>
            <div className="row">
              <button className="btn btn-primary mt-3">Contact</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
