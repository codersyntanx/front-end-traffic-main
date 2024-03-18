import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  blockStudent,
  getStudentById,
  makeStudentActive,
  makeStudentComplete,
  makeStudentInActive,
  makeStudentInComplete,
  unBlockStudent,
} from "../../services/Student";
import {
  FaDatabase,
  FaDochub,
  FaFile,
  FaFileInvoice,
  FaHandshake,
  FaPage4,
  FaRegPaperPlane,
  FaUserCircle,
} from "react-icons/fa";
import { FaExpeditedssl } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import { Button } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";

const SuperShowStudentDocs = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [studentItem, setStudentData] = useState();
  useEffect(() => {
    async function fetchStudentById(studentId) {
      const data = await getStudentById(studentId);
      if (data.success) {
        setStudentData(data.user);
      }
    }
    fetchStudentById(studentId);
  }, []);

  return (
    <div style={{}}>
      <div className="container showStudents">
        <div className="text-center display-6">Student Data </div>
        <div
          key={studentItem?._id}
          className=" mx-3 my-3 shadow-lg"
          style={{
            borderRadius: "20px",
            backgroundColor:
              studentItem?.active === true
                ? "rgb(0,255,0,0.2)"
                : "rgb(255,0,0,0.2)",
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
            <div className="fw-bolder" style={{ fontSize: "20px" }}>
              <div>{studentItem?.name}</div>
            </div>
            <div className="fw-lighter" style={{ fontSize: "16px" }}>
              <div>{studentItem?.email}</div>
            </div>
            <div className="row">
              <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                <div className="text-center">
                  <Button
                    onClick={() => navigate("/student/editProfile")}
                    rightIcon={<FaExpeditedssl size={25} color="white" />}
                    colorScheme="blue"
                  >
                    Password
                  </Button>
                </div>
              </div>
              <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                <div className="text-center">
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
                </div>
              </div>
              <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                <div className="text-center">
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
                </div>
              </div>
              <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                <div className="text-center">
                  {studentItem?.active === true ? (
                    <Button
                      onClick={async () => {
                        const result = await makeStudentInComplete(
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
                      InComplete
                    </Button>
                  ) : (
                    <Button
                      onClick={async () => {
                        const result = await makeStudentComplete(
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
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                <div className="text-center">
                  <Button
                    disabled
                    onClick={() => {
                      navigate(`/superAdmin/student/docs/${studentItem._id}`);
                    }}
                    rightIcon={<FaFile size={25} color="white" />}
                    colorScheme="blue"
                  >
                    Documents
                  </Button>
                </div>
              </div>

              <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                <div className="text-center">
                  <Button
                    onClick={() => {
                      navigate(
                        `/superAdmin/student/dataCollection/${studentItem._id}`
                      );
                    }}
                    rightIcon={<FaDatabase size={25} color="white" />}
                    colorScheme="blue"
                  >
                    Data Collection
                  </Button>
                </div>
              </div>
              <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                <div className="text-center">
                  <Button
                    onClick={() => {
                      navigate(
                        `/superAdmin/student/enrollmentApplication/${studentItem._id}`
                      );
                    }}
                    rightIcon={<FaFileInvoice size={25} color="white" />}
                    colorScheme="blue"
                  >
                    Applicaiton
                  </Button>
                </div>
              </div>
              <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                <div className="text-center">
                  <Button
                    onClick={() => {
                      navigate(
                        `/superAdmin/student/enrollAgreement/${studentItem._id}`
                      );
                    }}
                    rightIcon={<FaHandshake size={25} color="white" />}
                    colorScheme="blue"
                  >
                    Agreement
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-around py-5">
          {studentItem?.docs?.length === 0 && (
            <div className="display-6 text-center">
              {" "}
              User Has Not Uploaded Docs Yet
            </div>
          )}
          {studentItem?.docs?.map((file, index) => (
            <div
              key={index}
              className="card text-center my-2"
              style={{ width: "200px" }}
            >
              <div className="card-body" style={{ fontSize: "50px" }}>
                📃
              </div>
              <div className="card-footer">{file.fileName}</div>
              <Button
                onClick={() => window.open(file?.url, "_blank")}
                colorScheme={"blue"}
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SuperShowStudentDocs;
