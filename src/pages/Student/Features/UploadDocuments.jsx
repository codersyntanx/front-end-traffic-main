// import { useEffect } from "react";
// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { useSelector } from "react-redux";
// import { SERVER_URL } from "../../../constant/constants";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import Navbar from "../../../components/Navbar";
// import { getStudentById } from "../../../services/Student";
// import { Button, Spinner } from "@chakra-ui/react";

// const UploadDocuments = () => {
//   const MySwal = withReactContent(Swal);
//   const user = useSelector((state) => state.user);
//   const [docsUploaded, setDocsUploaded] = useState(0);
//   // const [files, setFiles] = useState([]);
//   const [fileList, setFileList] = useState(null);

//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       setFileList(e.target.files);
//     }
//   };
//   const [studentData, setStudentData] = useState();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchStudentById() {
//       setLoading(true);
//       const data = await getStudentById(user?.id);
//       if (data?.success) {
//         setStudentData(data?.user);
//         setLoading(false);
//       } else {
//         setLoading(false);

//         setStudentData(undefined);
//       }
//     }
//     fetchStudentById();
//   }, []);
//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
//   const data = [...acceptedFiles];
//   const currentUser = {
//     studetId: "123123",
//     studetData: "",
//   };
//   useEffect(() => {}, []);
//   const files = fileList ? [...fileList] : [];

//   return (
//     <div style={{ minHeight: "100vh" }}>
//       <div className="container">
//         <div className="documents mt-1">
//           <div className="d-flex flex-wrap justify-content-around py-5">
//             {studentData?.docsUploaded === false && (
//               <div className="display-6 text-center">
//                 {" "}
//                 You have Not Uploaded Docs Yet
//               </div>
//             )}
//             {studentData?.docs?.map((file, index) => (
//               <div
//                 key={index}
//                 className="card text-center "
//                 style={{ width: "200px" }}
//               >
//                 <div className="card-body" style={{ fontSize: "50px" }}>
//                   📃
//                 </div>
//                 <div className="card-footer">{file.fileName}</div>
//                 <Button
//                   className="heading_hover"
//                   onClick={() => window.open(file?.url, "_blank")}
//                   colorScheme={"blue"}
//                 >
//                   Download
//                 </Button>
//               </div>
//             ))}
//             {studentData?.docsUploaded === true && (
//               <div> You can re-Upload Docs</div>
//             )}
//           </div>

//           <section className="col-lg-10 col-md-10 offset-lg-1 offset-md-1 col-sm-12">
//             <div>
//               <div className="checkboxes mb-5 d-inline ">
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value="Valid Driver License"
//                     id="validDriverLicense"
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setDocsUploaded(docsUploaded + 1);
//                       } else {
//                         setDocsUploaded(docsUploaded - 1);
//                       }
//                     }}
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor="validDriverLicense"
//                   >
//                     Valid Driver License
//                   </label>
//                 </div>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value="Copy Of Commercial License"
//                     id="CopyCommercialLicense"
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setDocsUploaded(docsUploaded + 1);
//                       } else {
//                         setDocsUploaded(docsUploaded - 1);
//                       }
//                     }}
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor="CopyCommercialLicense"
//                   >
//                     Copy Of Commercial License
//                   </label>
//                 </div>

//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value="Social Security Card"
//                     id="socialSecurityCard"
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setDocsUploaded(docsUploaded + 1);
//                       } else {
//                         setDocsUploaded(docsUploaded - 1);
//                       }
//                     }}
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor="socialSecurityCard"
//                   >
//                     Social Security Card
//                   </label>
//                 </div>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value="Valid Passport"
//                     id="validPassport"
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setDocsUploaded(docsUploaded + 1);
//                       } else {
//                         setDocsUploaded(docsUploaded - 1);
//                       }
//                     }}
//                   />
//                   <label className="form-check-label" htmlFor="validPassport">
//                     Valid Passport
//                   </label>
//                 </div>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value="Medical Card"
//                     id="medicalCard"
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setDocsUploaded(docsUploaded + 1);
//                       } else {
//                         setDocsUploaded(docsUploaded - 1);
//                       }
//                     }}
//                   />
//                   <label className="form-check-label" htmlFor="medicalCard">
//                     Medical Card
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="d-flex flex-wrap justify-content-around py-5">
//               <h4>Files</h4>
//               {files.map((fileItem, index) => (
//                 <div
//                   key={index}
//                   className="card text-center my-2"
//                   style={{ width: "200px" }}
//                 >
//                   <div className="card-body" style={{ fontSize: "50px" }}>
//                     📃
//                   </div>
//                   <div className="card-footer"> {fileItem?.name}</div>
//                 </div>
//               ))}
//             </div>
//             {loading === true && (
//               <div className="text-center my-5">
//                 <Spinner width={20} padding={20}></Spinner>
//               </div>
//             )}
//             <div className="row">
//               <div className="text-center">
//                 <div className="display-6 my-3">or upload manually &nbsp;</div>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleFileChange}
//                   className="form-control"
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="text-center">
//                 <button
//                   onClick={async () => {
//                     if (!files) {
//                       MySwal.fire(
//                         "No Files Uploaded",
//                         "please upload the files"
//                       );
//                       return;

//                       return;
//                     }
//                     if (files.length == 0) {
//                       MySwal.fire(
//                         "No Files Uploaded",
//                         "please upload the files"
//                       );
//                       return;
//                     }
//                     if (docsUploaded !== files.length) {
//                       MySwal.fire(
//                         "Checkbox checked and Docs Attached are not Equal",
//                         "Please Check The Same Number of Docs Upload"
//                       );
//                       return;
//                     }
//                     setLoading(true);
//                     // 👇 Create new FormData object and append files
//                     const data = new FormData();
//                     data.append("id", user?.id);
//                     files.forEach((file, i) => {
//                       data.append(`file-${i}`, file, file.name);
//                     });

//                     // 👇 Uploading the files using the fetch API to the server
//                     fetch(`${SERVER_URL}/uploadDocs`, {
//                       method: "POST",
//                       body: data,
//                     })
//                       .then((res) => res.json())
//                       .then((data) => {
//                         if (data?.success) {
//                           setLoading(false);

//                           MySwal.fire(
//                             "Docs Uploaded",
//                             `Documents has been Updated`,
//                             "success"
//                           );
//                         }
//                       })
//                       .catch((err) => {
//                         MySwal.fire(
//                           "Docs Uploadeding Error",
//                           `${JSON.stringify(err)}`,
//                           "error"
//                         );
//                         setLoading(false);
//                       });
//                   }}
//                   className="btn btn-primary btn-lg   my-5"
//                 >
//                   Upload Documents
//                 </button>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadDocuments;
