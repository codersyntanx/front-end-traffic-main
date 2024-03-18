import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllForms, approveForm } from "../../services/Student";
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
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { Check, Edit } from "../../assets/icons";

const Forms = () => {
  const [filtered, setFiltered] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [update, setUpdate] = useState(0);
  const user = useSelector((state) => state?.user);
  async function fetchAllStudents() {
    const data = await AllForms();
    if (data?.success) {
      setFiltered([...data.forms]);
      setMainForms([...data.forms]);
    }
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);

    fetchAllStudents();
  }, [update]);
  const [loading, setLoading] = useState(false);

  const [mainForms, setMainForms] = useState([]);
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="">
        <div className="display-6 text-center mb-5">All Form Data</div>
        <div className="">
          <div className="d-flex" style={{ minWidth: "600px" }}>
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                const filteredData = e.target.value
                  ? mainForms.filter((studentItem) => {
                      const regex = new RegExp(e.target.value, "i");
                      return (
                        regex.test(studentItem.name) ||
                        regex.test(studentItem.email) // Add other fields you want to search here
                      );
                    })
                  : filteredStudents;
                setFiltered(filteredData);
              }}
            />
            <div className="d-flex" style={{ maxWidth: "200px" }}>
              {/* <Button
                w={"xs"}
                onClick={() => {
                  // if (searchTerm.trim().length !== 0) fetchStudentsOnTerm();
                }}
                colorScheme={"blue"}
                width={"100%"}
                className="mx-1"
              >
                Submit
              </Button>
               */}

              <Button
                onClick={() => {
                  // fetchAllStudents();
                  setSearchTerm();
                  setFiltered(mainForms);
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

        {loading === true ? (
          <div className="text-center my-5">
            <Spinner width={20} padding={20}></Spinner>
          </div>
        ) : (
          <div
            className=""
            style={{
              overflowX: "auto",
            }}
          >
            {mainForms?.length > 0 && (
              <Table variant={"striped"} className="table p-3">
                <Thead>
                  <Tr className="">
                    <Th> index</Th>
                    <Th style={{ minWidth: "200px" }}> name</Th>
                    <Th style={{ minWidth: "200px" }}> address</Th>
                    <Th> phoneNum</Th>
                    <Th style={{ minWidth: "100px" }}> dob</Th>
                    <Th> socialSociety</Th>
                    <Th> email</Th>
                    <Th> gender</Th>
                    <Th> transmission</Th>

                    <Th style={{ minWidth: "100px" }}> dateOfSign</Th>
                    <Th> status</Th>
                    <Th style={{ minWidth: "100px" }}> checkedAt</Th>
                    <Th> checked By</Th>
                    <Th> Operation</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filtered.map((studentItem, index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{studentItem?.name}</Td>
                      <Td>{studentItem?.address}</Td>
                      <Td>{studentItem?.phoneNumber}</Td>
                      <Td>{new Date(studentItem?.dob).toDateString()}</Td>
                      <Td>{studentItem?.socialSecurity}</Td>
                      <Td>{studentItem?.email}</Td>

                      <Td>{studentItem?.gender}</Td>
                      <Td>{studentItem?.transmission}</Td>
                      <Td>{new Date(studentItem?.createdAt).toDateString()}</Td>
                      <Td>{studentItem?.status}</Td>
                      <Td
                        textAlign={"center"}
                        style={{
                          color: "black",
                          backgroundColor: "Background",
                        }}
                      >
                        {studentItem?.checkedAt === undefined
                          ? "🔴"
                          : new Date(studentItem?.checkedAt).toDateString()}
                      </Td>
                      <Td>{studentItem?.checkedBySign || "Mirza Arslan"}</Td>

                      <Td>
                        <div className="d-flex">
                          {studentItem.status === "PENDING" && (
                            <Button
                              title="Approve"
                              colorScheme={"yellow"}
                              onClick={async () => {
                                const result = await approveForm({
                                  studentId: studentItem.studentId,
                                  formId: studentItem._id,
                                  checkedBy: user?.id,
                                  checkedBySign: user?.userName,
                                });
                                if (result?.success) {
                                  Swal.fire("Form", "Approved", "success");
                                  setUpdate(update + 1);
                                } else
                                  Swal.fire(
                                    "Form",
                                    "Form Approval Failed",
                                    "error"
                                  );
                              }}
                            >
                              <Check />
                            </Button>
                          )}

                          <Button
                            className="mx-1"
                            // colorScheme={"cyan"}
                            onClick={() => {
                              navigate(
                                `/superAdmin/editForm/${studentItem?.studentId}`
                              );
                            }}
                          >
                            <Edit />
                          </Button>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Forms;
