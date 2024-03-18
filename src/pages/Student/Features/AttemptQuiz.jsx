import { useEffect, useRef, useState } from "react";
import "../../../App.css";
// import "@szhsin/react-menu/dist/index.css";
// import "@szhsin/react-menu/dist/transitions/slide.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactPlayer from "react-player";
import React from "react";

import {
  ChapterModuleOfStudent,
  attempQuiz,
  fetchQuestionsByModuleId,
  getModuleById,
  getStudentById,
  videoUpdate,
} from "../../../services/Student";
import Navbar from "../../../components/Navbar";
import { Button, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";

const AWS = "https://bucket-name-basic.s3.us-east-2.amazonaws.com";

const AttemptQuiz = () => {
  const [mainData, setMainData] = useState({
    _id: "63c6ac90c019a4ca5042a841",
    studentName: "haseebabbasi",
    studentId: "63c6ac71c019a4ca5042a83d",
    chapterNo: 1,
    chapterName: "01_Orientation",
    videoPlayed: 0,
    videoCompleted: false,
    attempted: false,
    status: "NOT_ATTEMPTED",
    __v: 0,
  });

  const [maxLength, SetMaxLength] = useState(mainData.videoPlayed);
  const navigate = useNavigate();
  const [played, setPlayed] = useState({
    playedSeconds: 0,
    played: 0,
  });
  const videoRef = useRef();
  const reactPlayerRef = useRef();
  const [showAnswer, setShowAns] = useState(false);
  const [answers, setAns] = useState([
    {
      _id: "63d9542674e77300784f22f9",
      questionText:
        "In order to obtain your commercial driver's license (COL), you must first: ",
      chapterId: 1,
      quesOptions: [
        "Have all restrictions removed from your personal driver'S license ",
        "Be at least 15-years Old ",
        "Get an endorsement for passenger carrying vehicles ",
        "Obtain a commercial learner permit (CLP) ",
      ],
      quesAnswer: "Obtain a commercial learner permit (CLP) ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f22fa",
      questionText:
        "Which Of the following requires an endorsement on your CDL? ",
      chapterId: 1,
      quesOptions: [
        "Manual transmission  ",
        "using an ELD ",
        "Air brakers ",
        "Double/triple trailers ",
      ],
      quesAnswer: "Air brakers ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f22fb",
      questionText:
        "According to the FMCSRS, you are qualified to operate a CMV if you: ",
      chapterId: 1,
      quesOptions: [
        "Are currently disqualified from operating a motor vehicle ",
        "Are at least 15-years Old ",
        "Have only one current CDL ",
        "Have passed an IQ test ",
      ],
      quesAnswer: "Have only one current CDL ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f22fc",
      questionText:
        "Which Of the following is considered a major disqualifying offense? ",
      chapterId: 1,
      quesOptions: [
        "Following the vehicle ahead too closely ",
        "Violating an out-of-service order ",
        "Leaving the scene of an accident ",
        "Texting while driving a CMV ",
      ],
      quesAnswer: "Leaving the scene of an accident ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f22fd",
      questionText: "Prohibited alcohol use includes which Of the following? ",
      chapterId: 1,
      quesOptions: [
        "Use during the eight hours following an accident, or until undergo a Post-accident test ",
        "Reporting for duty with an alcohol concentration Of 0.01 or greater ",
        "use during the eight hours before performing safety sensitive-functions ",
        "use while cleaning your windows and mirrors ",
      ],
      quesAnswer:
        "Use during the eight hours following an accident, or until undergo a Post-accident test ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f2300",
      questionText:
        "The federal size and weight limits apply to a national system of interstates commonly referred to as the: ",
      chapterId: 1,
      quesOptions: [
        "Federal Network ",
        "National Network ",
        "Limit Highway ",
        "Weight Road ",
      ],
      quesAnswer: "National Network ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f22f8",
      questionText:
        "The Federal Motor Carrier Safety Regulations (FMCSRs) establish basic safety rules and standards for: ",
      chapterId: 1,
      quesOptions: [
        "only motor carriers and CMVs ",
        "all answers are correct",
        "Motor carriers ",
        "Commercial motor vehicles (CMA'S) ",
        "All answers are correct, except tolls ",
        "highway tolls",
        "drivers and Other employees of motor carriers ",
      ],
      quesAnswer: "All answers are correct, except tolls ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f22fe",
      questionText:
        "Which of the following will result in you being removed from all safety-sensitive functions until you go through a return-to-duty process? ",
      chapterId: 1,
      quesOptions: [
        "Failing an alcohol test ",
        "Testing positive for drugs ",
        "Refusing to take a required alcohol and/or drug test ",
        "All correct",
      ],
      quesAnswer: "All correct",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f22ff",
      questionText:
        "What part Of a combination vehicle is referred to as the 'power unit'? ",
      chapterId: 1,
      quesOptions: ["Drive axle", "Duals   ", "Tractor ", "Fifth wheel "],
      quesAnswer: "Tractor ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
    {
      _id: "63d9542674e77300784f22f7",
      questionText:
        "The trucking industry is subject to regulations from which of the following agencies? ",
      chapterId: 1,
      quesOptions: [
        "U.S. Department of (DOI) ",
        "Federal Motor Carrier Safety Administration (FMCSA) ",
        "Bureau of Transportation Statistics (BTS) ",
        "Bureau Of Safety and Environmental Enforcement (BSEE) ",
      ],
      quesAnswer: "Federal Motor Carrier Safety Administration (FMCSA) ",
      createAt: "2023-01-31T17:47:15.950Z",
      __v: 0,
    },
  ]);
  // questionText: string;
  //   chapterId: number;
  //   quesOptions: string[];
  //   createAt: Date;
  //   quesAnswer?: string |

  const [supposedCurrentTime, SetSupposedCurrentTime] = useState();
  const [ans, SetAnswers] = useState();
  const user = useSelector((state) => state?.user);
  const [loader, setLoader] = useState(false);
  const { quiz } = useParams();

  const [fetchedModule, setModule] = useState({
    _id: "63b9bebdfb67592a2a65cfb8",
    name: "Lesson 01_Orientation",
    videoLink:
      "https://united-cdl-school.s3.amazonaws.com/Lectures/High/Lesson+01_Orientation.mp4",
    videoLinks: [
      "https://united-cdl-school.s3.amazonaws.com/Lectures/High/Lesson+01_Orientation.mp4",
      "https://united-cdl-school.s3.amazonaws.com/Lectures/High/Lesson+01_Orientation.mp4",
      "https://united-cdl-school.s3.amazonaws.com/Lectures/High/Lesson+01_Orientation.mp4",
    ],
    customIndex: 1,
    description:
      "Soon, will be added, this is description of the First Chapter",
    lastUpdated: "2023-01-07T18:49:25.165Z",
    createAt: "2023-01-07T18:49:25.166Z",
    __v: 0,
  });

  const videRef = useRef();

  useEffect(() => {
    setLoader(true);
    async function fetchModule() {
      const studentInfo = await getStudentById(user?.id);
      if (studentInfo?.user.isStudent === false) {
        navigate("/student/dashboard");
      }

      const data = await getModuleById(quiz);
      setModule(data?.chapter[0]);

      setLoader(false);
    }
    fetchModule();

    async function fetchMainChapterData() {
      const data = await ChapterModuleOfStudent({
        chapterNo: quiz,
        studentId: user?.id,
      });
      setMainData(data?.chapter);

      SetMaxLength(data?.chapter?.videoPlayed);

      // setQuestions([...fetchedQuestions]);
    }
    fetchMainChapterData();

    async function fetchQuestions() {
      const data = await fetchQuestionsByModuleId(quiz);
      setQuestions([...data.questions]);

      // setQuestions([...fetchedQuestions]);
    }
    fetchQuestions();
  }, []);

  const MySwal = withReactContent(Swal);
  const [questions, setQuestions] = useState([]);
  const [allowSubmit, setSubmit] = useState(false);

  const [quality, setQuality] = useState({
    // link: `${Host}/video/rdr2_1-high.mp4`,
    link: `${fetchedModule?.videoLink}`,
    res: "High",
  });

  return (
    <div>
      {loader === false ? (
        <div className="container">
          <div className="d-flex justify-content-around p-1">
            <div className="display-6" style={{ fontSize: "100%" }}>
              Quiz : {quiz} {fetchedModule?.name.substring(10)}
            </div>
            <div className="display-6" style={{ fontSize: "100%" }}>
              Progress : {Math.ceil(played.played * 100)}
            </div>
            <div className="display-6" style={{ fontSize: "100%" }}>
              Max : {maxLength}
            </div>
          </div>

          <div className="App pb-5">
            <div className="card p-4 mb-3">
              <div
                className="text-center"
                style={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  fontFamily: "Abril Fatface",
                  fontSize: "20px",
                }}
              >
                <ReactPlayer
                  width={"100%"}
                  ref={reactPlayerRef}
                  onProgress={(e) => {
                    const playedObject = {
                      playedSeconds: e.playedSeconds,
                      played: e.played,
                    };
                    const playedVideo = Math.ceil(e.played * 100);
                    setPlayed(playedObject);
                    SetSupposedCurrentTime(playedObject.played);

                    if (playedVideo >= maxLength) SetMaxLength(playedVideo);

                    if (playedVideo == 13 && maxLength <= playedVideo) {
                      videoUpdate({
                        chapterId: quiz,
                        videoPercentage: 13,
                        studentId: user?.id,
                      });
                    } else if (playedVideo == 26 && maxLength <= playedVideo) {
                      videoUpdate({
                        chapterId: quiz,
                        videoPercentage: 26,
                        studentId: user?.id,
                      });
                    } else if (playedVideo == 39 && maxLength <= playedVideo) {
                      videoUpdate({
                        chapterId: quiz,
                        videoPercentage: 39,
                        studentId: user?.id,
                      });
                    } else if (playedVideo == 52 && maxLength <= playedVideo) {
                      videoUpdate({
                        chapterId: quiz,
                        videoPercentage: 52,
                        studentId: user?.id,
                      });
                    } else if (playedVideo == 65 && maxLength <= playedVideo) {
                      videoUpdate({
                        chapterId: quiz,
                        videoPercentage: 65,
                        studentId: user?.id,
                      });
                    } else if (playedVideo == 80 && maxLength <= playedVideo) {
                      videoUpdate({
                        chapterId: quiz,
                        videoPercentage: 80,
                        studentId: user?.id,
                      });
                    } else if (playedVideo == 100 && maxLength <= playedVideo) {
                      videoUpdate({
                        chapterId: quiz,
                        videoPercentage: 100,
                        studentId: user?.id,
                      });
                    }
                  }}
                  onSeek={(e) => {
                    // console.log(
                    //   reactPlayerRef.current.getCurrentTime(),
                    //   "time"
                    // );
                    // reactPlayerRef.current.seekTo(
                    //   played.playedSeconds,
                    //   "seconds"
                    // );
                    // console.log(reactPlayerRef.current);
                    // reactPlayerRef.current.seekTo(
                    //   supposedCurrentTime - 10,
                    //   "seconds"
                    // );
                    // if (delta > 0.01) {
                    // reactPlayerRef.current.currentTime =
                    //   supposedCurrentTime - 20;
                    // }
                  }}
                  controls={true}
                  url={fetchedModule.videoLink}
                  playing
                  // playIcon={<button>Play</button>}
                />
                {/* <Button
                  onClick={() => {
                    reactPlayerRef.current.seekTo(
                      played.playedSeconds + 100,
                      "seconds"
                    );

                    // console.log(reactPlayerRef.current.player);
                    // reactPlayerRef.current.player.handlePlay(true);
                  }}
                  rightIcon={<FaPlay size={18} color="white" />}
                  colorScheme="blue"
                ></Button>
                 */}
              </div>
            </div>
          </div>
          {/*  */}
          {(played.played >= 80 || maxLength >= 80) && (
            <div className="quiz">
              <div className="display-3">Answer Question From Video</div>
              {questions?.map((question, index) => (
                <div key={index} className="card my-3">
                  <div className="row" style={{ padding: "15px" }}>
                    <div
                      className="display-6 my-2"
                      style={{ fontSize: "20px" }}
                    >
                      {index + 1}: {question?.questionText}
                    </div>
                    <div
                      className="d-flex  flex-wrap"
                      style={{
                        backgroundColor:
                          question?.isCorrect === undefined
                            ? "white"
                            : question?.isCorrect === true
                            ? "lightgreen"
                            : "#FF6347",
                      }}
                    >
                      {question?.quesOptions?.map((option, OptionIndex) => (
                        <div
                          key={index + "" + OptionIndex}
                          style={{
                            flex: "45%",
                            width: "90%",
                            margin: "10px",
                            backgroundColor:
                              question?.selected == option
                                ? "Highlight"
                                : "white",
                            padding: "10px",
                            boxShadow: "0 0 0 1px Highlight",
                            marginBottom: "10px",
                            borderRadius: "20px",
                          }}
                          className="option_hover"
                          onClick={() => {
                            const copyQuestions = [...questions];
                            copyQuestions[index].selected = option;

                            setQuestions([...copyQuestions]);

                            const selected = questions.every(
                              (item) => item.selected
                            );
                            setSubmit(selected);
                          }}
                        >
                          <div className="d-flex">
                            <input
                              className="form-check-input mx-3"
                              type="radio"
                              name={question.id}
                              value={option}
                              style={{ fontSize: "14px" }}
                              checked={
                                question?.selected == option ? true : false
                              }
                              onChange={() => {
                                const copyQuestions = [...questions];
                                copyQuestions[index].selected = option;
                                setQuestions([...copyQuestions]);

                                const selected = questions.every(
                                  (item) => item.selected
                                );
                                setSubmit(selected);
                              }}
                            />
                            <label className="form-check-label">{option}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex">
                <button
                  onClick={() => {
                    MySwal.fire({
                      title: "Do you Really Want to Reset ! 🤔",
                      confirmButtonText: "Reset",
                      showCancelButton: true,
                      showLoaderOnConfirm: true,
                      allowOutsideClick: () => !Swal.isLoading(),
                    }).then((result) => {
                      if (result?.isConfirmed) {
                        const resetQuestions = questions.map((item) => {
                          item.selected = undefined;
                          return item;
                        });

                        setQuestions([...resetQuestions]);
                        setSubmit(false);
                      }
                    });
                  }}
                  className="btn btn-danger btn-lg  mx-5 my-5"
                  style={{ width: "50%" }}
                >
                  Reset
                </button>
                <button
                  onClick={async () => {
                    const result = await attempQuiz({
                      questions,
                      studentId: user?.id,
                      moduleName: fetchedModule?.name,
                      moduleNo: fetchedModule?.customIndex,
                    });

                    // consolae.log(result);
                    if (result?.success) {
                      MySwal.fire({
                        icon: "info",
                        title: "Quiz Attempted",
                        text: `You have secured ${Number(
                          result?.result?.percentage * 100
                        )?.toFixed(2)}% \n Correct : ${
                          result.result.correct
                        }\n Wrong : ${result.result.wrong} `,
                      });

                      setQuestions(result.result.question);
                      setShowAns(true);
                      // console.log("real questions", questions);
                      // navigate("/student/showModules");
                    } else {
                      MySwal.fire({
                        icon: "error",
                        title: "Quiz Attempted",
                        text: "There was error in attempting the quiz",
                      });
                    }
                  }}
                  disabled={!allowSubmit}
                  className="btn btn-primary btn-lg  mx-5 my-5"
                  style={{ width: "50%" }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center my-5">
          <Spinner width={20} padding={20}></Spinner>
        </div>
      )}
    </div>
  );
};

export default AttemptQuiz;
