import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  blockStudent,
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
import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

const ShowStudents = () => {
  const [update, setUpdate] = useState(0);
  const user = useSelector((state) => state?.user);
  useEffect(() => {
    async function fetchAllStudents() {
      const data = await getStudents();

      if (data.success) {
        // setAdmins[data.teachers];
        setStudentList([...data.students]);
      }
    }
    fetchAllStudents();
  }, [update]);

  const [studentsList, setStudentList] = useState([]);
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="display-6 text-center">All Trainees</div>
        <div className="container d-flex flex-wrap">
          {studentsList.map((studentItem) => (
            <div
              key={studentItem?._id}
              className=" mx-3 my-3 shadow-lg"
              style={{
                borderRadius: "20px",
                backgroundColor:
                  studentItem?.active === true ? "#0E4749" : "#8F0005",
              }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="p-3">
                  <img
                    width={"40px"}
                    height={"40px"}
                    style={{ borderRadius: "20px" }}
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${studentItem?.name}`}
                  ></img>
                </div>

                <div
                  className="fw-bolder"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  <div>{studentItem?.name}</div>
                </div>
                <div
                  className="fw-lighter"
                  style={{ color: "white", fontSize: "16px" }}
                >
                  <div>{studentItem?.email}</div>
                </div>
                <div className="d-flex justify-content-around flex-wrap w-100 my-3 mx-5">
                  <Button
                    onClick={() =>
                      navigate(
                        `/superAdmin/changePasswordStudent/${studentItem?._id}`
                      )
                    }
                    rightIcon={<FaExpeditedssl size={25} color="white" />}
                    colorScheme="blue"
                  >
                    Password
                  </Button>
                  {studentItem?.blocked === true ? (
                    <Button
                      onClick={async () => {
                        const result = await unBlockStudent(
                          studentItem?._id,
                          user?.id
                        );
                        if (result?.success) {
                          Swal.fire("UnBlocked Student", "", "success");
                          setUpdate(update + 1);
                        } else {
                          {
                            Swal.fire(
                              "Error in UnBlocking Student",
                              "",
                              "question"
                            );
                          }
                        }
                      }}
                      rightIcon={<FaBan size={25} color="white" />}
                      colorScheme="green"
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      onClick={async () => {
                        const result = await blockStudent(
                          studentItem?._id,
                          user?.id
                        );
                        if (result?.success) {
                          Swal.fire("Blocked Student", "", "success");
                          setUpdate(update + 1);
                        } else {
                          {
                            Swal.fire(
                              "Error in Blocking Trainee",
                              "",
                              "question"
                            );
                          }
                        }
                      }}
                      rightIcon={<FaBan size={25} color="white" />}
                      colorScheme="red"
                    >
                      Ban
                    </Button>
                  )}
                  {studentItem?.active === true ? (
                    <Button
                      onClick={async () => {
                        const result = await makeStudentInActive(
                          studentItem?._id,
                          user?.id
                        );
                        if (result?.success) {
                          Swal.fire("InActivated Trainee", "", "success");
                          setUpdate(update + 1);
                        } else {
                          {
                            Swal.fire(
                              "Error in InActivation Trainee",
                              "",
                              "question"
                            );
                          }
                        }
                      }}
                      rightIcon={<FaCheck size={25} color="white" />}
                      colorScheme="blue"
                    >
                      InActivate
                    </Button>
                  ) : (
                    <Button
                      onClick={async () => {
                        const result = await makeStudentActive(
                          studentItem?._id,
                          user?.id
                        );
                        if (result?.success) {
                          Swal.fire("Activated Trainee", "", "success");
                          setUpdate(update + 1);
                        } else {
                          {
                            Swal.fire(
                              "Error in Activated Trainee",
                              "",
                              "question"
                            );
                          }
                        }
                      }}
                      rightIcon={<FaCheck size={25} color="white" />}
                      colorScheme="blue"
                    >
                      Activate
                    </Button>
                  )}

                  <Button
                    onClick={() =>
                      navigate(`/superAdmin/student/${studentItem?._id}`)
                    }
                    rightIcon={<FaInfo size={25} color="white" />}
                    colorScheme="blue"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ShowStudents;
