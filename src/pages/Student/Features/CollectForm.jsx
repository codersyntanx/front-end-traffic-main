import { useState } from "react";
import { useSelector } from "react-redux";
import { StudentFormById, createFormData } from "../../../services/Student";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { Button, Input, Select, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CollectForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const user = useSelector((state) => state?.user);
  const [dataFetched, setDataFetched] = useState({});
  useEffect(() => {
    setLoading(true);
    async function fetchDataCollection() {
      const data = await StudentFormById(user?.id);
      if (data?.forms?.length !== 0) {
        // console.log(data?.forms);
        setDataFetched(data.forms[0]);
        // setDataFetched(false);
      } else {
        setDataFetched(false);
      }
      setLoading(false);
    }

    fetchDataCollection();
  }, []);
  const [collectedData, setCollectedData] = useState({
    userId: user?.id,
    name: user?.userName,
    address: "",
    phoneNumber: "",
    dob: "",
    socialSociety: "",
    email: user?.email,
    gender: "",
    dateOfSign: new Date().toDateString(),
    applicantSign: user?.userName,
    transmission: "",
  });

  const data = false;
  return (
    <div className="form-container">
      {loading === true ? (
        <div className="text-center my-5">
          <Spinner width={20} padding={20}></Spinner>
        </div>
      ) : (
        <div>
          {dataFetched !== false ? (
            <>
              <div className="p-5 mx-5 d-none d-sm-block">
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
                    <span className="value">{dataFetched?.phoneNumber}</span>

                    <span className="key">Date of Birth</span>
                    <span className="value">
                      {new Date(dataFetched?.dob).toDateString()}
                    </span>

                    <span className="key">Social Security Number</span>
                    <span className="value">{dataFetched?.socialSecurity}</span>

                    <span className="key">Email</span>
                    <span className="value">{dataFetched?.email}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Gender</span>
                    <span className="value">{dataFetched?.gender}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Transmission</span>
                    <span className="value">{dataFetched?.transmission}</span>
                  </div>

                  <footer className="mt-5" style={{ gap: 0 }}>
                    <div className="date">
                      <span className="key">Date of signing</span>
                      <span className="value">
                        {new Date(dataFetched?.createdAt).toDateString()}
                      </span>
                    </div>
                    <div className="signature">
                      <span className="key">Applicant signature</span>
                      <span className="value">{dataFetched?.name}</span>
                    </div>

                    <div className="checkedBy">
                      <span className="key">Checked By</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || "NA"}
                      </span>
                    </div>
                    <div className="signature">
                      <span className="key">Checker Signature</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || ""}
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
                    </div>
                  </footer>
                </div>
              </div>
              <div className="d-block d-sm-none">
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
                    <span className="value">{dataFetched?.phoneNumber}</span>

                    <span className="key">Date of Birth</span>
                    <span className="value">
                      {new Date(dataFetched?.dob).toDateString()}
                    </span>

                    <span className="key">Social Security Number</span>
                    <span className="value">{dataFetched?.socialSecurity}</span>

                    <span className="key">Email</span>
                    <span className="value">{dataFetched?.email}</span>
                  </div>
                  <div className="item-row">
                    <span className="key">Gender</span>
                    <span className="value">{dataFetched?.gender}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Transmission</span>
                    <span className="value">{dataFetched?.transmission}</span>
                  </div>

                  <footer className="mt-5" style={{ gap: 0 }}>
                    <div className="date">
                      <span className="key">Date of signing</span>
                      <span className="value">
                        {new Date(dataFetched?.createdAt).toDateString()}
                      </span>
                    </div>
                    <div className="signature">
                      <span className="key">Applicant signature</span>
                      <span className="value">{dataFetched?.name}</span>
                    </div>

                    <div className="checkedBy">
                      <span className="key">Checked By</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || "NA"}
                      </span>
                    </div>
                    <div className="signature">
                      <span className="key">Checker Signature</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || ""}
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
                    </div>
                  </footer>
                </div>
              </div>
              <div className="d-block d-sm-none">
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
                    <span className="value">{dataFetched?.phon}</span>

                    <span className="key">Date of Birth</span>
                    <span className="value">
                      {new Date(dataFetched?.dob).toDateString()}
                    </span>

                    <span className="key">Social Security Number</span>
                    <span className="value">{dataFetched?.socialSociety}</span>

                    <span className="key">Email</span>
                    <span className="value">{dataFetched?.email}</span>
                  </div>

                  <div className="item-row">
                    <span className="key">Gender</span>
                    <span className="value">{dataFetched?.gender}</span>
                  </div>

                  <footer className="mt-5" style={{ gap: 0 }}>
                    <div className="date">
                      <span className="key">Date of signing</span>
                      <span className="value">{dataFetched?.dateOfSign}</span>
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
                        {dataFetched?.checkedBySign || "NA"}
                      </span>
                    </div>
                    <div className="signature">
                      <span className="key">Checker Signature</span>
                      <span className="value">
                        {dataFetched?.checkedBySign || "NA"}
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
                    </div>
                  </footer>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-5 mx-5 d-none d-sm-block">
                <div
                  className="main-box shadow-lg"
                  style={{ borderRadius: "20px" }}
                >
                  <h1 className="form-title">Main Data Form</h1>
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
                    <Input
                      name="name"
                      placeholder="Name"
                      value={collectedData.name}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          name: e.target.value,
                        })
                      }
                    />

                    <span className="key">Adress</span>
                    <Input
                      name="address"
                      placeholder="Address"
                      value={collectedData.address}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          address: e.target.value,
                        })
                      }
                    />
                    <span className="key">Phone Number</span>
                    <Input
                      name="phone-no"
                      placeholder="Phone Number"
                      value={collectedData.phoneNumber}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                    <span className="key">Date of Birth</span>

                    <Input
                      name="dob"
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      value={collectedData.dob}
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          dob: e.target.value,
                        })
                      }
                    />

                    <span className="key">Social Security Number</span>
                    <Input
                      name="securityNo"
                      placeholder="Security Number"
                      value={collectedData.socialSociety}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          socialSociety: e.target.value,
                        })
                      }
                    />

                    <span className="key">Email</span>
                    <Input
                      name="email"
                      type={"email"}
                      placeholder="Security Number"
                      value={collectedData?.email}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          email: e.target.value,
                        })
                      }
                      disabled={true}
                    />
                  </div>
                  <div className="item-row">
                    <span className="key">Transmission type</span>
                    <select
                      value={collectedData?.race}
                      className="form-select"
                      aria-label="Transmission"
                      onChange={(e) => {
                        setCollectedData({
                          ...collectedData,
                          transmission: e.target.value,
                        });
                      }}
                    >
                      <option className="form-control" defaultValue>
                        Select the Program
                      </option>
                      <option
                        className="form-control"
                        value="Manual Transmission"
                      >
                        Manual Transmission
                      </option>
                      <option
                        className="form-control"
                        value="Automatic Transmission"
                      >
                        Automatic Transmission
                      </option>
                    </select>
                  </div>

                  <div className="item-row">
                    <span className="key">Gender</span>
                    <Select
                      name="gender"
                      value={collectedData.gender}
                      className="form-select"
                      aria-label="Disabled"
                      onChange={(e) => {
                        setCollectedData({
                          ...collectedData,
                          gender: e.target.value,
                        });
                      }}
                    >
                      <option defaultValue>Select the Option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                  </div>

                  <footer style={{ gap: 0 }}>
                    <div className="date">
                      <span className="key">Date of signing</span>
                      <span className="value">{new Date().toDateString()}</span>
                    </div>
                    <div className="signature">
                      <span className="key">Applicant signature</span>
                      <span className="value">
                        {collectedData.applicantSign}
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
                    </div>
                  </footer>

                  <Button
                    colorScheme={"blue"}
                    onClick={async () => {
                      let checkData = true;
                      Object.keys(collectedData).forEach((key) => {
                        if (
                          collectedData[key] == "" ||
                          collectedData[key] == undefined
                        ) {
                          checkData = false;
                        }
                      });
                      if (checkData) {
                        const result = await createFormData({
                          studentId: user.id,
                          name: collectedData.name,
                          address: collectedData.address,
                          phoneNum: collectedData.phoneNumber,
                          dob: collectedData.dob,
                          socialSociety: collectedData.socialSociety,
                          email: collectedData.email,
                          gender: collectedData.gender,
                          dateOfSign: collectedData.dateOfSign,
                          applicantSign: collectedData.applicantSign,
                          transmission: collectedData.transmission,
                        });

                        if (result.success == true) {
                          MySwal.fire(
                            "Data Collected is Sent to Admin For Approval",
                            "",
                            "success"
                          );
                          navigate(-1);
                        } else {
                          MySwal.fire(
                            "Error In Data Collection",
                            `${result.data.message}`,
                            "question"
                          );
                          // navigate(-1);
                        }
                      } else {
                        alert("please fill all the data");
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <div className="d-block d-sm-none">
                <div
                  className="main-box shadow-lg"
                  style={{ borderRadius: "20px" }}
                >
                  <h1 className="form-title">Main Data Form</h1>
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
                    <Input
                      name="name"
                      placeholder="Name"
                      value={collectedData.name}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          name: e.target.value,
                        })
                      }
                    />

                    <span className="key">Adress</span>
                    <Input
                      name="address"
                      placeholder="Address"
                      value={collectedData.address}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          address: e.target.value,
                        })
                      }
                    />
                    <span className="key">Phone Number</span>
                    <Input
                      name="phone-no"
                      placeholder="Phone Number"
                      value={collectedData.phoneNumber}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                    <span className="key">Date of Birth</span>

                    <Input
                      name="dob"
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      value={collectedData.dob}
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          dob: e.target.value,
                        })
                      }
                    />

                    <span className="key">Social Security Number</span>
                    <Input
                      name="securityNo"
                      placeholder="Security Number"
                      value={collectedData.socialSociety}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          socialSociety: e.target.value,
                        })
                      }
                    />

                    <span className="key">Email</span>
                    <Input
                      name="email"
                      type={"email"}
                      placeholder="Security Number"
                      value={collectedData?.email}
                      className="form-control"
                      onChange={(e) =>
                        setCollectedData({
                          ...collectedData,
                          email: e.target.value,
                        })
                      }
                      disabled={true}
                    />
                  </div>

                  <div className="item-row">
                    <span className="key">Gender</span>
                    <Select
                      name="gender"
                      value={collectedData.gender}
                      className="form-select"
                      aria-label="Disabled"
                      onChange={(e) => {
                        setCollectedData({
                          ...collectedData,
                          gender: e.target.value,
                        });
                      }}
                    >
                      <option defaultValue>Select the Option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                  </div>
                  <div className="item-row">
                    <span className="key">Transmission type</span>
                    <select
                      value={collectedData?.race}
                      className="form-select"
                      aria-label="Transmission"
                      onChange={(e) => {
                        setCollectedData({
                          ...collectedData,
                          transmission: e.target.value,
                        });
                      }}
                    >
                      <option className="form-control" defaultValue>
                        Select the Program
                      </option>
                      <option
                        className="form-control"
                        value="Manual Transmission"
                      >
                        Manual Transmission
                      </option>
                      <option
                        className="form-control"
                        value="Automatic Transmission"
                      >
                        Automatic Transmission
                      </option>
                    </select>
                  </div>

                  <footer style={{ gap: 0 }}>
                    <div className="date">
                      <span className="key">Date of signing</span>
                      <span className="value">{collectedData.dateOfSign}</span>
                    </div>
                    <div className="signature">
                      <span className="key">Applicant signature</span>
                      <span className="value">
                        {collectedData.applicantSign}
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
                    </div>
                  </footer>

                  <Button
                    colorScheme={"blue"}
                    onClick={async () => {
                      let checkData = true;
                      Object.keys(collectedData).forEach((key) => {
                        if (
                          collectedData[key] == "" ||
                          collectedData[key] == undefined
                        ) {
                          alert(key);
                          checkData = false;
                        }
                      });
                      if (checkData) {
                        const result = await createFormData({
                          studentId: user.id,
                          name: collectedData.name,
                          address: collectedData.address,
                          phoneNum: collectedData.phoneNumber,
                          dob: collectedData.dob,
                          socialSociety: collectedData.socialSociety,
                          email: collectedData.email,
                          gender: collectedData.gender,
                          dateOfSign: collectedData.dateOfSign,
                          applicantSign: collectedData.applicantSign,
                          transmission: collectedData.transmission,
                        });

                        if (result.success == true) {
                          MySwal.fire(
                            "Data Collected is Sent to Admin For Approval",
                            "",
                            "success"
                          );
                          navigate(-1);
                        } else {
                          MySwal.fire(
                            "Error In Data Collection",
                            `${result.data.message}`,
                            "question"
                          );
                          navigate(-1);
                        }
                      } else {
                        alert("please fill all the data");
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default CollectForm;
