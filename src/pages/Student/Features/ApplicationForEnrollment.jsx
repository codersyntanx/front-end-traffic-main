import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  createApplicationEnrollment,
  fetchApplicationEnrollmentByEmail,
  fetchBasicDataByEmail,
} from "../../../services/Student";
import { Button, Spinner } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ApplicationForEnrollment = () => {
  const [update, setUpdate] = useState(0);
  const navigate = useNavigate();

  const student = useSelector((state) => state.user);
  const [fetchBasicData, setFetchBasicData] = useState({
    studentId: "63a9d854188ecb57b9ce9c62",
    name: "Haseeb Ullah Abbasi",
    address: "Ali Wahan",
    phoneNum: "+923103457606",
    dob: "2022-12-08",
    socialSociety: "12",
    email: "haseebabbasi00@gmail.com",
    gender: "Male",
    HighestGradeCompleted: "High School Graduate",
    __v: 0,
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchBasicData() {
      const data = await fetchBasicDataByEmail(student?.id);
      if (data?.dataCollected.length == 0) {
        setLoading(false);

        Swal.fire("Please Fill The Data Collection Form First");
        navigate(-1);
        return;
      }
      setFetchBasicData(data?.dataCollected[0]);

      setCollectedData({
        ...collectedData,
        address: data?.dataCollected[0].address,
        phoneNum: data?.dataCollected[0].phoneNum,
        dob: data?.dataCollected[0].dob,
        socialSociety: data?.dataCollected[0].socialSociety,
      });
      setLoading(false);
    }
    fetchBasicData();
  }, []);

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
  useEffect(() => {
    async function fetchMyEnrollment() {
      const data = await fetchApplicationEnrollmentByEmail(student?.id);
      if (data?.success) {
        if (data?.enrollment.length > 0) setEnrollment(data?.enrollment[0]);
        else setEnrollment(false);
      } else {
        setEnrollment(false);
      }
    }
    fetchMyEnrollment();
  }, []);
  const statesOfAmerica = [
    {
      name: "Alabama",
      abbreviation: "AL",
    },
    {
      name: "Alaska",
      abbreviation: "AK",
    },
    {
      name: "American Samoa",
      abbreviation: "AS",
    },
    {
      name: "Arizona",
      abbreviation: "AZ",
    },
    {
      name: "Arkansas",
      abbreviation: "AR",
    },
    {
      name: "California",
      abbreviation: "CA",
    },
    {
      name: "Colorado",
      abbreviation: "CO",
    },
    {
      name: "Connecticut",
      abbreviation: "CT",
    },
    {
      name: "Delaware",
      abbreviation: "DE",
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC",
    },
    {
      name: "Federated States Of Micronesia",
      abbreviation: "FM",
    },
    {
      name: "Florida",
      abbreviation: "FL",
    },
    {
      name: "Georgia",
      abbreviation: "GA",
    },
    {
      name: "Guam",
      abbreviation: "GU",
    },
    {
      name: "Hawaii",
      abbreviation: "HI",
    },
    {
      name: "Idaho",
      abbreviation: "ID",
    },
    {
      name: "Illinois",
      abbreviation: "IL",
    },
    {
      name: "Indiana",
      abbreviation: "IN",
    },
    {
      name: "Iowa",
      abbreviation: "IA",
    },
    {
      name: "Kansas",
      abbreviation: "KS",
    },
    {
      name: "Kentucky",
      abbreviation: "KY",
    },
    {
      name: "Louisiana",
      abbreviation: "LA",
    },
    {
      name: "Maine",
      abbreviation: "ME",
    },
    {
      name: "Marshall Islands",
      abbreviation: "MH",
    },
    {
      name: "Maryland",
      abbreviation: "MD",
    },
    {
      name: "Massachusetts",
      abbreviation: "MA",
    },
    {
      name: "Michigan",
      abbreviation: "MI",
    },
    {
      name: "Minnesota",
      abbreviation: "MN",
    },
    {
      name: "Mississippi",
      abbreviation: "MS",
    },
    {
      name: "Missouri",
      abbreviation: "MO",
    },
    {
      name: "Montana",
      abbreviation: "MT",
    },
    {
      name: "Nebraska",
      abbreviation: "NE",
    },
    {
      name: "Nevada",
      abbreviation: "NV",
    },
    {
      name: "New Hampshire",
      abbreviation: "NH",
    },
    {
      name: "New Jersey",
      abbreviation: "NJ",
    },
    {
      name: "New Mexico",
      abbreviation: "NM",
    },
    {
      name: "New York",
      abbreviation: "NY",
    },
    {
      name: "North Carolina",
      abbreviation: "NC",
    },
    {
      name: "North Dakota",
      abbreviation: "ND",
    },
    {
      name: "Northern Mariana Islands",
      abbreviation: "MP",
    },
    {
      name: "Ohio",
      abbreviation: "OH",
    },
    {
      name: "Oklahoma",
      abbreviation: "OK",
    },
    {
      name: "Oregon",
      abbreviation: "OR",
    },
    {
      name: "Palau",
      abbreviation: "PW",
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA",
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR",
    },
    {
      name: "Rhode Island",
      abbreviation: "RI",
    },
    {
      name: "South Carolina",
      abbreviation: "SC",
    },
    {
      name: "South Dakota",
      abbreviation: "SD",
    },
    {
      name: "Tennessee",
      abbreviation: "TN",
    },
    {
      name: "Texas",
      abbreviation: "TX",
    },
    {
      name: "Utah",
      abbreviation: "UT",
    },
    {
      name: "Vermont",
      abbreviation: "VT",
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI",
    },
    {
      name: "Virginia",
      abbreviation: "VA",
    },
    {
      name: "Washington",
      abbreviation: "WA",
    },
    {
      name: "West Virginia",
      abbreviation: "WV",
    },
    {
      name: "Wisconsin",
      abbreviation: "WI",
    },
    {
      name: "Wyoming",
      abbreviation: "WY",
    },
  ];

  const [collectedData, setCollectedData] = useState({
    userId: student?.id,
    name: student?.userName,
    address: "",
    phoneNum: "",
    dob: "",
    socialSociety: "",
    email: student?.email,

    // emergency Contact
    EmergancyContactName: "",
    EmergancyPhone: "",
    EmergancyRelation: "",
    EmergancyAddress: "",
    EducationHighestGradeCompleted: "",
    MotorVehicleLicense: "",
    MotorLicenseState: "",
    // VA, MD, PA, DC,DE 52

    dateOfSign: new Date().toUTCString(),
    applicantSign: student?.userName,
  });

  const data = false;

  return (
    <div className="">
      {loading === true ? (
        <div className="text-center my-5">
          <Spinner width={20} padding={20}></Spinner>
        </div>
      ) : (
        <div className="form-container">
          {fetchedEnrollment !== false ? (
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
                <span className="value">{fetchBasicData?.name}</span>

                <span className="key">Adress</span>
                <span className="value">{fetchBasicData?.address}</span>

                <span className="key">Phone Number</span>
                <span className="value">{fetchBasicData?.phoneNum}</span>

                <span className="key">Date of Birth</span>
                <span className="value">{fetchBasicData?.dob}</span>

                <span className="key">Social Security Number</span>
                <span className="value">{fetchBasicData?.socialSociety}</span>

                <span className="key">Email</span>
                <span className="value">{fetchBasicData?.email}</span>
              </div>

              {/* <!-- Emergency Info --> */}
              <section className="section-box">
                <h2 className="section-title -attention">EMERGENCY CONTACTS</h2>
                <div className="item-row">
                  <span className="key">Contact Name</span>
                  <span className="value">
                    {fetchedEnrollment?.EmergancyContactName}
                  </span>

                  <span className="key">Phone</span>
                  <span className="value">
                    {fetchedEnrollment?.EmergancyPhone}
                  </span>

                  <span className="key">Relationship</span>
                  <span className="value">
                    {fetchedEnrollment?.EmergancyRelation}
                  </span>

                  <span className="key">Address/City/State</span>
                  <span className="value">
                    {fetchedEnrollment?.EmergancyAddress}
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
                    {fetchedEnrollment?.EducationHighestGradeCompleted}
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
                    {new Date(fetchedEnrollment?.dateOfSign).getMonth() + 1}/
                    {new Date(fetchedEnrollment?.dateOfSign).getDay()}/
                    {new Date(fetchedEnrollment?.dateOfSign).getFullYear()}
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
                    {fetchedEnrollment?.checkedBy || "NA"}
                  </span>
                </div>
                <div className="signature">
                  <span className="key">Checker Signature</span>
                  <span className="value">
                    {fetchedEnrollment?.checkedBySign || "NA"}
                  </span>
                </div>

                <div className="school-data">
                  <div className="school-title">United CDL Training School</div>
                  <div className="school-addr ">
                    66 Waverley Dr, Ste 630, Frederick, MD, 21702, 301-888-6339
                  </div>
                </div>
              </footer>
            </div>
          ) : (
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
                <input
                  placeholder="Name"
                  value={fetchBasicData?.name}
                  className="form-control"
                  disabled
                />

                <span className="key">Adress</span>
                <input
                  placeholder="Address"
                  value={fetchBasicData?.address}
                  className="form-control"
                  disabled
                />

                <span className="key">Phone Number</span>
                <input
                  placeholder="Phone Number"
                  value={fetchBasicData?.phoneNum}
                  className="form-control"
                  disabled
                />

                <span className="key">Date of Birth</span>
                <input
                  placeholder="Date of Birth"
                  value={fetchBasicData?.dob}
                  className="form-control"
                  disabled
                />

                <span className="key">Social Security Number</span>
                <input
                  placeholder="Social Security Number"
                  value={fetchBasicData?.socialSociety}
                  className="form-control"
                  disabled
                />

                <span className="key">Email</span>
                <input
                  placeholder="Email"
                  value={fetchBasicData?.email}
                  className="form-control"
                  disabled
                />
              </div>

              {/* <!-- Emergency Info --> */}
              <section className="section-box">
                <h2 className="section-title -attention">EMERGENCY CONTACTS</h2>
                <div className="item-row">
                  <span className="key">Contact Name</span>
                  <input
                    placeholder="Emergancy Contact Name"
                    value={collectedData.EmergancyContactName}
                    onChange={(e) =>
                      setCollectedData({
                        ...collectedData,
                        EmergancyContactName: e.target.value,
                      })
                    }
                    className="form-control"
                  />

                  <span className="key">Phone</span>
                  <input
                    placeholder="Emergancy Phone"
                    value={collectedData.EmergancyPhone}
                    onChange={(e) =>
                      setCollectedData({
                        ...collectedData,
                        EmergancyPhone: e.target.value,
                      })
                    }
                    className="form-control"
                  />

                  <span className="key">Relationship</span>
                  <select
                    value={collectedData.EmergancyRelation}
                    className="form-select"
                    aria-label="Program"
                    onChange={(e) => {
                      setCollectedData({
                        ...collectedData,
                        EmergancyRelation: e.target.value,
                      });
                    }}
                  >
                    <option className="form-control" defaultValue>
                      Select the Program
                    </option>
                    {[
                      "wife",
                      "husband",
                      "father",
                      "mother",
                      "son",
                      "sister",
                      "brother",
                      "daughter",
                    ].map((item, index) => (
                      <option key={index} className="form-control" value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <span className="key">Address/City/State</span>
                  <input
                    placeholder="Emergancy Address"
                    value={collectedData.EmergancyAddress}
                    onChange={(e) =>
                      setCollectedData({
                        ...collectedData,
                        EmergancyAddress: e.target.value,
                      })
                    }
                    className="form-control"
                  />
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
                  <select
                    value={collectedData.EducationHighestGradeCompleted}
                    className="form-select"
                    aria-label="Program"
                    onChange={(e) => {
                      setCollectedData({
                        ...collectedData,
                        EducationHighestGradeCompleted: e.target.value,
                      });
                    }}
                  >
                    <option className="form-control" defaultValue>
                      Select the Program
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                      (item, index) => (
                        <option
                          key={index}
                          className="form-control"
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </section>

              {/* <!-- License info --> */}
              <section className="section-box">
                <h2 className="section-title">MOTOR VEHICLE LICENSES HELD</h2>
                <div className="item-row">
                  <span className="key">License</span>
                  <input
                    placeholder="License Number"
                    value={collectedData.MotorVehicleLicense}
                    onChange={(e) =>
                      setCollectedData({
                        ...collectedData,
                        MotorVehicleLicense: e.target.value,
                      })
                    }
                    className="form-control"
                  />

                  <span className="key">State</span>
                  <select
                    value={collectedData.MotorLicenseState}
                    className="form-select"
                    aria-label="Program"
                    onChange={(e) => {
                      setCollectedData({
                        ...collectedData,
                        MotorLicenseState: e.target.value,
                      });
                    }}
                  >
                    <option className="form-control" defaultValue>
                      State
                    </option>
                    {statesOfAmerica.map((item, index) => (
                      <option
                        key={index}
                        className="form-control"
                        value={item.name}
                      >
                        {" "}
                        {item.abbreviation} : {item.name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <footer style={{ gap: 0 }}>
                <div className="date">
                  <span className="key">Date of signing</span>

                  <span className="value">
                    {new Date().getMonth() + 1}/{new Date().getDay()}/
                    {new Date().getFullYear()}
                  </span>
                </div>
                <div className="signature">
                  <span className="key">Applicant signature</span>
                  <span className="value">{student.userName}</span>
                </div>
                <div className="school-data">
                  <div className="school-title">United CDL Training School</div>
                  <div className="school-addr">
                    66 Waverley Dr, Ste 630, Frederick, MD, 21702, 301-888-6339
                  </div>
                </div>
              </footer>
              <Button
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
                    const result = await createApplicationEnrollment({
                      studentId: collectedData.userId,
                      name: collectedData.name,
                      address: collectedData.address,
                      phoneNum: collectedData.phoneNum,
                      dob: collectedData.dob,
                      socialSociety: collectedData.socialSociety,
                      email: collectedData.email,
                      EmergancyAddress: collectedData.EmergancyAddress,
                      EmergancyContactName: collectedData.EmergancyContactName,
                      EmergancyPhone: collectedData.EmergancyPhone,
                      EmergancyRelation: collectedData.EmergancyRelation,
                      EducationHighestGradeCompleted:
                        collectedData.EducationHighestGradeCompleted,
                      MotorLicenseState: collectedData.MotorVehicleLicense,
                      MotorVehicleLicense: collectedData.MotorVehicleLicense,
                      HighestGradeCompleted:
                        collectedData.EducationHighestGradeCompleted,
                      applicantSign: collectedData.applicantSign,
                    });
                    Swal.fire(
                      "Application For Enrollment Completed",
                      "",
                      "success"
                    );
                  } else {
                    Swal.fire(
                      "Error In Application For Enrollment",
                      "",
                      "error"
                    );
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
export default ApplicationForEnrollment;
