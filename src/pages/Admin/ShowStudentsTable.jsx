import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  correctResultsById,
  forcedDelete,
  getAllDetails,
} from "../../services/Student";
import {
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Check, Delete } from "../../assets/icons";
import Datepicker from "react-tailwindcss-datepicker";

const StudentFilter = ({ applyFilter }) => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const changeDate = (newValue) => {
    setDate(newValue);
  };

  const [applyDate, setApplyDate] = useState(false);

  const [verifiedState, setVerifiedState] = useState("both");
  const [completedState, setCompletedState] = useState("both");
  const [blockedState, setBlockedState] = useState("both");
  const [activeState, setActiveState] = useState("both");

  const handleFilterApply = () => {
    const filters = [];
    filters.push(`verified:${verifiedState}`);
    filters.push(`completed:${completedState}`);
    filters.push(`blocked:${blockedState}`);
    filters.push(`active:${activeState}`);
    const { startDate, endDate } = date;
    if (applyDate && startDate && endDate) {
      filters.push(`startDate:${startDate}`);
      filters.push(`endDate:${endDate}`);
    }
    applyFilter(filters);
  };

  const clearFilter = () => {
    setVerifiedState("both");
    setCompletedState("both");
    setBlockedState("both");
    setActiveState("both");
    applyFilter([]);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center my-2">
      <div>
        <p>Verified:</p>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="both"
            checked={verifiedState === "both"}
            onChange={() => setVerifiedState("both")}
            className="form-radio mx-1"
          />
          Both
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="true"
            checked={verifiedState === "true"}
            onChange={() => setVerifiedState("true")}
            className="form-radio mx-1"
          />
          Verified
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="false"
            checked={verifiedState === "false"}
            onChange={() => setVerifiedState("false")}
            className="form-radio mx-1"
          />
          Not Verified
        </label>
      </div>

      <div>
        <p>Completed:</p>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="both"
            checked={completedState === "both"}
            onChange={() => setCompletedState("both")}
            className="form-radio mx-1"
          />
          Both
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="true"
            checked={completedState === "true"}
            onChange={() => setCompletedState("true")}
            className="form-radio mx-1"
          />
          Completed
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="false"
            checked={completedState === "false"}
            onChange={() => setCompletedState("false")}
            className="form-radio mx-1"
          />
          Not Completed
        </label>
      </div>

      <div>
        <p>Blocked:</p>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="both"
            checked={blockedState === "both"}
            onChange={() => setBlockedState("both")}
            className="form-radio mx-1"
          />
          Both
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="true"
            checked={blockedState === "true"}
            onChange={() => setBlockedState("true")}
            className="form-radio mx-1"
          />
          Blocked
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="false"
            checked={blockedState === "false"}
            onChange={() => setBlockedState("false")}
            className="form-radio mx-1"
          />
          Not Blocked
        </label>
      </div>
      <div>
        <p>Active:</p>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="both"
            checked={activeState === "both"}
            onChange={() => setActiveState("both")}
            className="form-radio mx-1"
          />
          Both
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="true"
            checked={activeState === "true"}
            onChange={() => setActiveState("true")}
            className="form-radio mx-1"
          />
          Active
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="false"
            checked={activeState === "false"}
            onChange={() => setActiveState("false")}
            className="form-radio mx-1"
          />
          Not Active
        </label>
      </div>
      <div id="datePicker">
        <Datepicker
          primaryColor={"blue"}
          value={date}
          onChange={changeDate}
          showShortcuts={true}
        />
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="true"
              checked={applyDate}
              onChange={(e) => {
                setApplyDate(!applyDate);
              }}
              className="form-radio mx-1"
            />
            Apply Date
          </label>
        </div>
      </div>
      <div className="flex lg:items-center flex-col lg:flex-row md:flex-row gap-2">
        <button
          className="bg-[rgba(41,41,41,0.5)] p-2 text-white rounded transition duration-300 hover:bg-[rgba(41,41,41,0.8)]"
          onClick={handleFilterApply}
        >
          Apply Filter
        </button>
        <button
          className="bg-[rgba(41,41,41,0.5)] p-2 text-white rounded transition duration-300 hover:bg-[rgba(41,41,41,0.8)]"
          onClick={() => {
            clearFilter();
          }}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

const ShowStudentsTable = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [termFiltered, setTermFilter] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(false);
  const [update, setUpdate] = useState(0);
  const user = useSelector((state) => state?.user);

  const getAllDataOfStudents = async () => {
    setSearchTerm("");
    setLoader(true);
    const data = await getAllDetails();
    if (data?.success) {
      const students = data?.students.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // Convert to uppercase for comparison
        const nameB = b.name.toUpperCase(); // Convert to uppercase for comparison

        return nameA.localeCompare(nameB);
      });

      setEnrollments(students);
      setFilteredStudents(students);
      setTermFilter(students);
      // setSearchTerm();
    }
    setLoader(false);
  };
  const applyFilter = (filters = []) => {
    const filteredData = searchTerm
      ? enrollments.filter((studentItem) => {
          const regex = new RegExp(searchTerm, "i");
          return (
            regex.test(studentItem.name) || regex.test(studentItem.email) // Add other fields you want to search here
          );
        })
      : enrollments;

    let filteredList = filteredData;

    filters.forEach((filter) => {
      const [criteria, value] = filter.split(":");
      if (criteria === "verified") {
        filteredList = filteredList.filter((student) => {
          if (value === "both") return true;
          return student.verified === (value === "true");
        });
      }
      if (criteria === "completed") {
        filteredList = filteredList.filter((student) => {
          if (value === "both") return true;
          return student.completed === (value === "true");
        });
      }
      if (criteria === "blocked") {
        filteredList = filteredList.filter((student) => {
          if (value === "both") return true;
          return student.blocked === (value === "true");
        });
      }
      if (criteria === "active") {
        filteredList = filteredList.filter((student) => {
          if (value === "both") return true;
          return student.active === (value === "true");
        });
      }

      if (criteria === "startDate") {
        filteredList = filteredList.filter((student) => {
          return new Date(student.createAt) >= new Date(value);
        });
      }
      if (criteria === "endDate") {
        filteredList = filteredList.filter((student) => {
          return new Date(student.createAt) <= new Date(value);
        });
      }
    });

    setTermFilter(filteredList);
    setFilteredStudents(filteredList);
  };

  useEffect(() => {
    async function fetchAllStudents() {
      setLoader(true);
      const data = await getAllDetails();
      console.log(data);

      if (data?.success) {
        const students = data?.students.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // Convert to uppercase for comparison
          const nameB = b.name.toUpperCase(); // Convert to uppercase for comparison

          return nameA.localeCompare(nameB);
        });

        setEnrollments(students);
        setFilteredStudents(students);
        setTermFilter(students);
      }
      setLoader(false);
    }
    fetchAllStudents();
    applyFilter();
  }, [update]);

  const [enrollments, setEnrollments] = useState([]);
  const updateResult = async (id, studentName) => {
    const result = await correctResultsById(id);
    if (result?.data.success) {
      setUpdate(update + 1);

      Swal.fire(
        "Result Update",
        "The Result of Student :" + studentName + " has been updated",
        "success"
      );
    } else
      Swal.fire(
        "Result Update",
        "The Result of Student :" + studentName + " Did not Updated",
        "error"
      );
  };
  const deleteByAdmin = async (id) => {
    Swal.fire({
      title: "Enter Your Password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Delete",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const results = await forcedDelete({
          adminCode: result.value,
          admin: user.id,
          studentId: id,
        });
        // console.log(results);

        if (results?.success) {
          Swal.fire(
            "Deleted",
            "Student has been deleted successfully",
            "success"
          );
          getAllDataOfStudents();
        } else {
          Swal.fire("Error", "Error in deleting Student ", "error  ");
        }
      }
    });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="">
        <div className="display-6 text-center mb-5">All Trainees</div>
        <StudentFilter applyFilter={applyFilter} />
        <div className="row mx-1">
          <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
            <input
              type="text"
              className="form-control my-1 "
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                const filteredData = e.target.value
                  ? filteredStudents.filter((studentItem) => {
                      const regex = new RegExp(e.target.value, "i");
                      return (
                        regex.test(studentItem.name) ||
                        regex.test(studentItem.email) // Add other fields you want to search here
                      );
                    })
                  : filteredStudents;

                setTermFilter(filteredData);
              }}
            />
          </div>

          <span className="lg:my-0 md:my-0  sm:my-4 my-1 col-md-2 col-lg-2 col-sm-12 col-xs-12 ">
            <Button
              onClick={() => {
                setSearchTerm("");
                const filteredData = undefined
                  ? filteredStudents.filter((studentItem) => {
                      const regex = new RegExp(e.target.value, "i");
                      return (
                        regex.test(studentItem.name) ||
                        regex.test(studentItem.email) // Add other fields you want to search here
                      );
                    })
                  : filteredStudents;

                setTermFilter(filteredData);
              }}
              colorScheme={"yellow"}
              width={"100%"}
            >
              Clear
            </Button>
          </span>
        </div>

        <div
          className=""
          style={{
            overflowX: "auto",
          }}
        >
          {loader == true ? (
            <div className="text-center">
              <Spinner width={20} padding={20}></Spinner>
            </div>
          ) : (
            <Table variant={"striped"} className="table p-3">
              <Thead>
                <Tr>
                  <Th> index</Th>
                  <Th> name</Th>
                  <Th> profile</Th>
                  <Th> email</Th>
                  <Th> Finish</Th>
                  <Th> verified</Th>
                  <Th> active</Th>
                  <Th> blocked</Th>
                  {/* <Th> docs</Th> */}
                  {/* <Th> Created </Th> */}
                  <Th> Last Attempted </Th>
                  <Th> Percentage </Th>
                  <Th> Lesson Complete </Th>
                  <Th> Actions </Th>
                </Tr>
              </Thead>

              <Tbody>
                {termFiltered.map((studentItem, index) => (
                  <tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Link to={`/superAdmin/student/${studentItem?._id}`}>
                        <u
                          className="link_hover"
                          style={{ fontWeight: "bolder" }}
                        >
                          {studentItem?.name}
                        </u>
                      </Link>
                    </Td>
                    <Td>
                      <img
                        className="scaling_hover"
                        width={"40px"}
                        height={"40px"}
                        style={{ borderRadius: "20px" }}
                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${studentItem?.name}`}
                      ></img>
                    </Td>
                    <Td>{studentItem?.email}</Td>
                    <Td className="text-center">
                      {studentItem?.completed === true ? "✅" : "❌"}
                    </Td>

                    <Td>
                      {studentItem?.verified === true ? "Verified" : "Not Yet"}
                    </Td>
                    <Td>
                      {studentItem?.active === true ? "Active" : "Not Yet"}
                    </Td>
                    <Td className="text-center">
                      {studentItem?.blocked === true ? "🔴" : "🟢"}
                    </Td>
                    {/* <Td>{studentItem?.docsUploaded === true ? "✔️" : "❌"}</Td> */}

                    {/* <Td>
                      {new Date(studentItem?.createAt).getMonth() + 1}/
                      {new Date(studentItem?.createAt).getDay()}/
                      {new Date(studentItem?.createAt).getFullYear()}
                    </Td> */}

                    <Td>{studentItem?.StudentResult[0]?.lastCompleted || 0}</Td>
                    <Td
                      style={{
                        backgroundColor: `${
                          studentItem?.StudentResult[0]?.overAllPercentage > 1
                            ? "rgba(255,10,10,0.6)"
                            : "transparent"
                        } `,
                      }}
                    >
                      {studentItem?.StudentResult[0]?.overAllPercentage == 0
                        ? 0
                        : Math.round(
                            studentItem?.StudentResult[0]?.overAllPercentage *
                              100
                          )}
                      &nbsp; %
                    </Td>
                    <Td className="text-center">
                      <b>
                        {studentItem?.StudentResult[0]?.lessonCompletedTotal}
                        &nbsp;
                      </b>
                    </Td>
                    <Td>
                      <div className="flex justify-center items-center">
                        {studentItem?.StudentResult[0]?.overAllPercentage >
                          1 && (
                          <span
                            onClick={() => {
                              updateResult(studentItem?._id, studentItem?.name);
                            }}
                            className="btn btn-warning"
                          >
                            <Check height={6} width={6} />
                          </span>
                        )}
                        <span
                          className="cursor-pointer"
                          onClick={() => deleteByAdmin(studentItem?._id)}
                        >
                          <Delete />
                        </span>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
export default ShowStudentsTable;
