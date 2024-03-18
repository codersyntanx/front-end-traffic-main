import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getStudents, markVerified } from "../../services/Student";
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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const StudentCollectionDetailed = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [loader, setLoader] = useState(false);
  const [studentList, setList] = useState([]);
  const [filteredList, setFiltered] = useState([]);

  const user = useSelector((state) => state.user);

  async function fetchAllStudents() {
    setLoader(true);
    const data = await getStudents();
    const students = data?.students.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Convert to uppercase for comparison
      const nameB = b.name.toUpperCase(); // Convert to uppercase for comparison

      return nameA.localeCompare(nameB);
    });
    setLoader(false);

    setList(students);

    setFiltered(students);
  }

  useEffect(() => {
    fetchAllStudents();
  }, []);
  return (
    <div>
      <div style={{ minHeight: "100vh" }}>
        <div
          className="container showStudents"
          style={{
            overflowX: "auto",
          }}
        >
          <div className="display-6 text-center">All Trainees</div>
          <div className="">
            <div className="d-flex" style={{ minWidth: "600px" }}>
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  const filteredStudents = e.target.value
                    ? studentList.filter((studentItem) => {
                        const regex = new RegExp(e.target.value, "i");
                        return (
                          regex.test(studentItem.name) ||
                          regex.test(studentItem.email)
                        );
                      })
                    : studentList;

                  setFiltered(filteredStudents);
                }}
              />
              <div className="d-flex" style={{ maxWidth: "200px" }}>
                <Button
                  onClick={() => {
                    setFiltered(studentList);
                    setSearchTerm();
                  }}
                  colorScheme={"yellow"}
                  width={"100%"}
                >
                  Clear
                </Button>
              </div>
            </div>

            <span className="col-md-2 col-lg-2 col-sm-12 col-xs-12"></span>
            <span className="col-md-2 col-lg-2 col-sm-12 col-xs-12 "></span>
          </div>

          {loader === true ? (
            <div className="text-center my-5">
              <Spinner width={20} padding={20}></Spinner>
            </div>
          ) : filteredList.length == 0 ? (
            <div className="display-6 text-center"> No Students Data Yet </div>
          ) : (
            <Table variant={"striped"} className="table p-3">
              <Thead>
                <Tr>
                  <Th textAlign={"center"}> index</Th>
                  <Th> name</Th>
                  <Th> profile</Th>
                  <Th> email</Th>
                  <Th textAlign={"center"}> verified</Th>
                  <Th textAlign={"center"}> Created</Th>
                  <Th textAlign={"center"}> Application Form</Th>
                  <Th textAlign={"center"}> Is Student</Th>
                </Tr>
              </Thead>

              <Tbody>
                {filteredList.map((studentItem, index) => (
                  <tr key={index}>
                    <Td className="text-center">{index + 1}</Td>
                    <Td style={{}}>
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
                    <Td className="">{studentItem?.email}</Td>
                    {studentItem?.verified === true ? (
                      <Td className="text-center"> Trusted</Td>
                    ) : (
                      <Td className="text-center">
                        <Button
                          colorScheme="blackAlpha"
                          className="bg-[rgba(41,41,41,0.6)] "
                          style={{ paddingLeft: "5px", paddingRight: "5px" }}
                          onClick={async () => {
                            Swal.fire({
                              title: "Do you want to Verify Forcefully",
                              confirmButtonText: "Attempt",
                              showCancelButton: true,
                              showLoaderOnConfirm: true,
                              allowOutsideClick: () => !Swal.isLoading(),
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                const result = await markVerified(
                                  studentItem._id,
                                  user?.id
                                );
                                if (result.success) {
                                  Swal.fire("Student Has been Verified");
                                  fetchAllStudents();
                                  return;
                                } else {
                                  Swal.fire("Error In Verification");
                                  return;
                                }
                              }
                            });
                          }}
                        >
                          Not Trusted
                        </Button>
                      </Td>
                    )}
                    <Td>
                      {new Date(studentItem?.createAt).getMonth() + 1}/
                      {new Date(studentItem?.createAt).getDay()}/
                      {new Date(studentItem?.createAt).getFullYear()}
                    </Td>

                    <Td className="text-center">
                      {studentItem?.isEnrolled === true ? (
                        <span
                          className="circle "
                          style={{ backgroundColor: "green" }}
                        ></span>
                      ) : (
                        <span
                          className="circle "
                          style={{ backgroundColor: "red" }}
                        ></span>
                      )}
                    </Td>
                    <Td className="text-center">
                      {studentItem?.isStudent === true ? (
                        <span
                          className="circle "
                          style={{ cursor: "auto", backgroundColor: "green" }}
                        ></span>
                      ) : (
                        <span
                          className="circle "
                          style={{ cursor: "auto", backgroundColor: "red" }}
                        ></span>
                      )}
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
export default StudentCollectionDetailed;
