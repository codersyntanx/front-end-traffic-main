import { useState } from "react";
import { useSelector } from "react-redux";
import {
  createDataCollectionForm,
  fetchDataCollectionByStudentEmail,
} from "../../../services/Student";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { Button, Input, Select, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DataCollectionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    setLoading(true);
    async function fetchDataCollection() {
      const data = await fetchDataCollectionByStudentEmail(user?.id);
      if (data?.dataCollected?.length !== 0) {
        setDataFetched(data.dataCollected[0]);
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
    phoneNum: "",
    dob: "",
    socialSociety: "",
    email: user?.email,
    race: "",
    hispanicOrigin: false,
    disablePerson: false,
    militaryVeteran: false,
    gender: "",
    HighestGradeCompleted: "",
    dateOfSign: new Date().toUTCString(),
    applicantSign: user?.userName,
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
                provided by Applicant (RCW 28C.10.050). Providing your social
                security number is voluntary. By law, the information you
                provide on this form cannot be given out by any state agency as
                public information. The Workforce Board will not disclose data
                to anyone except authorized Workforce Board employees or
                contractors working on specific research activities, who follow
                strict confidentiality procedures. This format follows the
                information required to be submitted by the school as part of
                the annual student data report.
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
                *Hispanic defined as a person of Mexican, Puerto Rican, Cuban,
                Central or South American, or other Spanish culture or origin,
                regardless of race.
              </span>

              <div className="item-row">
                <span className="key">Are you disabled?</span>
                <span className="value">
                  {dataFetched?.disablePerson === true ? "Yes" : "No"}
                </span>
              </div>
              <span className="form-subtitle">
                *Disability defined as a physical or mental impairment which
                substantially limits one or more major life activities, such as
                seeing, hearing, speaking, walking, learning, working, etc.
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
                  <span className="value">{dataFetched?.dateOfSign}</span>
                </div>
                <div className="signature">
                  <span className="key">Applicant signature</span>
                  <span className="value">{dataFetched?.applicantSign}</span>
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
                  <div className="school-title">United CDL Training School</div>
                  <div className="school-addr">
                    66 Waverley Dr, Ste 630, Frederick, MD, 21702, 301-888-6339
                  </div>
                </div>
              </footer>
            </div>
          ) : (
            // This is For Data Collection

            <div
              className="main-box shadow-lg"
              style={{ borderRadius: "20px" }}
            >
              <h1 className="form-title">STUDENT DATA COLLECTION FORM</h1>
              <h5 className="form-subtitle p-2">
                The Workforce Board requests the following information to be
                provided by Applicant (RCW 28C.10.050). Providing your social
                security number is voluntary. By law, the information you
                provide on this form cannot be given out by any state agency as
                public information. The Workforce Board will not disclose data
                to anyone except authorized Workforce Board employees or
                contractors working on specific research activities, who follow
                strict confidentiality procedures. This format follows the
                information required to be submitted by the school as part of
                the annual student data report.
              </h5>

              <div className="item-row">
                <span className="key">Applicant's Name</span>
                <Input
                  name="name"
                  placeholder="Name"
                  value={collectedData.name}
                  className="form-control"
                  onChange={(e) =>
                    setCollectedData({ ...collectedData, name: e.target.value })
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
                  value={collectedData.phoneNum}
                  className="form-control"
                  onChange={(e) =>
                    setCollectedData({
                      ...collectedData,
                      phoneNum: e.target.value,
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
                    setCollectedData({ ...collectedData, dob: e.target.value })
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
                />
              </div>

              <div className="item-row">
                <span className="key">Race</span>
                <Select
                  name="race"
                  value={collectedData.race}
                  className="form-select"
                  aria-label="Race"
                  onChange={(e) => {
                    setCollectedData({
                      ...collectedData,
                      race: e.target.value,
                    });
                  }}
                >
                  <option defaultValue>Select the Race</option>
                  <option value="White/caucasian">White/caucasian</option>
                  <option value="Gray/caucasian">Gray/caucasian</option>
                  <option value="Black/caucasian">Black/caucasian</option>
                </Select>
              </div>

              <div className="item-row">
                <span className="key">Are you Hispanic in origin?</span>
                <Select
                  name="origin"
                  value={collectedData.hispanicOrigin}
                  className="form-select"
                  aria-label="Hispanic Origin"
                  onChange={(e) => {
                    setCollectedData({
                      ...collectedData,
                      hispanicOrigin: e.target.value,
                    });
                  }}
                >
                  <option defaultValue>Select the Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </div>
              <span className="form-subtitle">
                *Hispanic defined as a person of Mexican, Puerto Rican, Cuban,
                Central or South American, or other Spanish culture or origin,
                regardless of race.
              </span>

              <div className="item-row">
                <span className="key">Are you disabled?</span>
                <Select
                  name="disabled"
                  value={collectedData.disablePerson}
                  className="form-select"
                  aria-label="Disabled"
                  onChange={(e) => {
                    setCollectedData({
                      ...collectedData,
                      disablePerson: e.target.value,
                    });
                  }}
                >
                  <option defaultValue>Select the Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </div>
              <span className="form-subtitle">
                *Disability defined as a physical or mental impairment which
                substantially limits one or more major life activities, such as
                seeing, hearing, speaking, walking, learning, working, etc.
              </span>

              <div className="item-row">
                <span className="key">Are you a military veteran?</span>
                <Select
                  name="military"
                  value={collectedData.militaryVeteran}
                  className="form-select"
                  aria-label="Disabled"
                  onChange={(e) => {
                    setCollectedData({
                      ...collectedData,
                      militaryVeteran: e.target.value,
                    });
                  }}
                >
                  <option defaultValue>Select the Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </div>
              <span className="form-subtitle">
                *Veteran defined as a student that served, in not currently
                serving, on active duty in the U.S. Army, Navy, Air Force,
                Marine Corps, or Coast Guard.
              </span>

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
                <span className="key">Highest grade completed</span>
                <Select
                  name="gradeCompleted"
                  value={collectedData.HighestGradeCompleted}
                  className="form-select"
                  aria-label="Disabled"
                  onChange={(e) => {
                    setCollectedData({
                      ...collectedData,
                      HighestGradeCompleted: e.target.value,
                    });
                  }}
                >
                  <option defaultValue>Select the Option</option>
                  <option value="High School Graduate">
                    High School Graduate
                  </option>
                  <option value="University Graduate">
                    University Graduate
                  </option>
                </Select>
              </div>

              <footer style={{ gap: 0 }}>
                <div className="date">
                  <span className="key">Date of signing</span>
                  <span className="value">{collectedData.dateOfSign}</span>
                </div>
                <div className="signature">
                  <span className="key">Applicant signature</span>
                  <span className="value">{collectedData.applicantSign}</span>
                </div>
                <div className="school-data">
                  <div className="school-title">United CDL Training School</div>
                  <div className="school-addr">
                    66 Waverley Dr, Ste 630, Frederick, MD, 21702, 301-888-6339
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
                    const result = await createDataCollectionForm({
                      studentId: user.id,
                      name: collectedData.name,
                      address: collectedData.address,
                      phoneNum: collectedData.phoneNum,
                      dob: collectedData.dob,
                      socialSociety: collectedData.socialSociety,
                      email: collectedData.email,
                      race: collectedData.race,
                      gender: collectedData.gender,
                      hispanicOrigin: collectedData.hispanicOrigin,
                      militaryVeteran: collectedData.militaryVeteran,
                      disablePerson: collectedData.disablePerson,
                      HighestGradeCompleted:
                        collectedData.HighestGradeCompleted,
                      dateOfSign: collectedData.dateOfSign,
                      applicantSign: collectedData.applicantSign,
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
          )}
        </div>
      )}
    </div>
  );
};
export default DataCollectionForm;
