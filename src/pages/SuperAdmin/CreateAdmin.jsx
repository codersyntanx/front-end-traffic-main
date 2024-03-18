import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createAdminBasic } from "../../services/Student";
import Navbar from "../../components/Navbar";
import { Bar } from "react-chartjs-2";
import { Input } from "@chakra-ui/react";

const CreateAdmin = () => {
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
    const result = await createAdminBasic(email, password, userName);
    if (result.success) {
      MySwal.fire({
        icon: "success",
        title: "Registration Successfull",
        text: "You have sent as Email, Please Check Your inbox or Spam and verify Your Account",
      });
    } else {
      MySwal.fire({
        icon: "error",
        title: "Registration Error",
        text: `${result?.data?.message}`,
      });
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{}}>
        <div
          className="container container mt-5 p-5 shadow-lg"
          style={{ borderRadius: "20px" }}
        >
          <div className="display-2 text-center p-5">Create Admin </div>
          <div className="">
            <div className="row mb-3">
              <div className="col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xs-12 col-sm-12 ">
                <Input
                  name="userName"
                  value={userName}
                  className="form-control my-2"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Full Name"
                />
                <Input
                  name="email"
                  type={"email"}
                  value={email}
                  className="form-control my-2"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <Input
                  name="password"
                  type={"password"}
                  placeholder="Password"
                  value={password}
                  className="form-control my-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  name="confirmPassword"
                  type={"password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  className="form-control my-2"
                  onChange={(e) => setConfrimPassword(e.target.value)}
                />
                <div className="text-center my-3 ">
                  <div
                    className="btn btn-primary w-50 bg-[rgba(41,41,41,0.89)] "
                    onClick={registerStudent}
                  >
                    Create Admin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAdmin;
