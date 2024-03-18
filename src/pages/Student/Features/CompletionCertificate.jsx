import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  StudentFormById,
  fetchBasicDataByEmail,
  getMyResults,
  getStudentById,
} from "../../../services/Student";
import ReactToPrint from "react-to-print";
import { Button, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

class PDFCertificate extends Component {
  render() {
    return (
      <>
        <>
          <div className="main-box main-box-certificate">
            <div className="border-pattern">
              <section className="content">
                <header>
                  <div
                    className="d-flex justify-content-around mb-3"
                    style={{ color: "silver", fontWeight: "bold" }}
                  >
                    <span className="school">UNITED CDL TRAINING SCHOOL</span>
                    <span className="corp-rights">CDL © ELDT</span>
                  </div>
                  <p
                    className=" text-center"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    Certificate of Completion
                  </p>
                  <p
                    className="student-name text-center p-2 text-uppercase"
                    style={{ fontWeight: "800", fontSize: "50px" }}
                  >
                    {this.props?.name}
                  </p>
                  <p className="text text-center p-1 pb-3">
                    Has completed the online training course and tests
                  </p>
                  <div className="mx-5">
                    <p
                      className="text-high text-center mx-5"
                      style={{
                        color: "white",
                        background: "black",
                        borderRadius: "30px",
                        padding: "10px ",
                        fontSize: "20px",
                      }}
                    >
                      And gained an average progress of{" "}
                      <span className="student-rate">
                        {this.props.percentage}%
                      </span>
                    </p>
                  </div>
                  <p
                    className="text-dim text-center"
                    style={{ color: "silver" }}
                  >
                    Training period from{" "}
                    {this.props?.createAt && this.props?.createAt} to{" "}
                    {this.props?.completedAt && this.props?.completedAt}
                  </p>
                </header>

                <div className="sides-box d-flex justify-content-around">
                  <div className="left">
                    <div className="school-title certificate-data">
                      UNITED CDL TRAINING SCHOOL
                    </div>
                    <hr className="custom_line" />
                    <div className="certificate-label-footer">
                      CDL School, hereinafter referred to as 'SCHOOL'
                    </div>

                    <div className="school-addr certificate-data">
                      66 Waverley Dr, Ste 630
                    </div>
                    <hr className="custom_line" />

                    <div className="certificate-label-footer">Address</div>

                    <div className="school-city-state certificate-data">
                      Frederick, MD 21702
                    </div>
                    <hr className="custom_line" />

                    <div className="certificate-label-footer">
                      City, State, ZIP
                    </div>

                    <div className="school-rep-sign">
                      <strong className="custom-signature">
                        {this.props.adminName}
                      </strong>
                      <span style={{ margin: "10px" }}>
                        {this.props?.completedAt && this.props?.completedAt}
                      </span>
                    </div>
                    <hr className="custom_line" />

                    <div className="certificate-label-footer">
                      School Representative Signature,
                    </div>
                  </div>
                  <div className="right">
                    <div className="custom-signature">
                      <strong>{this.props?.name}</strong>
                    </div>
                    <hr className="custom_line" />

                    <div className="certificate-label-footer">Student Name</div>

                    <div className="date-of-completion">
                      {this.props?.completedAt}
                    </div>
                    <hr className="custom_line" />

                    <div className="certificate-label-footer">
                      Date of Completion
                    </div>
                  </div>
                </div>

                <footer className="notification text-center p-3">
                  It is the responsibility of the SCHOOL and the SCHOOL's
                  managers to determine and verify a student's competency.
                  Course completion certificates do not state or imply
                  competency in any given subject, only that the student
                  completed the online training.
                </footer>
              </section>
            </div>
          </div>
        </>
      </>
    );
  }
}
PDFCertificate.defaultProps = {
  _id: "63c6ac71c019a4ca5042a83d",
  name: "haseebabbasi",
  email: "haseebabbasi00@gmail.com",
  completed: true,
  verified: true,
  issuedBy: "Mirza Arslan",
  completedAt: "2023-02-09T22:26:33.948Z",
  address: "Sukkur,Pakistan",
};
class PrintingComponentCertificate extends Component {
  render() {
    return (
      <div className="">
        <PDFCertificate
          percentage={this.props.percentage * 100}
          name={this.props.name}
          completedAt={this.props.completedAt}
          createAt={this.props?.createAt}
          adminName={this.props.adminName}
          // data={this.props?.collectedData}
          ref={(el) => (this.componentRef = el)}
        />
        <div className="text-center p-5">
          <ReactToPrint
            trigger={() => (
              <a>{<Button className="text-center">Print</Button>}</a>
            )}
            content={() => this.componentRef}
          />
        </div>
      </div>
    );
  }
}

const CompletionCertificate = () => {
  const user = useSelector((state) => state.user);
  const { studentId } = useParams();
  // const [studentData, setStudentData] = useState({
  //   _id: "63c6ac71c019a4ca5042a83d",
  //   name: "haseebabbasi",
  //   profile: "https://united-cdl-school.s3.amazonaws.com/assets/avatar.jpg",
  //   email: "haseebabbasi00@gmail.com",
  //   completed: true,
  //   verified: true,
  //   active: true,
  //   blocked: false,
  //   docsUploaded: true,
  //   docs: [
  //     {
  //       fileName: "file-sample_2-Wed, 08 Feb 2023 19:14:09 GMT.docx",
  //       url: "https://united-cdl-school.s3.us-east-1.amazonaws.com/Documents/file-sample_2-Wed%2C%2008%20Feb%202023%2019%3A14%3A09%20GMT.docx",
  //     },
  //     {
  //       fileName: "file-sample_3-Wed, 08 Feb 2023 19:14:12 GMT.docx",
  //       url: "https://united-cdl-school.s3.us-east-1.amazonaws.com/Documents/file-sample_3-Wed%2C%2008%20Feb%202023%2019%3A14%3A12%20GMT.docx",
  //     },
  //   ],
  //   createAt: "2023-01-17T14:09:57.105Z",
  //   isAgreement: true,
  //   isDataCollected: true,
  //   isEnrolled: true,
  //   isStudent: true,
  //   completedAt: "2023-02-09T22:26:33.948Z",
  // });y
  const navigate = useNavigate();

  const [myData, setMyData] = useState();
  const [myInfo, setInfo] = useState();
  const [admin, setAdmin] = useState();
  useEffect(() => {
    async function getMyResult() {
      const data = await getMyResults(studentId);
      if (data?.success) {
        // console.log(data?.studentResults);
        setMyData(data?.studentResults);
      }
    }
    getMyResult();
    const fetchStudentData = async () => {
      const data = await getStudentById(studentId);
      const newData = await StudentFormById(studentId);
      setInfo(data?.user);
      if (data?.user?.isStudent === false) {
        navigate("/student/dashboard");
      }
      setAdmin(newData?.forms[0]?.checkedBySign || "Mirza Arslan");
      setLoading(false);
    };
    fetchStudentData();
  }, []);
  const [loading, setLoading] = useState(true);
  return (
    <>
      {JSON.stringify()}
      {loading === true ? (
        <>
          <div className="text-center my-5">
            <Spinner width={20} padding={20}></Spinner>
          </div>
        </>
      ) : (
        <PrintingComponentCertificate
          name={myInfo?.name}
          completedAt={
            `${(new Date(myInfo?.completedAt).getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${new Date(myInfo?.completedAt)
              .getDate()
              .toString()
              .padStart(2, "0")}-${new Date(myInfo?.completedAt).getFullYear()}`

            //
          }
          percentage={myData?.overAllPercentage?.toFixed(2)}
          createAt={
            `${(new Date(myInfo?.createAt).getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${new Date(myInfo?.createAt)
              .getDate()
              .toString()
              .padStart(2, "0")}-${new Date(myInfo?.createAt).getFullYear()}`

            //
          }
          adminName={admin}
        />
      )}
    </>
  );
};
export default CompletionCertificate;
// added changes
