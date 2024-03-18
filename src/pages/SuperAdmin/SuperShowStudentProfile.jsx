import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  blockStudent,
  changeStudentNameByAdmin,
  forcedUpdate,
  getAllModulesByStudentId,
  getMyResults,
  getStudentById,
  makeStudentActive,
  makeStudentInActive,
  markVerified,
  unBlockStudent,
} from "../../services/Student";
import { FaChartBar, FaCheck, FaHandshake } from "react-icons/fa";
import Swal from "sweetalert2";
import { Button, Spinner } from "@chakra-ui/react";
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
import { Block, Certificate, Check, Edit, Lock } from "../../assets/icons";
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
      position: "top",

      text: "Student Marks Per Modules",
    },

    datalabels: {
      display: true,
      color: "black", // You can customize the color of the labels
      anchor: "end", // Position of the labels on the bars
      align: "end",
      formatter: (value) => value, // Display the actual value on top of the bar
      font: {
        size: 10,
      },
      padding: {
        // top: 10,
      },
    },
  },

  scales: {
    x: {
      grid: {
        display: false, // Hide x-axis grid lines
      },
    },
    y: {
      min: 0,
      max: 120,
      display: false,
      grid: {
        display: false, // Hide y-axis grid lines
      },
    },
  },

  // scales: {
  //   y: {
  //     min: 0,
  //     max: 120,
  //   },
  // },
};

const SuperShowStudentProfile = () => {
  const [modulesData, setModulesData] = useState([]);
  const [myData, setMyData] = useState();
  const data = {
    labels,
    datasets: [
      {
        label: "Student Marks ",
        data: modulesData?.map((item) => {
          return item?.percentage === undefined ? 0 : item?.percentage * 100;
        }),
        backgroundColor: "rgba(41,41,41,0.5)",
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
  const changeName = async () => {
    Swal.fire({
      title: "Enter New Name of Student",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,

      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await changeStudentNameByAdmin(
          result.value,
          studentId
        );
        if (response) {
          Swal.fire({
            title: `New Name is :${result.value}`,
          });
        }
      }
    });
  };

  const deActivateStudent = async () => {
    const result = await makeStudentInActive(studentId, user?.id);
    if (result?.success) {
      Swal.fire("InActivated Trainee", "", "success");
      setUpdate(update + 1);
    } else {
      {
        Swal.fire("Error in InActivation Trainee", "", "question");
      }
    }
  };

  const unBlockTrainee = async () => {
    const result = await unBlockStudent(studentId, user?.id);
    if (result?.success) {
      Swal.fire("UnBlocked Student", "", "success");
      setUpdate(update + 1);
    } else {
      {
        Swal.fire("Error in UnBlocking Student", "", "question");
      }
    }
  };
  const activateStudent = async () => {
    const result = await makeStudentActive(studentId, user?.id);
    if (result?.success) {
      Swal.fire("Activated Trainee", "", "success");
      setUpdate(update + 1);
    } else {
      {
        Swal.fire("Error in Activated Trainee", "", "question");
      }
    }
  };

  const completeByAdmin = async (name, id) => {
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
          studentName: name,
          studentId: id,
        });
        if (apiResult.success) {
          Swal.fire("Completed", "You have ForcedFully Completed ", "success");
        } else {
          Swal.fire("Error", "Not Completed  ", "error  ");
        }
      }
    });
  };
  const blockByAdmin = async () => {
    const result = await blockStudent(studentId, user?.id);
    if (result?.success) {
      Swal.fire("Blocked Student", "", "success");
      setUpdate(update + 1);
    } else {
      {
        Swal.fire("Error in Blocking Trainee", "", "question");
      }
    }
  };
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
              className={`mx-3 my-3 shadow-lg rounded-lg p-3 
              bg-[rgba(41,41,41,0.9)]

              `}
            >
              <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="text-center my-3">
                    <img
                      className="mx-auto rounded-full"
                      src={`https://api.dicebear.com/5.x/initials/svg?seed=${studentItem?.name}`}
                      width={100}
                      height={100}
                      alt=""
                    />

                    <div className="font-extrabold text-white">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="text-center">{studentItem?.name}</div>
                        <div
                          className="ms-2 heading_hover"
                          onClick={changeName}
                        >
                          {<Edit />}
                        </div>
                      </div>
                    </div>
                    <div className="font-extrabold text-white">
                      <div>{studentItem?.email}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="text-center my-3">
                    <div className="row p-3">
                      <div
                        className={`flex
                ${studentItem?.active === true ? "bg-green-400" : "bg-red-200"}
                p-4 rounded-md font-bold`}
                        style={{
                          margin: 0,
                        }}
                      >
                        <div className="w-1/3">
                          Over All Percentage:{" "}
                          {(myData?.overAllPercentage * 100).toFixed(2)}%
                        </div>
                        <div className="w-1/3">
                          Lesson Completed: {myData?.lessonCompletedTotal}
                        </div>
                        <div className="w-1/3">
                          Completed:{" "}
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
                          rightIcon={<Certificate />}
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
                        rightIcon={<Lock />}
                      >
                        Password
                      </Button>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                    <div className="text-center">
                      {studentItem?.blocked === true ? (
                        <Button
                          onClick={unBlockTrainee}
                          rightIcon={<Block size={25} color="white" />}
                          colorScheme="green"
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          onClick={blockByAdmin}
                          rightIcon={<Block size={25} color="white" />}
                          colorScheme="red"
                        >
                          Block
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                    <div className="text-center">
                      {studentItem?.active === true ? (
                        <Button
                          onClick={deActivateStudent}
                          rightIcon={<Check />}
                        >
                          InActivate
                        </Button>
                      ) : (
                        <Button onClick={activateStudent} rightIcon={<Check />}>
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          completeByAdmin(studentItem.name, studentItem._id);
                        }}
                        rightIcon={<Check size={25} color="white" />}
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
                          navigate(`/superAdmin/editForm/${studentItem._id}`);
                        }}
                        rightIcon={<FaHandshake size={25} stroke={"0.1"} />}
                      >
                        Main Form
                      </Button>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          navigate(
                            `/superAdmin/showModuleResult/${studentItem._id}`
                          );
                        }}
                        rightIcon={<FaChartBar size={25} stroke={"0.1"} />}
                      >
                        Progress
                      </Button>
                    </div>
                  </div>
                  {studentItem?.verified !== true && (
                    <div className="col-md-3 col-lg-3 col-ms-6 col-xs-12 my-1">
                      <div className="text-center">
                        <Button
                          onClick={async () => {
                            const result = await markVerified(
                              studentItem._id,
                              user.id
                            );
                            if (result?.message) {
                              Swal.fire("Student Verification", result.message);
                            }
                          }}
                          rightIcon={<Check />}
                        >
                          Mark Verified
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="py-5">
              <div
                style={{
                  overflowX: "auto",
                }}
              >
                <table
                  className="d-flex"
                  style={{
                    width: "800px",
                    height: "400px",
                    alignItems: "center",
                    justifyContent: "center",
                    overflowX: "auto",
                  }}
                >
                  <Bar
                    options={options}
                    data={data}
                    className="shadow-lg "
                    style={{ borderRadius: "15px" }}
                  />
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SuperShowStudentProfile;
