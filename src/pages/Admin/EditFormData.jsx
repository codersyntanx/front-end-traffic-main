import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import { Button, Input, Select, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentFormById, editFormData } from "../../services/Student";
import { useSelector } from "react-redux";
function formatDate(date) {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
}
const EditFormData = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const [dataFetched, setDataFetched] = useState({
    userId: "",
    name: "",
    address: "",
    phoneNumber: "",
    dob: "",
    socialSecurity: "",
    email: "",
    gender: "",
    dateOfSign: new Date().toDateString(),
    applicantSign: "",
    transmission: "",
    checkedBySign: "",
  });
  useEffect(() => {
    setLoading(true);
    async function getStudentData() {
      const data = await StudentFormById(studentId);
      if (data?.forms?.length !== 0) {
        setDataFetched({
          formId: data.forms[0]._id,
          userId: studentId,
          name: data.forms[0].name,
          address: data.forms[0].address,
          phoneNumber: data.forms[0].phoneNumber,
          dob: data.forms[0].dob,
          socialSecurity: data.forms[0].socialSecurity,
          email: data.forms[0].email,
          gender: data.forms[0].gender,
          dateOfSign: data.forms[0].dateOfSign,
          applicantSign: data.forms[0]?.applicantSign,
          transmission: data.forms[0]?.transmission,
          checkedBy: data.forms[0]?.transmission,
          checkedBySign: data.forms[0]?.checkedBySign,
        });
        // setDataFetched(false);
      } else {
        setDataFetched(false);
      }
      setLoading(false);
    }

    getStudentData();
  }, []);
  const submitForm = async () => {
    const result = await editFormData({
      formId: dataFetched.formId,
      studentId: dataFetched.studentId,
      name: dataFetched.name,
      address: dataFetched.address,
      phoneNum: dataFetched.phoneNumber,
      dob: dataFetched.dob,
      socialSociety: dataFetched.socialSecurity,
      email: dataFetched.email,
      gender: dataFetched.gender,
      dateOfSign: dataFetched.dateOfSign,
      applicantSign: dataFetched.applicantSign,
      transmission: dataFetched.transmission,
    });

    if (result.success == true) {
      MySwal.fire("Data Edited Successfully", "", "success");
      navigate(-1);
    } else {
      MySwal.fire(
        "Error In Data Editing",
        `${result.data.message}`,
        "question"
      );
      // navigate(-1);
    }
  };

  return (
    <>
      <div className="form-container">
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
                <h1 className="form-title">Main Data Form</h1>
                <h5 className="form-subtitle p-2">
                  The Workforce Board requests the following information to be
                  provided by Applicant (RCW 28C.10.050). Providing your social
                  security number is voluntary. By law, the information you
                  provide on this form cannot be given out by any state agency
                  as public information. The Workforce Board will not disclose
                  data to anyone except authorized Workforce Board employees or
                  contractors working on specific research activities, who
                  follow strict confidentiality procedures. This format follows
                  the information required to be submitted by the school as part
                  of the annual student data report.
                </h5>

                <div className="item-row">
                  <span className="key">Applicant's Name</span>
                  <Input
                    name="name"
                    placeholder="Name"
                    value={dataFetched.name}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        name: e.target.value,
                      })
                    }
                  />

                  <span className="key">Adress</span>
                  <Input
                    name="address"
                    placeholder="Address"
                    value={dataFetched.address}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        address: e.target.value,
                      })
                    }
                  />
                  <span className="key">Phone Number</span>
                  <Input
                    name="phone-no"
                    placeholder="Phone Number"
                    value={dataFetched.phoneNumber}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                  <span className="key">Date of Birth &nbsp;</span>

                  <Input
                    name="dob"
                    placeholder="Select Date of Birth"
                    size="md"
                    type="date"
                    value={dataFetched.dob.substring(0, 10)} // Extract the date part in "YYYY-MM-DD" format
                    onChange={(e) => {
                      setDataFetched({
                        ...dataFetched,
                        dob: e.target.value,
                      });
                    }}
                  />

                  <span className="key">Social Security Number</span>
                  <Input
                    name="securityNo"
                    placeholder="Security Number"
                    value={dataFetched.socialSecurity}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        socialSecurity: e.target.value,
                      })
                    }
                  />

                  <span className="key">Email</span>
                  <Input
                    name="email"
                    type={"email"}
                    disabled={true}
                    placeholder="Security Number"
                    value={dataFetched?.email}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="item-row">
                  <span className="key">Transmission type</span>
                  <select
                    value={dataFetched?.transmission}
                    className="form-select"
                    aria-label="Transmission"
                    onChange={(e) => {
                      setDataFetched({
                        ...dataFetched,
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
                    value={dataFetched.gender}
                    className="form-select"
                    aria-label="Disabled"
                    onChange={(e) => {
                      setDataFetched({
                        ...dataFetched,
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
                    <span className="value">
                      {dataFetched?.createdAt === undefined
                        ? new Date().toDateString()
                        : new Date(dataFetched?.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="signature">
                    <span className="key">Applicant signature</span>
                    <span className="value">{dataFetched.name}</span>
                  </div>
                  <div className="signature">
                    <span className="key">Checked By</span>
                    <span className="value">
                      {dataFetched?.checkedBySign || "Mirza Arslan"}
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

                <Button colorScheme={"blue"} onClick={submitForm}>
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
                  provided by Applicant (RCW 28C.10.050). Providing your social
                  security number is voluntary. By law, the information you
                  provide on this form cannot be given out by any state agency
                  as public information. The Workforce Board will not disclose
                  data to anyone except authorized Workforce Board employees or
                  contractors working on specific research activities, who
                  follow strict confidentiality procedures. This format follows
                  the information required to be submitted by the school as part
                  of the annual student data report.
                </h5>

                <div className="item-row">
                  <span className="key">Applicant's Name</span>
                  <Input
                    name="name"
                    placeholder="Name"
                    value={dataFetched.name}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        name: e.target.value,
                      })
                    }
                  />

                  <span className="key">Adress</span>
                  <Input
                    name="address"
                    placeholder="Address"
                    value={dataFetched.address}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        address: e.target.value,
                      })
                    }
                  />
                  <span className="key">Phone Number</span>
                  <Input
                    name="phone-no"
                    placeholder="Phone Number"
                    value={dataFetched.phoneNum}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        phoneNum: e.target.value,
                      })
                    }
                  />
                  <span className="key">Date of Birth</span>
                  <span className="key">
                    default : {new Date(dataFetched.dob).toDateString()}
                  </span>

                  <Input
                    name="dob"
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    value={dataFetched.dob}
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        dob: e.target.value,
                      })
                    }
                  />

                  <span className="key">Social Security Number</span>
                  <Input
                    name="securityNo"
                    placeholder="Security Number"
                    value={dataFetched.socialSociety}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        socialSociety: e.target.value,
                      })
                    }
                  />

                  <span className="key">Email</span>
                  <Input
                    name="email"
                    type={"email"}
                    disabled={true}
                    placeholder="Security Number"
                    value={dataFetched?.email}
                    className="form-control"
                    onChange={(e) =>
                      setDataFetched({
                        ...dataFetched,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="item-row">
                  <span className="key">Gender</span>
                  <Select
                    name="gender"
                    value={dataFetched.gender}
                    className="form-select"
                    aria-label="Disabled"
                    onChange={(e) => {
                      setDataFetched({
                        ...dataFetched,
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
                    value={dataFetched?.transmission}
                    className="form-select"
                    aria-label="Transmission"
                    onChange={(e) => {
                      setDataFetched({
                        ...dataFetched,
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
                    <span className="value">{dataFetched.dateOfSign}</span>
                  </div>
                  <div className="signature">
                    <span className="key">Applicant signature</span>
                    <span className="value">{dataFetched.applicantSign}</span>
                  </div>
                  <div className="signature">
                    <span className="key">Checked By</span>
                    <span className="value">
                      {dataFetched?.checkedBySign || "Mirza Arslan"}
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

                <Button colorScheme={"blue"} onClick={submitForm}>
                  Submit
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default EditFormData;
