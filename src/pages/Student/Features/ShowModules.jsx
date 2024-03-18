import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import {
  getAllModules,
  getAllModulesByStudentId,
  getMyResults,
  getStudentById,
} from "../../../services/Student";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner, Stack } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { ProgressBar } from "react-bootstrap";

const ShowModules = () => {
  const [value, setValue] = useState("1");

  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [fetchedModules, setModules] = useState([]);
  const [myData, setMyData] = useState();
  const [info, setInfo] = useState();
  useEffect(() => {
    setLoading(true);
    async function getModules() {
      const data = await getAllModulesByStudentId(user?.id);
      setModules(data.chapters);
    }
    getModules();
    async function getMyResult() {
      const studentInfo = await getStudentById(user?.id);
      setInfo(studentInfo?.user);
      if (studentInfo?.user.isStudent === false) {
        navigate("/student/dashboard");
      }

      const data = await getMyResults(user?.id);
      if (data?.success) {
        setLoading(false);
        setMyData(data.studentResults);
      }
    }
    getMyResult();
  }, []);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  return (
    <div style={{}}>
      <div className="container modules">
        <div className="d-flex justify-content-between flex-wrap p-3 align-items-center">
          <div className="display-6" style={{ fontWeight: "bolder" }}>
            Welcome to United CDL Training School
          </div>
          <div
            className="display-6 "
            style={{ color: "silver", fontSize: "25px" }}
          >
            <a href="tel:+1 301-888-6339" className="">
              <span>📞</span>
              <span>301-888-6339</span>
            </a>
          </div>
        </div>
        <div
          className="row "
          style={{
            backgroundColor: "lightgreen",
            padding: "10px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          <div className="col-md-3 col-xs-4 heading_hover">
            Over All Percentage : {myData?.overAllPercentage?.toFixed(2) * 100}%
          </div>
          <div className="col-md-3 col-xs-4 heading_hover">
            Lesson Completed : {myData?.lessonCompletedTotal}
          </div>
          <div className="col-md-3 col-xs-4 heading_hover">
            Completed : {Math.round((myData?.lessonCompletedTotal * 100) / 35)}%
          </div>
        </div>
        <div
          className=" text-center chapter_name heading_hover"
          style={{ fontFamily: "Abril Fatface", fontSize: "50px" }}
        >
          All Modules
        </div>

        {loading === false ? (
          <div className=" my-3 pb-5">
            {fetchedModules?.map((module) => (
              <div
                key={module?.chapterNo}
                className="d-flex  flex-row  flex-wrap justify-content-between my-3 p-2 px-4"
                style={{
                  alignItems: "center",
                  // borderColor: "transparent",
                  // borderRadius: "20px",
                  borderColor: "silver",
                  cursor: "pointer",
                  borderBottom: "2px solid silver",
                }}
              >
                <div style={{ margin: "10px" }}>
                  <span className="d-inline">{module?.chapterNo + " "}. </span>
                  <h2
                    onClick={() => {
                      if (module.percentage >= 0.8)
                        MySwal.fire({
                          title: "Do you want to re-attempt the Quiz",
                          confirmButtonText: "Attempt",
                          showCancelButton: true,
                          showLoaderOnConfirm: true,
                          allowOutsideClick: () => !Swal.isLoading(),
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate(
                              `/student/attempQuiz/${module?.chapterNo}`
                            );
                          }
                        });
                      else navigate(`/student/attempQuiz/${module?.chapterNo}`);
                    }}
                    className="display-6 chapter_name d-inline"
                    style={{ fontSize: "20px", lineHeight: 2.5 }}
                  >
                    {module?.chapterName?.substring(3)}
                  </h2>
                </div>
                <div>
                  <div className="d-flex text-center justify-content-center  flex-wrap ">
                    <span className="mx-1 heading_hover">
                      Completed:{" "}
                      <span style={{ color: "#797d7b" }}>
                        {module.videoPlayed + " "}%
                      </span>
                    </span>
                    <span className="mx-1 heading_hover ">
                      Percentage:{" "}
                      <span style={{ color: "#797d7b" }}>
                        {module?.percentage == undefined
                          ? 0
                          : module.percentage * 100}
                        %
                      </span>
                    </span>

                    <span className="mx-1 d-block px-3 ">
                      <ProgressBar
                        striped
                        style={{ width: "200px", height: "30px" }}
                        variant="success"
                        now={module.videoPlayed}
                      ></ProgressBar>
                    </span>

                    <span className="circles py-1 ">
                      {module?.status === "NOT_ATTEMPTED" && (
                        <Stack direction="row ">
                          <span
                            className="circle mx-1"
                            style={{ border: "1px solid silver" }}
                          ></span>
                          <span
                            className="circle mx-1"
                            style={{ border: "1px solid silver" }}
                          ></span>
                          <span
                            style={{ border: "1px solid silver" }}
                            className="circle mx-1"
                          ></span>
                        </Stack>
                      )}
                      {module?.status === "VIDEO_COMPLETED" && (
                        <Stack direction="row ">
                          <span
                            className="circle mx-1"
                            style={{ backgroundColor: "gray" }}
                          ></span>
                          <span
                            className="circle mx-1"
                            style={{ border: "1px solid silver" }}
                          ></span>
                          <span
                            className="circle mx-1"
                            style={{ border: "1px solid silver" }}
                          ></span>
                        </Stack>
                      )}
                      {module?.status === "FAILED" && (
                        <Stack direction="row ">
                          <span
                            className="circle mx-1"
                            style={{ border: "1px solid silver" }}
                          ></span>

                          <span
                            className="circle mx-1"
                            style={{ backgroundColor: "red" }}
                          ></span>

                          <span
                            className="circle mx-1"
                            style={{ border: "1px solid silver" }}
                          ></span>
                        </Stack>
                      )}
                      {module?.status === "PASSED" && (
                        <Stack direction="row ">
                          <span
                            className="circle mx-1"
                            style={{ border: "1px solid silver" }}
                          ></span>

                          <span
                            className="circle mx-1"
                            style={{ border: "1px solid silver" }}
                          ></span>

                          <span
                            className="circle mx-1"
                            style={{ backgroundColor: "green" }}
                          ></span>
                        </Stack>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center my-5">
            <Spinner width={20} padding={20}></Spinner>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShowModules;
