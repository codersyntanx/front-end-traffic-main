import { useState } from "react";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { Button, Input, Select } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import {
  approveDataCollection,
  fetchDataCollectionByStudentEmail,
} from "../../services/Student";

const DataCollectionFormSuperAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const user = useSelector((state) => state?.user);
  const [dataFetched, setDataFetched] = useState({
    _id: "63aa07af929ba3e442b15a4b",
    studentId: "63a9d854188ecb57b9ce9c62",
    name: "Haseeb Ullah Abbasi",
    address: "Ali Wahan",
    phoneNum: "+923103457606",
    dob: "2022-12-08",
    socialSociety: "12",
    email: "haseebabbasi00@gmail.com",
    race: "White/caucasian",
    gender: "Male",
    hispanicOrigin: "Yes",
    militaryVeteran: "Yes",
    disablePerson: "Yes",
    HighestGradeCompleted: "High School Graduate",
    dateOfSign: "Mon, 26 Dec 2022 20:42:28 GMT",
    applicantSign: "haseeb",
    createAt: "2022-12-26T20:44:16.128Z",
    status: "PENDING",
    checkedAt: "2022-12-26T20:44:16.128Z",
    checkedByName: "asodk",
    checkedBySign: "asodk",
    checkedBy: "id",
    __v: 0,
  });
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchDataCollection() {
      const data = await fetchDataCollectionByStudentEmail(id);
      if (data?.dataCollected?.length !== 0) {
        setDataFetched(data.dataCollected[0]);
      } else {
        MySwal.fire("User has not entered the data", "", "error");
        navigate(-1);
      }
      setLoading(false);
    }

    fetchDataCollection();
  }, [update]);

  return (
    <>
      {loading === true ? (
        <div className="text-center my-5">
          <Spinner width={20} padding={20}></Spinner>
        </div>
      ) : (
        <>
          <div className="p-5 mx-5 d-none d-sm-block">
            <div>
              {
                // This is For Certificate
                <div
                  className="main-box  shadow-lg"
                  style={{ borderRadius: "20px" }}
                >
                  <h1 className="form-title">
                    STUDENT DATA COLLECTION Certificate
                  </h1>
                  <h5 className="form-subtitle">
                    The Workforce Board requests the following information to be
                    provided by Applicant (RCW 28C.10.050). Providing your
                    social security number is voluntary. By law, the information
                    you provide on this form cannot be given out by any state
                    agency as public information. The Workforce Board will not
                    disclose data to anyone except authorized Workforce Board
                    employees or contractors working on specific research
                    activities, who follow strict confidentiality procedures.
                    This format follows the information required to be submitted
                    by the school as part of the annual student data report.
                  </h5>

                  <div className="item-row">
                    <span className="key">Applicant's Name</span>
                    <span className="value">{dataFetched?.name}</span>

                    <span className="key">Adress</span>
                    <span className="value">{dataFetched?.address}</span>

                    <span className="key">Phone Number</span>
                    <span className="value">{dataFetched?.phoneNum}</span>

                    <span className="key">Date of Birth</span>
                    <span className="value">{dataFetched?.dob}</span>

                    <span className="key">Social Security Number</span>
                    <span className="value">{dataFetched?.socialSociety}</span>

                    <span className="key">Email</span>
                    <span className="value">{dataFetched?.email}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Race</span>
                    <span className="value">{dataFetched?.race}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Are you Hispanic in origin?</span>
                    <span className="value">
                      {dataFetched?.hispanicOrigin === true ? "Yes" : "No"}
                    </span>
                  </div>
                  <span className="form-subtitle">
                    *Hispanic defined as a person of Mexican, Puerto Rican,
                    Cuban, Central or South American, or other Spanish culture
                    or origin, regardless of race.
                  </span>

                  <div className="item-row">
                    <span className="key">Are you disabled?</span>
                    <span className="value">
                      {dataFetched?.disablePerson === true ? "Yes" : "No"}
                    </span>
                  </div>
                  <span className="form-subtitle">
                    *Disability defined as a physical or mental impairment which
                    substantially limits one or more major life activities, such
                    as seeing, hearing, speaking, walking, learning, working,
                    etc.
                  </span>

                  <div className="item-row">
                    <span className="key">Are you a military veteran?</span>
                    <span className="value">
                      {dataFetched?.militaryVeteran === true ? "Yes" : "No"}
                    </span>
                  </div>
                  <span className="form-subtitle">
                    *Veteran defined as a student that served, in not currently
                    serving, on active duty in the U.S. Army, Navy, Air Force,
                    Marine Corps, or Coast Guard.
                  </span>

                  <div className="item-row">
                    <span className="key">Gender</span>
                    <span className="value">{dataFetched?.gender}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Highest grade completed</span>
                    <span className="value">
                      {dataFetched?.HighestGradeCompleted}
                    </span>
                  </div>

                  <footer className="mt-5" style={{ gap: 0 }}>
                    <div className="date">
                      <span className="key">Date of signing</span>
                      <span className="value">
                        {new Date(dataFetched?.dateOfSign)?.toDateString()}
                      </span>
                    </div>
                    <div className="signature">
                      <span className="key">Applicant signature</span>
                      <span className="value">
                        {dataFetched?.applicantSign}
                      </span>
                    </div>

                    <div className="checkedBy">
                      <span className="key">Checked By</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || user?.userName}
                      </span>
                    </div>
                    <div className="signature">
                      <span className="key">Checker Signature</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || user?.userName}
                      </span>
                    </div>

                    <div className="school-data">
                      <div className="school-title">
                        United CDL Training School
                      </div>
                      <div className="school-addr">
                        66 Waverley Dr, Ste 630, Frederick, MD, 21702,
                        301-888-6339
                      </div>
                      {/* {dataFetched?.checkedBy === undefined && (
                      <div className="d-flex ">
                        <Button
                          onClick={async () => {
                            const result = await approveDataCollection(
                              user?.userName,
                              user?.id,
                              dataFetched?.email
                            );

                            if (result.success) {
                              MySwal.fire(
                                "Form Approved Successfully",
                                "",
                                "success"
                              );
                              setUpdate(update + 1);
                            } else {
                              MySwal.fire("Form Approvind Error", "", "error");
                            }
                          }}
                          className="my-3 mx-2"
                        >
                          Sign
                        </Button>
                        <Button
                          onClick={() => {
                            alert("api has to be implemented");
                          }}
                          className="my-3 mx-2"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                     */}
                    </div>
                  </footer>
                </div>
              }
            </div>
          </div>
          <div className="p-2 d-block d-sm-none">
            <div>
              {
                // This is For Certificate
                <div
                  className="main-box shadow-lg"
                  style={{ borderRadius: "20px" }}
                >
                  <h1 className="form-title">
                    STUDENT DATA COLLECTION Certificate
                  </h1>
                  <h5 className="form-subtitle p-2">
                    The Workforce Board requests the following information to be
                    provided by Applicant (RCW 28C.10.050). Providing your
                    social security number is voluntary. By law, the information
                    you provide on this form cannot be given out by any state
                    agency as public information. The Workforce Board will not
                    disclose data to anyone except authorized Workforce Board
                    employees or contractors working on specific research
                    activities, who follow strict confidentiality procedures.
                    This format follows the information required to be submitted
                    by the school as part of the annual student data report.
                  </h5>

                  <div className="item-row">
                    <span className="key">Applicant's Name</span>
                    <span className="value">{dataFetched?.name}</span>

                    <span className="key">Adress</span>
                    <span className="value">{dataFetched?.address}</span>

                    <span className="key">Phone Number</span>
                    <span className="value">{dataFetched?.phoneNum}</span>

                    <span className="key">Date of Birth</span>
                    <span className="value">{dataFetched?.dob}</span>

                    <span className="key">Social Security Number</span>
                    <span className="value">{dataFetched?.socialSociety}</span>

                    <span className="key">Email</span>
                    <span className="value">{dataFetched?.email}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Race</span>
                    <span className="value">{dataFetched?.race}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Are you Hispanic in origin?</span>
                    <span className="value">
                      {dataFetched?.hispanicOrigin === true ? "Yes" : "No"}
                    </span>
                  </div>
                  <span className="form-subtitle">
                    *Hispanic defined as a person of Mexican, Puerto Rican,
                    Cuban, Central or South American, or other Spanish culture
                    or origin, regardless of race.
                  </span>

                  <div className="item-row">
                    <span className="key">Are you disabled?</span>
                    <span className="value">
                      {dataFetched?.disablePerson === true ? "Yes" : "No"}
                    </span>
                  </div>
                  <span className="form-subtitle">
                    *Disability defined as a physical or mental impairment which
                    substantially limits one or more major life activities, such
                    as seeing, hearing, speaking, walking, learning, working,
                    etc.
                  </span>

                  <div className="item-row">
                    <span className="key">Are you a military veteran?</span>
                    <span className="value">
                      {dataFetched?.militaryVeteran === true ? "Yes" : "No"}
                    </span>
                  </div>
                  <span className="form-subtitle">
                    *Veteran defined as a student that served, in not currently
                    serving, on active duty in the U.S. Army, Navy, Air Force,
                    Marine Corps, or Coast Guard.
                  </span>

                  <div className="item-row">
                    <span className="key">Gender</span>
                    <span className="value">{dataFetched?.gender}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Highest grade completed</span>
                    <span className="value">
                      {dataFetched?.HighestGradeCompleted}
                    </span>
                  </div>

                  <footer style={{ gap: 0 }} className="mt-5">
                    <div className="date">
                      <span className="key">Date of signing</span>
                      <span className="value">
                        {new Date(dataFetched?.dateOfSign)?.toDateString()}
                      </span>
                    </div>

                    <div className="signature">
                      <span className="key">Applicant signature</span>
                      <span className="value">
                        {dataFetched?.applicantSign}
                      </span>
                    </div>

                    <div className="checkedBy">
                      <span className="key">Checked By</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || user?.userName}
                      </span>
                    </div>
                    <div className="signature">
                      <span className="key">Checker Signature</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || user?.userName}
                      </span>
                    </div>

                    <div className="school-data">
                      <div className="school-title">
                        United CDL Training School
                      </div>
                      <div className="school-addr">
                        66 Waverley Dr, Ste 630, Frederick, MD, 21702,
                        301-888-6339
                      </div>
                      {/* {dataFetched?.checkedBy === undefined && (
                      <div className="d-flex ">
                        <Button
                          onClick={async () => {
                            const result = await approveDataCollection(
                              user?.userName,
                              user?.id,
                              dataFetched?.email
                            );

                            if (result.success) {
                              MySwal.fire(
                                "Form Approved Successfully",
                                "",
                                "success"
                              );
                              setUpdate(update + 1);
                            } else {
                              MySwal.fire("Form Approvind Error", "", "error");
                            }
                          }}
                          className="my-3 mx-2"
                        >
                          Sign
                        </Button>
                        <Button
                          onClick={() => {
                            alert("api has to be implemented");
                          }}
                          className="my-3 mx-2"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                     */}
                    </div>
                  </footer>
                </div>
              }
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default DataCollectionFormSuperAdmin;
