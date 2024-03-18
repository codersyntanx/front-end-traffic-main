import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginAsAdmin } from "../../services/Student";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { LoginUser } from "../../store/UserActions";
import { useDispatch } from "react-redux";
import { Button, Input } from "@chakra-ui/react";
import CustomSlider from "../../components/CustomSlider";

const AdminLogin = () => {
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
      <div className="row  " style={{ margin: "0px", height: "100%" }}>
        <div className="col-sm-12 col-xs-12 col-md-8  custom-bg">
          <CustomSlider />
        </div>

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
              Login
            </h1>

            <div className="p-5">
              <div
                className="shadow-lg p-5 "
                style={{ borderRadius: "20px", width: "50vh" }}
              >
                <Input
                  name="email"
                  value={email}
                  className="form-control my-1 mb-3"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <Input
                  name="password"
                  type={"password"}
                  placeholder="Password"
                  value={password}
                  className="form-control my-1 mt-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-center">
                  <Button
                    colorScheme={"blue"}
                    className="mt-3 btn btn-primary w-50"
                    onClick={async () => {
                      const result = await LoginAsAdmin(email, password);
                      if (result.success == true) {
                        result.data.user.super;
                        const { _id, name, email } = result.data.user;

                        if (result.data.user.super) {
                          MySwal.fire(
                            "Successfully Logged In as Super Admin",
                            "",
                            "success"
                          );

                          dispatch(LoginUser(_id, email, name, "SUPER_ADMIN"));

                          navigate("/superAdmin/dashboard");
                        } else {
                          MySwal.fire(
                            "Successfully Logged In as Admin",
                            "",
                            "success"
                          );
                          dispatch(LoginUser(_id, email, name, "ADMIN"));
                          navigate("/admin/dashboard");
                        }
                      } else {
                        MySwal.fire(
                          "Login Failed",
                          "Please enter correct email and password",
                          "question"
                        );
                      }
                    }}
                  >
                    Login
                  </Button>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link to={"/student/SignUp"}>Register as Student</Link>
                  <Link to={"/student/Login"}>Sign In as Student</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
