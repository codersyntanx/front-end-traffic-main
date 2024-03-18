import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  StudentFormById,
  getMyResults,
  getStudentById,
} from "../../services/Student";
import scroll from "../../animation/scroll_down.json";
import {
  FaExternalLinkAlt,
  FaFileDownload,
  FaGraduationCap,
  FaVideo,
} from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import Lottie from "lottie-react";

import { useRef } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { LogoutUser } from "../../store/UserActions";
import Step from "../../components/Step";
import { Download, Edit, Lock } from "../../assets/icons";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [progress, setProgress] = useState(100);
  const OldProgress = 80;

  const user = useSelector((state) => state?.user);
  const progressRef = useRef();
  const [myData, setMyData] = useState();
  const [mainFormData, setFormData] = useState();
  const [studentData, setStudentData] = useState();
  useEffect(() => {
    setLoading(true);
    async function fetchStudentById(studentId) {
      const data = await getStudentById(studentId);
      const formData = await StudentFormById(studentId);
      if (formData.success) {
        if (formData?.forms) {
          setFormData(formData?.forms);
        }
      }
      if (data?.success) {
        setStudentData(data?.user);
        setLoading(false);
      } else {
        dispatch(LogoutUser());
        navigate("/");
      }
    }

    fetchStudentById(user?.id);
    async function getMyResult() {
      const data = await getMyResults(user?.id);
      if (data?.success) {
        setMyData(data?.studentResults?.lessonCompletedTotal);
        setLoading(false);
      }
    }
    getMyResult();
  }, []);

  return (
    <>
      {loading === false ? (
        <div className="bg-gradient-to-b from-transparent via-neutral-50 to-stone-50 min-h-screen relative">
          <div className="hidden lg:block md:block absolute opacity-[0.2] w-full">
            <img className="w-full" src="/bg_2.jpg" alt="" srcSet="" />
          </div>
          <div className="container">
            <div className="d-flex justify-content-between flex-wrap p-3 align-items-center">
              <div className="display-6 " style={{ fontWeight: "bolder" }}>
                Welcome to United CDL Training School
              </div>
              <div
                className="display-6 scaling_hover"
                style={{ color: "silver", fontSize: "25px" }}
              >
                <a href="tel:+1 301 888-6339" className="">
                  <span>📞</span>
                  <span>(301) 888-6339</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse md:flex-row-reverse   bg-cover bg-center custom_bg_dash ">
              <div className="w-full z-10 lg:w-5/12 my-3 border-emerald-300 border p-2 lg:p-8 rounded-lg shadow-md">
                <h3 className="text-center text-4xl"> Profile </h3>

                <div className="py-3">
                  <div className="d-flex justify-content-between">
                    <div>User Nickname</div>
                    <div className="fw-bold">{studentData?.name}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Profile Created</div>
                    <div className="fw-bold">
                      {new Date(studentData?.createAt).getMonth() + 1}/
                      {new Date(studentData?.createAt).getDay()}/
                      {new Date(studentData?.createAt).getFullYear()}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Email</div>
                    <div className="fw-bold">{studentData?.email}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Authorized By</div>
                    <div className="fw-bold">
                      {studentData?.isStudent === true ? (
                        <span style={{ color: "green" }}>
                          {`${mainFormData[0]?.checkedBySign}`?.toUpperCase()}
                        </span>
                      ) : (
                        <span style={{ color: "red" }}>Not Authorized Yet</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around flex-wrap p-2">
                  <Button
                    onClick={() => navigate("/student/changePassword")}
                    rightIcon={<Lock />}
                    colorScheme="blackAlpha"
                    color={"white"}
                    background={"rgba(41,41,41,0.82)"}
                  >
                    Password
                  </Button>
                  {/* <Button
                    disabled
                    onClick={() => {
                      openInNewTab(
                        "https://bucket-name-basic.s3.us-east-2.amazonaws.com/catalog.pdf"
                      );
                    }}
                    rightIcon={<Download />}
                    color={"white"}
                    colorScheme="blackAlpha"
                    background={"rgba(41,41,41,0.82)"}
                    className="my-2"
                  >
                    Download Catalog
                  </Button> */}
                </div>

                <hr />
                <div className="text-center"></div>

                <div className="d-flex align-items-center py-3">
                  <div className="w-50">Learning Progress</div>
                  <div className="w-full">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-400">
                            {Math.round((myData * 100) / 35) >= 100
                              ? "Completed"
                              : "In Progress"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs font-semibold px-1 inline-block ${
                              Math.round((myData * 100) / 35) >= 80
                                ? "bg-green-400"
                                : "bg-blue-500"
                            }`}
                          >
                            {Math.round((myData * 100) / 35)}%
                          </span>
                        </div>
                      </div>
                      <div
                        className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${
                          Math.round((myData * 100) / 35) >= 80
                            ? "bg-green-400"
                            : "bg-blue-500"
                        } `}
                      >
                        <div
                          style={{
                            width: `${Math.round((myData * 100) / 35)}`,
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full z-10 lg:w-7/12 my-3 lg:ml-6 border-emerald-300 border p-2 lg:p-8 rounded-lg shadow-md h-[580px] overflow-x-hidden overflow-y-auto relative">
                <div className="absolute right-0">
                  <Lottie
                    animationData={scroll}
                    style={{ width: "50px" }}
                    loop={true}
                  />
                </div>

                <Step desc={"Application Area"} number={1} key={0}>
                  <div className="flex justify-center my-1">
                    <div className="flex justify-center">
                      <div
                        className="bg-green-500 text-center w-full cursor-pointer text-white py-1 px-4 rounded-lg  duration-300 group-hover:bg-green-700 group-hover:text-gray-100 group-hover:font-bold  focus:outline-dotted peer transition-all"
                        onClick={() => navigate("/student/fillData")}
                      >
                        Main Form
                      </div>
                    </div>
                  </div>
                </Step>

                <Step
                  desc={"Commercial Learners Permit Test Training"}
                  number={2}
                  key={2}
                  icon={
                    <FaExternalLinkAlt className="ml-2 text-lg text-white" />
                  }
                  onClickHandler={() => {
                    openInNewTab("https://www.nstschool.com/clp");
                  }}
                />

                <div className="row ">
                  <Step
                    desc={"Entry Level Driving Training"}
                    number={3}
                    key={3}
                  >
                    <div className="flex items-center justify-center text-center">
                      <div
                        onClick={() => {
                          if (
                            (studentData?.isAgreement == true &&
                              studentData?.isEnrolled == true &&
                              studentData?.isDataCollected == true) ||
                            studentData?.isFormApproved == true
                          ) {
                            if (studentData?.active === true) {
                              navigate("/student/showModules");
                            } else {
                              Swal.fire(
                                "Not Authorized",
                                "Ask admin to approve your form and make you an active user",
                                "warning"
                              );
                            }
                          } else {
                            Swal.fire(
                              "Main form is not filled yet",
                              "Please complete the main form first and ask the admin to approve",
                              "warning"
                            );
                          }
                        }}
                        className="bg-green-500   cursor-pointer text-white py-2 px-4 rounded-lg  duration-300 hover:bg-green-600 hover:text-gray-100 group-hover:font-bold  focus:outline-dotted peer transition-all"
                      >
                        <div className="flex justify-center items-center">
                          Go to Modules
                          <FaExternalLinkAlt className="ml-2 text-lg text-white" />
                        </div>
                      </div>
                    </div>
                  </Step>

                  <Step
                    desc={"Pre-Trip Inspection Training"}
                    number={4}
                    key={4}
                  />
                  <div className="flex flex-wrap justify-around gap-10">
                    <Button
                      onClick={() => {
                        openInNewTab(
                          "https://united-cdl-school.s3.amazonaws.com/assets/ENTIRE+UPDATE+PRE+TRIP+2023.pdf"
                        );
                      }}
                      rightIcon={<FaFileDownload size={18} color="white" />}
                      colorScheme="blackAlpha"
                      color={"white"}
                      background={"rgba(41,41,41,0.82)"}
                    >
                      Pre-Trip Inspection Document
                    </Button>

                    <Button
                      onClick={() => {
                        openInNewTab("https://youtu.be/3qw2VhGT7w4");
                      }}
                      rightIcon={<FaVideo size={18} color="white" />}
                      colorScheme="blackAlpha"
                      color={"white"}
                      background={"rgba(41,41,41,0.82)"}
                    >
                      Pre-Trip Inspection (English)
                    </Button>
                    <Button
                      onClick={() => {
                        openInNewTab(
                          "https://www.youtube.com/watch?v=AQ0xQTq5BWY"
                        );
                      }}
                      rightIcon={<FaVideo size={18} color="white" />}
                      colorScheme="blackAlpha"
                      color={"white"}
                      background={"rgba(41,41,41,0.82)"}
                    >
                      Pre-Trip Inspection (Spanish)
                    </Button>
                    <Button
                      onClick={() => {
                        openInNewTab("https://youtu.be/4ZDh37OE4J8");
                      }}
                      rightIcon={<FaVideo size={18} color="white" />}
                      colorScheme="blackAlpha"
                      color={"white"}
                      background={"rgba(41,41,41,0.82)"}
                    >
                      Pre-Trip Inspection (School Bus)
                    </Button>
                  </div>

                  <Step
                    desc={"Maneuvering Skills Training"}
                    number={5}
                    key={5}
                    onClickHandler={() => {
                      navigate("/under-development");
                      // openInNewTab("https://youtu.be/3qw2VhGT7w4");
                    }}
                    icon={<FaVideo size={18} color="white" />}
                  />

                  <Step
                    desc={"Road Trip Training"}
                    onClickHandler={() => {
                      navigate("/under-development");
                    }}
                    number={6}
                    key={6}
                    icon={<FaVideo size={18} color="white" />}
                  />

                  <Step
                    desc={"Certificate"}
                    number={7}
                    key={7}
                    icon={<FaGraduationCap size={30} color="white" />}
                    onClickHandler={() => {
                      if (myData == 35)
                        navigate(`/student/Certificate/${user.id}`);
                      else Swal.fire("Please Complete the Course First");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center my-5">
          <Spinner width={20} padding={20}></Spinner>
        </div>
      )}
    </>
  );
};
export default StudentDashboard;
// https://bucket-name-basic.s3.us-east-2.amazonaws.com/catalog.pdf
