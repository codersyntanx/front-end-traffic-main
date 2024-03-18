import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginAsStudent, RegisterAsStudent } from "../../../services/Student";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navbar from "../../../components/Navbar.jsx";
import Slider from "../../../components/Slider.jsx";
import { Button, Input } from "@chakra-ui/react";
import { LoginUser } from "../../../store/UserActions.js";
import CustomSlider from "../../../components/CustomSlider";

const StudentRegister = () => {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");

  const [password, setPassword] = useState("");

  const registerStudent = async () => {
    if (
      password == "" ||
      confirmPassword == "" ||
      userName == "" ||
      email == ""
    ) {
      MySwal.fire({
        icon: "error",
        title: "Data is Missing",
        text: "Please Enter the Data",
      });
      return;
    }
    if (password !== confirmPassword) {
      MySwal.fire({
        icon: "error",
        title: "Password does not match",
        text: "Please Enter Same Password",
      });

      return;
    }
    const result = await RegisterAsStudent(email, password, userName);
    if (result.success) {
      MySwal.fire({
        icon: "success",
        title: "Registration Successfull",
        text: "You have sent as Email, Please Check Your inbox or Spam and verify Your Account",
      });
      navigate("/student/Login");
    } else {
      MySwal.fire({
        icon: "error",
        title: "Registration Error",
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
      <div className="row  " style={{ margin: "0px", height: "100%" }}>
        <div className="col-sm-12 col-xs-12 col-md-4 ">
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
            <h1
              className={"display-4 text-center"}
              style={{ fontWeight: "bold" }}
            >
              Register
            </h1>

            <div className="p-5">
              <div
                className="shadow-lg p-5 "
                style={{ borderRadius: "20px", width: "50vh" }}
              >
                <Input
                  value={userName}
                  className="form-control my-2"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Full Name"
                />
                <Input
                  type={"email"}
                  value={email}
                  className="form-control my-2"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <Input
                  type={"password"}
                  placeholder="Password"
                  value={password}
                  className="form-control my-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  className="form-control my-2"
                  onChange={(e) => setConfrimPassword(e.target.value)}
                />
                <div className="text-center my-3 ">
                  <button
                    className="btn btn-primary w-50"
                    onClick={registerStudent}
                  >
                    Register
                  </button>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link to={"/Admin/Login"}> Admin</Link>
                  <Link to={"/student/Login"}>
                    Already Have Account? Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-xs-12 col-md-8  custom-bg">
          <CustomSlider />
        </div>
      </div>
    </div>
  );
};
export default StudentRegister;
