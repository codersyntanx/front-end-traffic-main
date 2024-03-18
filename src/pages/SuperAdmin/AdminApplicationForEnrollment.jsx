import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Spinner } from "@chakra-ui/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  approveApplicationForEnrollment,
  fetchApplicationEnrollmentByEmail,
} from "../../services/Student";
import { useNavigate, useParams } from "react-router-dom";

const AdminApplicationForEnrollment = () => {
  const [update, setUpdate] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const user = useSelector((state) => state?.user);

  const [fetchedEnrollment, setEnrollment] = useState({
    _id: "63ac975e9b7f611e79343a0b",
    studentId: "63a9d854188ecb57b9ce9c62",
    name: "haseeb",
    address: "Ali Wahan",
    phoneNum: "+923103457606",
    dob: "2022-12-08",
    socialSociety: "12",
    email: "haseebabbasi00@gmail.com",
    EmergancyContactName: "Haseeb Ullah Abbasi",
    EmergancyPhone: "+923103457606",
    EmergancyRelation: "brother",
    EmergancyAddress: "Ali Wahan",
    EducationHighestGradeCompleted: "9",
    MotorVehicleLicense: "ABC-11",
    MotorLicenseState: "ABC-11",
    dateOfSign: "2022-12-28T19:22:06.243Z",
    applicantSign: "haseeb",
    createAt: "2022-12-28T19:10:49.783Z",
    status: "PENDING",
    __v: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyEnrollment() {
      setLoading(true);
      const data = await fetchApplicationEnrollmentByEmail(id);
      if (data?.success) {
        if (data?.enrollment[0]) {
          setEnrollment(data?.enrollment[0]);
        } else {
          MySwal.fire("User has not entered the data", "", "error");
          navigate(-1);
        }
      } else {
        MySwal.fire("User has not entered the data", "", "error");
        navigate(-1);
      }
      setLoading(false);
    }
    fetchMyEnrollment();
  }, [update]);

  return (
    <div className="">
      {loading === true ? (
        <div className="text-center my-5">
          <Spinner width={20} padding={20}></Spinner>
        </div>
      ) : (
        <>
          <div className="p-5 mx-5 d-none d-sm-block">
            <div
              className="main-box shadow-lg"
              style={{ borderRadius: "20px" }}
            >
              <h1 className="form-title">APPLICATION FOR ENROLLMENT</h1>
              <h5 className="form-subtitle-center">
                This application is a legal document; it must be printed in ink
                in your own handwriting.
              </h5>

              {/* <!-- Data Collection basic info --> */}
              <div className="item-row">
                <span className="key">Applicant's Name</span>
                <span className="value">{fetchedEnrollment?.name}</span>

                <span className="key">Adress</span>
                <span className="value">{fetchedEnrollment?.address}</span>

                <span className="key">Phone Number</span>
                <span className="value">{fetchedEnrollment?.phoneNum}</span>

                <span className="key">Date of Birth</span>
                <span className="value">{fetchedEnrollment?.dob}</span>

                <span className="key">Social Security Number</span>
                <span className="value">
                  {fetchedEnrollment?.socialSociety}
                </span>

                <span className="key">Email</span>
                <span className="value">{fetchedEnrollment?.email}</span>
              </div>

              {/* <!-- Emergency Info --> */}
              <section className="section-box">
                <h2 className="section-title -attention">EMERGENCY CONTACTS</h2>
                <div className="item-row">
                  <span className="key">Contact Name</span>
                  <span className="value">
                    {fetchedEnrollment.EmergancyContactName}
                  </span>

                  <span className="key">Phone</span>
                  <span className="value">
                    {fetchedEnrollment.EmergancyPhone}
                  </span>

                  <span className="key">Relationship</span>
                  <span className="value">
                    {fetchedEnrollment.EmergancyRelation}
                  </span>

                  <span className="key">Address/City/State</span>
                  <span className="value">
                    {fetchedEnrollment.EmergancyAddress}
                  </span>
                </div>
              </section>

              {/* <!-- Education info --> */}
              <section className="section-box">
                <h2 className="section-title">Education Info</h2>
                <span className="form-subtitle">
                  Information on the level of education. Indicate educational
                  institutions, level of education and data on the last place of
                  study
                </span>
                <div className="item-row">
                  <span className="key">Highest Grade Completed</span>
                  <span className="value">
                    {fetchedEnrollment.EducationHighestGradeCompleted}
                  </span>
                </div>
              </section>

              {/* <!-- License info --> */}
              <section className="section-box">
                <h2 className="section-title">MOTOR VEHICLE LICENSES HELD</h2>
                <div className="item-row">
                  <span className="key">License</span>
                  <span className="value">B61441391</span>

                  <span className="key">State</span>
                  <span className="value">VA</span>
                </div>
              </section>

              <footer className="mt-5" style={{ gap: 0 }}>
                <div className="date">
                  <span className="key">Date of signing</span>
                  {new Date(fetchedEnrollment?.dateOfSign)?.toDateString()}
                </div>
                <div className="signature">
                  <span className="key">Applicant signature</span>
                  <span className="value">
                    {fetchedEnrollment?.applicantSign}
                  </span>
                </div>

                <div className="checkedBy">
                  <span className="key">Checked By</span>
                  <span className="value">
                    {fetchedEnrollment?.checkedBySign || user?.userName}
                  </span>
                </div>
                <div className="signature">
                  <span className="key">Checker Signature</span>
                  <span className="value">
                    {fetchedEnrollment?.checkedBySign || user?.userName}
                  </span>
                </div>

                <div className="school-data">
                  <div className="school-title">United CDL Training School</div>
                  <div className="school-addr">
                    66 Waverley Dr, Ste 630, Frederick, MD, 21702, 301-888-6339
                  </div>
                  {/* {fetchedEnrollment?.checkedBy === undefined && (
                  <div className="d-flex ">
                    <Button
                      onClick={async () => {
                        const result = await approveApplicationForEnrollment(
                          user?.userName,
                          user?.id,
                          fetchedEnrollment?.email
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
          </div>
          <div className="p-2 d-block d-sm-none">
            <div
              className="main-box shadow-lg"
              style={{ borderRadius: "20px" }}
            >
              <h1 className="form-title">APPLICATION FOR ENROLLMENT</h1>
              <h5 className="form-subtitle-center">
                This application is a legal document; it must be printed in ink
                in your own handwriting.
              </h5>

              {/* <!-- Data Collection basic info --> */}
              <div className="item-row">
                <span className="key">Applicant's Name</span>
                <span className="value">{fetchedEnrollment?.name}</span>

                <span className="key">Adress</span>
                <span className="value">{fetchedEnrollment?.address}</span>

                <span className="key">Phone Number</span>
                <span className="value">{fetchedEnrollment?.phoneNum}</span>

                <span className="key">Date of Birth</span>
                <span className="value">{fetchedEnrollment?.dob}</span>

                <span className="key">Social Security Number</span>
                <span className="value">
                  {fetchedEnrollment?.socialSociety}
                </span>

                <span className="key">Email</span>
                <span className="value">{fetchedEnrollment?.email}</span>
              </div>

              {/* <!-- Emergency Info --> */}
              <section className="section-box">
                <h2 className="section-title -attention">EMERGENCY CONTACTS</h2>
                <div className="item-row">
                  <span className="key">Contact Name</span>
                  <span className="value">
                    {fetchedEnrollment.EmergancyContactName}
                  </span>

                  <span className="key">Phone</span>
                  <span className="value">
                    {fetchedEnrollment.EmergancyPhone}
                  </span>

                  <span className="key">Relationship</span>
                  <span className="value">
                    {fetchedEnrollment.EmergancyRelation}
                  </span>

                  <span className="key">Address/City/State</span>
                  <span className="value">
                    {fetchedEnrollment.EmergancyAddress}
                  </span>
                </div>
              </section>

              {/* <!-- Education info --> */}
              <section className="section-box">
                <h2 className="section-title">Education Info</h2>
                <span className="form-subtitle">
                  Information on the level of education. Indicate educational
                  institutions, level of education and data on the last place of
                  study
                </span>
                <div className="item-row">
                  <span className="key">Highest Grade Completed</span>
                  <span className="value">
                    {fetchedEnrollment.EducationHighestGradeCompleted}
                  </span>
                </div>
              </section>

              {/* <!-- License info --> */}
              <section className="section-box">
                <h2 className="section-title">MOTOR VEHICLE LICENSES HELD</h2>
                <div className="item-row">
                  <span className="key">License</span>
                  <span className="value">B61441391</span>

                  <span className="key">State</span>
                  <span className="value">VA</span>
                </div>
              </section>

              <footer style={{ gap: 0 }} className="mt-5">
                <div className="date">
                  <span className="key">Date of signing</span>
                  <span className="value">
                    {new Date(fetchedEnrollment?.dateOfSign)?.toDateString()}
                  </span>
                </div>
                <div className="signature">
                  <span className="key">Applicant signature</span>
                  <span className="value">
                    {fetchedEnrollment?.applicantSign}
                  </span>
                </div>

                <div className="checkedBy">
                  <span className="key">Checked By</span>
                  <span className="value">
                    {fetchedEnrollment?.checkedBySign || user?.userName}
                  </span>
                </div>
                <div className="signature">
                  <span className="key">Checker Signature</span>
                  <span className="value">
                    {fetchedEnrollment?.checkedBySign || user?.userName}
                  </span>
                </div>

                <div className="school-data">
                  <div className="school-title">United CDL Training School</div>
                  <div className="school-addr">
                    66 Waverley Dr, Ste 630, Frederick, MD, 21702, 301-888-6339
                  </div>
                  {/* {fetchedEnrollment?.checkedBy === undefined && (
                  <div className="d-flex ">
                    <Button
                      onClick={async () => {
                        const result = await approveApplicationForEnrollment(
                          user?.userName,
                          user?.id,
                          fetchedEnrollment?.email
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
          </div>
        </>
      )}
    </div>
  );
};
export default AdminApplicationForEnrollment;
