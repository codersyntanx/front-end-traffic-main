// import { useEffect, useRef, useState } from "react";
// import "./App.css";
// import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
// import "@szhsin/react-menu/dist/index.css";
// import "@szhsin/react-menu/dist/transitions/slide.css";
// import quizData from "./data/quiz";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// const Host = "http://localhost:4000";
// const AWS = "https://bucket-name-basic.s3.us-east-2.amazonaws.com";

// function App() {
//   const videRef = useRef();
//   const ChangeBase = () => {
//     const video = videRef.current;
//     if (!video) return;
//     setPlayed(Math.ceil((video.currentTime / video.duration) * 100));
//   };
//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
//   const files = acceptedFiles.map((file) => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//       {/* {JSON.stringify(file)} */}
//     </li>
//   ));
//   const [quizState, setQuizState] = useState([...quizData]);
//   const [videoPlayed, setPlayed] = useState(0);
//   const qualities = [
//     {
//       link: `${AWS}/rdr2_1-high.mp4`,
//       // link: `${Host}/video/rdr2_1-high.mp4`,
//       res: "High",
//     },
//     {
//       link: `${AWS}/video/rdr2_1-med.mp4`,
//       res: "Medium",
//     },
//     {
//       link: `${AWS}/video/rdr2_1-low.mp4`,
//       res: "Low",
//     },
//   ];
//   const [quality, setQuality] = useState({
//     // link: `${Host}/video/rdr2_1-high.mp4`,
//     link: `https://bucket-name-basic.s3.us-east-2.amazonaws.com/rdr2_1-high.mp4`,
//     res: "High",
//   });
//   useEffect(() => {
//     videRef.current.addEventListener("timeupdate", () => {
//       ChangeBase();
//     });
//   }, []);
//   return (
//     <div className="App">
//       <h1> Dot Watch And Win 🎉 App </h1>
//       <div className="card">
//         <button
//           disabled
//           style={{ width: "100%", color: "whitesmoke", marginBottom: "0.5rem" }}
//         >
//           {"Quality Video" + quality.res} &nbsp; &nbsp;&nbsp;&nbsp;
//           {videoPlayed + "% Video Played"}
//         </button>
//         <div style={{ position: "relative" }}>
//           <div
//             style={{
//               position: "absolute",
//               zIndex: 1,
//               right: 0,
//               bottom: "18%",
//               fontSize: "10px",
//               color: "white",
//             }}
//           >
//             <Menu menuButton={<MenuButton>Open menu</MenuButton>} transition>
//               {qualities.map((item, index) => (
//                 <MenuItem
//                   key={index}
//                   onClick={() => {
//                     setQuality(item);
//                   }}
//                   style={{
//                     backgroundColor: item.res === quality.res && "silver",
//                   }}
//                 >
//                   {item.res}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </div>

//           {quality.res === "Low" && (
//             <video
//               onChange={(e) => {}}
//               id="videoPlayer"
//               width="650"
//               controls
//               muted={"false"}
//               autoPlay={false}
//               style={{ borderRadius: "0.5rem", position: "relative" }}
//               className="col-12"
//             >
//               <source
//                 src={`${AWS}/rdr2_1-low.mp4`}
//                 type="video/mp4"
//                 label="Low"
//                 res="780"
//               />
//             </video>
//           )}
//           {quality.res === "Medium" && (
//             <video
//               id="videoPlayer"
//               width="650"
//               controls
//               muted="muted"
//               autoPlay={false}
//               style={{ borderRadius: "0.5rem", position: "relative" }}
//               className="col-12"
//             >
//               <source
//                 src={`${AWS}/rdr2_1-med.mp4`}
//                 type="video/mp4"
//                 label="Medium"
//                 res="780"
//               />
//             </video>
//           )}

//           {quality.res === "High" && (
//             <video
//               ref={videRef}
//               id="videoPlayer"
//               width="650"
//               controls
//               muted="muted"
//               autoPlay={false}
//               style={{ borderRadius: "0.5rem", position: "relative" }}
//               className="col-12"
//             >
//               <source
//                 src={`${AWS}/rdr2_1-high.mp4`}
//                 type="video/mp4"
//                 label="HD"
//                 res="780"
//               />
//             </video>
//           )}
//         </div>
//       </div>

//       <div>
//         <div className="display-3">Answer Question From Video</div>
//         {videoPlayed > 80 &&
//           quizState.map((question, index) => (
//             <div key={index} className="card my-3">
//               <div className="row">
//                 <div className="display-6 mb-3" style={{ fontSize: "26px" }}>
//                   {index + 1}: {question.question}
//                 </div>
//                 <div className="d-flex  flex-wrap">
//                   {question.options.map((option, OptionIndex) => (
//                     <div
//                       key={index + "" + OptionIndex}
//                       style={{
//                         flex: "45%",
//                         width: "90%",
//                         margin: "10px",
//                         backgroundColor:
//                           question.selected == option ? "silver" : "white",
//                         padding: "10px",
//                         boxShadow: "0 0 0 1px Highlight",
//                         marginBottom: "10px",
//                         borderRadius: "20px",
//                       }}
//                       onClick={() => {
//                         const copyQuiz = quizData;
//                         const quizList = quizData[index];
//                         quizList.selected = option;
//                         copyQuiz[index] = quizList;
//                         setQuizState([...copyQuiz]);
//                       }}
//                     >
//                       <div className="d-flex">
//                         <input
//                           className="form-check-input mx-3"
//                           type="radio"
//                           name={question.id}
//                           value={option}
//                           style={{ fontSize: "20px" }}
//                           checked={question.selected == option ? true : false}
//                           onChange={() => {
//                             const copyQuiz = quizData;
//                             const quizList = quizData[index];
//                             quizList.selected = option;
//                             copyQuiz[index] = quizList;
//                             setQuizState([...copyQuiz]);
//                           }}
//                         />
//                         <label className="form-check-label">{option}</label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}

//         <div
//           className="btn btn-primary btn-lg  mx-5 my-5"
//           style={{ width: "50%" }}
//         >
//           Submit
//         </div>
//       </div>

//       <section>
//         <div
//           {...getRootProps({ className: "dropzone" })}
//           className="container py-5"
//           style={{
//             borderStyle: "dotted",
//             cursor: "grab",
//             borderRadius: "15px",
//           }}
//         >
//           <input {...getInputProps()} />
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         </div>
//         <aside>
//           <h4>Files</h4>
//           <ul style={{ listStyleType: "none" }}>{files}</ul>
//         </aside>
//       </section>

//       <div
//         className="btn btn-primary btn-lg  mx-5 my-5"
//         style={{ width: "50%" }}
//       >
//         Upload Videos
//       </div>
//     </div>
//   );
// }

// export default App;
