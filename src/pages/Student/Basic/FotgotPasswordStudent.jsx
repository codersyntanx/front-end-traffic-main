import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginAsAdmin,
  LoginAsStudent,
  changePasswordUsingData,
  checkPinCode,
  resetPasswordLinkUsingEmail,
} from "../../../services/Student";
import ReactCodeInput from "react-code-input";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../../store/UserActions";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Slider from "../../../components/Slider.jsx";
import TextSlider from "../../../components/TextSlider";
import { FaBolt, FaGraduationCap, FaSchool, FaTools } from "react-icons/fa";

const ForgotPasswordStudent = () => {
  const [status, setStatus] = useState("INIT"); // INIT, ENRTY, CHANGE
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const [confirmPassword, setConfrimPassword] = useState("");
  const [password, setPassword] = useState("");

  const checkCode = async () => {
    if (number.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Code is Missing",
        text: "Please Enter the Code from Email",
      });
      return;
    }
    const result = await checkPinCode(email, number);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Forgot Password",
        text: "Please Change the password",
      });
      setStatus("CHANGE");
      // navigate("/student/Login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Forgot Password Error",
        text: `${result?.data?.message}`,
      });
    }
  };

  const changePassword = async () => {
    if (password == "") {
      Swal.fire({
        icon: "error",
        title: "Password is Missing",
        text: "Please Enter the Password",
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Not Matched",
        text: "Please enter the same password",
      });
      return;
    }

    const result = await changePasswordUsingData(email, number, password);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Forgot Password",
        text: "Password has been changed",
      });
      navigate("/student/Login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Forgot Password Error",
        text: `${result?.data?.message}`,
      });
    }
  };

  const forgotPassword = async () => {
    if (email == "") {
      Swal.fire({
        icon: "error",
        title: "Email is Missing",
        text: "Please Enter the Email",
      });
      return;
    }
    const result = await resetPasswordLinkUsingEmail(email);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Forgot Password",
        text: "You must have received an Email, Please Check Your inbox or Spam folder and Enter code here",
      });
      setStatus("ENTRY");
      // navigate("/student/Login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Forgot Password Error",
        text: `${result?.data?.message}`,
      });
    }
  };

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
            {status === "INIT" && (
              <div className="p-5">
                <div
                  className="shadow-lg p-5 "
                  style={{ borderRadius: "20px", width: "50vh" }}
                >
                  <Input
                    name="email"
                    type={"email"}
                    value={email}
                    className="form-control my-2 customRadius py-4"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />

                  <div className="text-center my-3 ">
                    <Button
                      colorScheme="telegram"
                      className="mt-3  w-50 customRadius customButton"
                      onClick={forgotPassword}
                    >
                      Send Pin Code
                    </Button>
                  </div>

                  <hr />

                  <div className="text-center my-3 ">
                    <Button
                      colorScheme="telegram"
                      className="mt-3  w-70 customRadius customButton"
                      onClick={() => {
                        if (email == "") {
                          Swal.fire({
                            icon: "error",
                            title: "Email is Missing",
                            text: "Please Enter the Email",
                          });
                          return;
                        }
                        setStatus("ENTRY");
                      }}
                    >
                      Already Have pin Code
                    </Button>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <Link to={"/student/signUp"}> Sign Up</Link>
                    <Link to={"/student/Login"}>Sign In</Link>
                  </div>
                </div>
              </div>
            )}
            {status === "ENTRY" && (
              <div className="p-5">
                <div
                  className="shadow-lg p-5 px-3 "
                  style={{ borderRadius: "20px", width: "50vh" }}
                >
                  <h1 className="display-6 text-center my-4">Code</h1>

                  <div className="text-center">
                    <Input
                      name="email"
                      type={"email"}
                      className="form-control my-2 customRadius py-4"
                      placeholder="Pin Code"
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                    />
                  </div>

                  <div className="text-center my-3 ">
                    <Button
                      colorScheme="telegram"
                      className="mt-3  w-50 customRadius customButton"
                      onClick={checkCode}
                    >
                      Check Code
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {status === "CHANGE" && (
              <div className="p-5">
                <div
                  className="shadow-lg p-5 "
                  style={{ borderRadius: "20px", width: "50vh" }}
                >
                  <Input
                    name="password"
                    type={"password"}
                    placeholder="Password"
                    value={password}
                    className="form-control my-2 customRadius py-4"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    name="confirmPassword"
                    type={"password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    className="form-control my-2 customRadius py-4"
                    onChange={(e) => setConfrimPassword(e.target.value)}
                  />
                  <div className="text-center my-3 ">
                    <Button
                      colorScheme="telegram"
                      className="mt-3  w-50 customRadius customButton"
                      onClick={changePassword}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
export default ForgotPasswordStudent;
