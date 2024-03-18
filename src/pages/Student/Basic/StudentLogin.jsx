import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginAsStudent } from "../../../services/Student";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../../store/UserActions";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Slider from "../../../components/Slider.jsx";
import TextSlider from "../../../components/TextSlider";
import { FaBolt, FaGraduationCap, FaSchool, FaTools } from "react-icons/fa";

const StudentLogin = () => {
  const [status, setStatus] = useState("STUDENT"); //custom_login_role_selected, custom_login_role
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="row " style={{ margin: "0px", height: "100%" }}>
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
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
            <div>
              <img className="logo-login" src="/logo.png" width={"200px"} />
            </div>
            {/* <h1
              className={"display-4 text-center"}
              style={{ fontWeight: "bold" }}
            >
              Sign In
            </h1>
             */}

            <div className="p-5">
              <div
                className="shadow-lg p-5 "
                style={{ borderRadius: "20px", width: "50vh" }}
              >
                <div className="d-flex justify-content-between mb-3">
                  <Button
                    leftIcon={
                      <FaGraduationCap
                        className={`${
                          status === "STUDENT"
                            ? "custom_login_role_selected_logo"
                            : "custom_login_role_logo"
                        }`}
                      />
                    }
                    className={`customRadius py-4 ${
                      status === "STUDENT"
                        ? "custom_login_role_selected"
                        : "custom_login_role"
                    }`}
                    onClick={() => {
                      setStatus("STUDENT");
                    }}
                  >
                    Student
                  </Button>
                  <Button
                    leftIcon={
                      <FaTools
                        className={`${
                          status === "ADMIN"
                            ? "custom_login_role_selected_logo"
                            : "custom_login_role_logo"
                        }`}
                        color="white"
                      />
                    }
                    className={`customRadius py-4 ${
                      status === "ADMIN"
                        ? "custom_login_role_selected"
                        : "custom_login_role"
                    }`}
                    onClick={() => {
                      setStatus("ADMIN");
                    }}
                  >
                    Admin
                  </Button>
                </div>
                <Input
                  value={email}
                  className="form-control my-1 mb-3 customRadius py-4"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                ></Input>
                <Input
                  type={"password"}
                  placeholder="Password"
                  value={password}
                  className="form-control my-1 mt-2 customRadius py-4"
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>

                <div className="text-center">
                  <Button
                    colorScheme="telegram"
                    className="mt-3  w-50 customRadius customButton"
                    onClick={async () => {
                      const result = await LoginAsStudent(email, password);
                      if (result?.success) {
                        const { verified, _id, name, email } =
                          result?.data?.user;

                        if (!verified) {
                          MySwal.fire(
                            "Login Failed",
                            "Please Verify Your Account First",
                            "question"
                          );
                        } else {
                          MySwal.fire(
                            "Successfully Logged In as Student ",
                            "",
                            "success"
                          );
                          dispatch(LoginUser(_id, email, name, "STUDENT"));

                          navigate("/student/dashboard");
                        }
                      } else {
                        MySwal.fire({
                          icon: "error",
                          title: "Login Failed",
                          text: `${result?.data?.message}`,
                        });
                      }
                    }}
                  >
                    Sign In
                  </Button>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link to={"/Admin/Login"}> Admin</Link>
                  <Link to={"/student/signUp"}> Create New Account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-8 d-none d-sm-none  d-lg-block d-xl-block"
          style={{ margin: "0px", height: "100vh", backgroundColor: "#1f2421" }}
        >
          <TextSlider />
        </div>
      </div>
    </div>
  );
};
export default StudentLogin;
