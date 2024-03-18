import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  blockStudent,
  changePasswordByAdmin,
  fetchBasicDataByEmail,
  fetchBasicDataById,
  getStudents,
  makeStudentActive,
  makeStudentInActive,
  unBlockStudent,
} from "../../services/Student";
import { FaUserCircle } from "react-icons/fa";
import { FaExpeditedssl } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Button, Input } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

const SuperChangeStudentPassword = () => {
  const { studentEmail } = useParams();
  const [fetchedData, setFetchBasicData] = useState();
  useEffect(() => {
    async function fetchBasicData() {
      const data = await fetchBasicDataById(studentEmail);
      setFetchBasicData(data?.user);
    }
    fetchBasicData();
  }, []);

  const user = useSelector((state) => state?.user);

  useEffect(() => {}, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  return (
    <div>
      <div className="container">
        <div className="display-6 my-3 text-center">
          Change Student Password
        </div>
        <div
          className="d-flex"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="my-5">
            <div
              className="shadow-lg p-5 "
              style={{
                borderRadius: "20px",
                width: "50vh",
              }}
            >
              <div className="p-3 m-2 d-flex justify-content-center">
                <img
                  width={"40px"}
                  height={"40px"}
                  style={{ borderRadius: "20px" }}
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${fetchedData?.name}`}
                ></img>
              </div>
              <div className="text-center mb-4">{fetchedData?.email}</div>

              <Input
                value={password}
                className="form-control my-1 mb-3"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
              <Input
                type={"password"}
                placeholder="confirm  Password"
                value={confirmPassword}
                className="form-control my-1 mt-2"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="text-center">
                <Button
                  colorScheme={"blue"}
                  className="mt-3 btn btn-primary w-50"
                  onClick={async () => {
                    const result = await changePasswordByAdmin({
                      studentId: studentEmail,
                      password: password,
                      adminId: user?.id,
                    });
                    if (result.success == true) {
                      Swal.fire("Password Change Successfully", "", "success");
                    } else {
                      Swal.fire("Password Change Failed", "", "error");
                    }
                  }}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuperChangeStudentPassword;
