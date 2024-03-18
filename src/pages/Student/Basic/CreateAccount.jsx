import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAsStudent } from "../../../services/Student";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Input, Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import TextSlider from "../../../components/TextSlider";

const CreateAccount = () => {
  const [loading, setLoading] = useState(false);
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
      Swal.fire({
        icon: "error",
        title: "Data is Missing",
        text: "Please Enter the Data",
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password does not match",
        text: "Please Enter Same Password",
      });

      return;
    }
    setLoading(true);
    const result = await RegisterAsStudent(email, password, userName);
    if (result.success) {
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have sent as Email, Please Check Your inbox or Spam and verify Your Account",
      });
      navigate("/student/Login");
    } else {
      setLoading(false);

      Swal.fire({
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
                <Input
                  value={userName}
                  className="form-control my-2 customRadius py-4"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Full Name"
                />
                <Input
                  type={"email"}
                  value={email}
                  className="form-control my-2 customRadius py-4"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <Input
                  type={"password"}
                  placeholder="Password"
                  value={password}
                  className="form-control my-2 customRadius py-4"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
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
                    onClick={registerStudent}
                  >
                    Register
                  </Button>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link to={"/student/forgotPassword"}> Forgot Password</Link>
                  <Link to={"/student/Login"}>Sign In</Link>
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
          style={{ margin: "0px", height: "100vh", backgroundColor: "#1f2421" }}
        >
          <TextSlider />
        </div>
      </div>
    </div>
  );
};
export default CreateAccount;
