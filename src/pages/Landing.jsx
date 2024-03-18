import assessment_bg from "../assets/assessment-bg.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "../components/Slider.jsx";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import CustomSlider from "../components/CustomSlider";

const Landing = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  if (user != undefined) {
    if (user?.type == "SUPER_ADMIN") {
      navigate("/superAdmin/dashboard");
    } else if (user?.type == "ADMIN") {
      navigate("/Admin/dashboard");
    } else user?.type == "STUDENT";
    {
      navigate("/student/dashboard");
    }
  }

  return (
    <div
      className={""}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="row  " style={{ margin: "0px", height: "100%" }}>
        <div className="col-sm-12 col-xs-12 col-md-4">
          <div
            style={{
              margin: "0px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <div
              className="d-flex flex-column  "
              style={{
                margin: 0,
                marginTop: "20px",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <span className="shadow-lg p-5" style={{ borderRadius: "20px" }}>
                <img src={"/logo.png"} style={{ height: "300px" }} alt="" />
              </span>

              <Button
                colorScheme={"twitter"}
                className="btn btn-primary p-3 my-4 w-75"
                onClick={() => {
                  navigate("/student/Login");
                }}
              >
                Login as Student
              </Button>
              <Button
                colorScheme={"twitter"}
                className="btn btn-primary p-3 my-4 w-75"
                onClick={() => {
                  navigate("/student/SignUp");
                }}
              >
                Register as Student
              </Button>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-xs-12 col-md-8  custom-bg">
          {/* <Slider />
           */}
          <CustomSlider />
        </div>
      </div>
    </div>
  );
};
export default Landing;

<div className="row" style={{ margin: "0px", height: "100%" }}>
  <div className="col-4" style={{ margin: "0px" }}></div>

  <div className="col-8 custom-bg" style={{ margin: 0 }}>
    <Slider />
  </div>
</div>;

/*
    <div
   style={{
     backgroundColor: "lightyellow",
     height: "89vh",
   }}
  >
   <div className="container">
     <div className="display-1 text-center p-5">
       United CDL Training School
     </div>
     <div className="d-flex flex-wrap justify-content-around p-3">
       <div>
         <img
           src={assessment_bg}
           style={{ borderRadius: "50px" }}
           alt="assessment_bg"
         ></img>
       </div>
       <div>
         <div className="container my-5 text-center">
           <div className="text-center">
             <button
               className="my-2 btn btn-lg  btn-primary w-100"
               onClick={() => {
                 navigate("/student/Login");
               }}
             >
               Sign In As Student
             </button>
           </div>
           <div className="text-center">
             <button
               className="my-2 btn btn-lg btn-success w-100"
               onClick={() => {
                 navigate("/Admin/Login");
               }}
             >
               Sign In As Admin
             </button>
           </div>
           <div className="text-center">
             <button
               className="my-2 btn btn-lg btn-primary w-100"
               onClick={() => {
                 navigate("/student/SignUp");
               }}
             >
               Register as Student
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
    */
