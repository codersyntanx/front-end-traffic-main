import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  blockStudent,
  forcedUpdate,
  getAllModulesByStudentId,
  getMyResults,
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
import { Button, Spinner } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
];
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Student Marks Per Modules",
    },
    datalabels: {
      color: "black", // You can customize the color of the labels
      anchor: "end", // Position of the labels on the bars
      align: "end",
      formatter: (value) => value, // Display the actual value on top of the bar
    },
  },
};

const ShowStudentProfile = () => {
  const [modulesData, setModulesData] = useState([
    {
      _id: "63c6ac90c019a4ca5042a841",
      studentName: "haseebabbasi",
      studentId: "63c6ac71c019a4ca5042a83d",
      chapterNo: 1,
      chapterName: "01_Orientation",
      videoPlayed: 100,
      videoCompleted: true,
      attempted: true,
      status: "FAILED",
      __v: 0,
    },
  ]);
  const [myData, setMyData] = useState();
  const data = {
    labels,
    datasets: [
      {
        label: "Student Marks ",
        data: modulesData?.map((item) => {
          return item?.percentage === undefined ? 0 : item?.percentage * 100;
        }),
        backgroundColor: "rgba(10, 255, 132, 0.9)",
      },
    ],
  };

  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [update, setUpdate] = useState(0);
  const { studentId } = useParams();

  const navigate = useNavigate();
  const [studentItem, setStudentData] = useState();
  useEffect(() => {
    setLoading(true);
    async function fetchStudentById(studentId) {
      const data = await getStudentById(studentId);
      if (data.success) {
        setStudentData(data.user);
        setLoading(false);
      } else {
        Swal.fire("Student Not Found");
        navigate(-1);
        return;
      }
    }
    fetchStudentById(studentId);

    async function getAllModulesData() {
      const data = await getAllModulesByStudentId(studentId);
      if (data?.success) {
        setModulesData(data.chapters);
      }
    }
    getAllModulesData();
    async function getMyResult() {
      const data = await getMyResults(studentId);
      if (data?.success) {
        setMyData(data?.studentResults);
      }
    }
    getMyResult();
  }, [update]);

  return (
    <div style={{}}>
      <div className="container">
        <div className="text-center display-6">Student Profile</div>
        {loading === true ? (
          <div className="text-center my-5">
            <Spinner width={20} padding={20}></Spinner>
          </div>
        ) : (
          <div>
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
              <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="text-center my-3">
                    <img
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        // width: "50%",
                        borderRadius: "50px",
                      }}
                      src={`https://api.dicebear.com/5.x/initials/svg?seed=${studentItem?.name}`}
                      width={"100px"}
                      height={"100px"}
                      alt=""
                    />

                    <div className="fw-bolder" style={{ fontSize: "20px" }}>
                      <div>{studentItem?.name}</div>
                    </div>
                    <div className="fw-lighter" style={{ fontSize: "16px" }}>
                      <div>{studentItem?.email}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="text-center my-3">
                    <div className="row p-3">
                      <div
                        className="row"
                        style={{
                          backgroundColor: "lightgreen",
                          padding: "10px",
                          borderRadius: "10px",
                          fontWeight: "bold",
                          margin: 0,
                        }}
                      >
                        <div className="col-md-3 col-xs-4 heading_hover">
                          Over All Percentage :{" "}
                          {myData?.overAllPercentage * 100}%
                        </div>
                        <div className="col-md-3 col-xs-4 heading_hover">
                          Lesson Completed : {myData?.lessonCompletedTotal}
                        </div>
                        <div className="col-md-3 col-xs-4 heading_hover">
                          Completed :{" "}
                          {Math.round(
                            (myData?.lessonCompletedTotal * 100) / 35
                          )}
                          %
                        </div>
                      </div>

                      <div className="col-12 text-center mt-3">
                        <Button
                          disabled={myData?.lessonCompletedTotal < 35}
                          onClick={() => {
                            navigate(`/Admin/Certificate/${studentItem._id}`);
                          }}
                          isDisabled={!studentItem?.completed}
                          colorScheme={"blue"}
                        >
                          {studentItem?.completed} Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                    <div className="text-center">
                      <Button
                        onClick={() =>
                          navigate(
                            "/superAdmin/changePasswordStudent/" +
                              studentItem?._id
                          )
                        }
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
                      <Button
                        onClick={async () => {
                          Swal.fire({
                            title: "Your Password",
                            input: "password",
                            inputAttributes: {
                              autocapitalize: "off",
                            },
                            showCancelButton: true,
                            confirmButtonText: "Complete",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const apiResult = await forcedUpdate({
                                adminCode: result.value,
                                admin: user?.id,
                                studentName: studentItem.name,
                                studentId: studentItem._id,
                              });
                              if (apiResult.success) {
                                Swal.fire(
                                  "Completed",
                                  "You have ForcedFully Completed ",
                                  "success"
                                );
                              } else {
                                Swal.fire(
                                  "Error",
                                  "Not Completed  ",
                                  "error  "
                                );
                              }
                            }
                          });
                        }}
                        rightIcon={<FaCheck size={25} color="white" />}
                        colorScheme="blue"
                      >
                        Complete
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          navigate(
                            `/superAdmin/student/docs/${studentItem._id}`
                          );
                        }}
                        rightIcon={<FaFile size={25} color="white" />}
                        colorScheme="blue"
                      >
                        Documents
                      </Button>
                    </div>
                  </div>
                  {/* <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
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
                 */}
                  {/* <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
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
                 */}
                  {/* <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
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
                 */}
                  <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          navigate(`/superAdmin/editForm/${studentItem._id}`);
                        }}
                        rightIcon={<FaHandshake size={25} color="white" />}
                        colorScheme="blue"
                      >
                        Main Form
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-5">
              <div
                className="d-flex"
                style={{
                  height: "400px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bar
                  options={options}
                  data={data}
                  className="shadow-lg "
                  style={{ borderRadius: "15px" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShowStudentProfile;
