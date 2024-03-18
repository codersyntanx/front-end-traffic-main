import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginAsAdmin, LoginAsStudent } from "../../../services/Student";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../../store/UserActions";
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Slider from "../../../components/Slider.jsx";
import TextSlider from "../../../components/TextSlider";
import { FaBolt, FaGraduationCap, FaSchool, FaTools } from "react-icons/fa";
import { useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
const MainLogin = () => {
  const user = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("STUDENT"); //custom_login_role_selected, custom_login_role
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.type === "STUDENT") {
        navigate("/student/dashboard");
      } else if (user.type === "SUPER_ADMIN") {
        navigate("/superAdmin/dashboard");
      } else if (user.type === "ADMIN") {
        navigate("/Admin/dashboard");
      }
    }
  }, []);

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
                <InputGroup size="md">
                  <Input
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Password"
                    value={password}
                    pr="4.5rem"
                    className="customRadius"
                    onChange={(e) => setPassword(e.target.value)}
                  ></Input>
                  <InputRightElement width="4.5rem">
                    {showPassword ? (
                      <FaEye
                        className="option_hover"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <FaEyeSlash
                        className="option_hover"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}{" "}
                  </InputRightElement>
                </InputGroup>

                <div className="text-center">
                  <Button
                    colorScheme="telegram"
                    className="mt-3  w-50 customRadius customButton"
                    onClick={async () => {
                      if (email == "" || password == "") {
                        Swal.fire(
                          "Empty Credentials",
                          "Please Enter email and password",
                          "error"
                        );
                        return;
                      }
                      setLoading(true);
                      if (status === "STUDENT") {
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
                              "Successfully Logged In as  Student",
                              "",
                              "success"
                            );
                            dispatch(LoginUser(_id, email, name, "STUDENT"));

                            navigate("/student/dashboard");
                          }
                          setLoading(false);
                        } else {
                          setLoading(false);

                          MySwal.fire({
                            icon: "error",
                            title: "Login Failed",
                            text: `${result?.data?.message}`,
                          });
                        }
                      } else {
                        const result = await LoginAsAdmin(email, password);
                        if (result.success == true) {
                          result.data.user.super;
                          const { _id, name, email } = result.data.user;

                          if (result.data.user.super) {
                            setLoading(false);

                            MySwal.fire(
                              "Successfully Logged In as Super Admin",
                              "",
                              "success"
                            );

                            dispatch(
                              LoginUser(_id, email, name, "SUPER_ADMIN")
                            );
                            setLoading(false);

                            navigate("/superAdmin/dashboard");
                          } else {
                            setLoading(false);
                            MySwal.fire(
                              "Successfully Logged In as  Admin",
                              "",
                              "success"
                            );
                            dispatch(LoginUser(_id, email, name, "ADMIN"));
                            navigate("/admin/dashboard");
                          }
                        } else {
                          setLoading(false);

                          MySwal.fire(
                            "Login Failed",
                            "Please enter correct email and password",
                            "question"
                          );
                        }
                      }
                    }}
                  >
                    Sign In
                  </Button>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link to={"/student/forgotPassword"}> Forgot Password</Link>
                  <Link to={"/student/signUp"}> New Account</Link>
                </div>
                {loading && (
                  <div className="text-center">
                    <Spinner width={5} padding={5}></Spinner>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-8 d-none d-sm-none  d-lg-block d-xl-block"
          style={{
            padding: "0px",
            margin: "0px",
            minHeight: "100vh",
            backgroundColor: "#1f2421",
          }}
        >
          <TextSlider />
        </div>
      </div>
    </div>
  );
};
export default MainLogin;
