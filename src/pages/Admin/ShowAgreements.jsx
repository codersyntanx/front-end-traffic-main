import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  blockStudent,
  getAllCollection,
  getStudents,
  makeStudentActive,
  makeStudentInActive,
  unBlockStudent,
} from "../../services/Student";
import { FaUserCircle } from "react-icons/fa";
import { FaExpeditedssl } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

const ShowAgreements = () => {
  const [update, setUpdate] = useState(0);
  const user = useSelector((state) => state?.user);
  useEffect(() => {
    async function fetchAllStudents() {
      const data = await getAllCollection();

      if (data?.success) {
        setEnrollments([...data.collections]);
      }
    }
    fetchAllStudents();
  }, [update]);

  const [enrollments, setEnrollments] = useState([]);
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="">
        <div className="display-6 text-center mb-5">All Agreements</div>
        <div
          className=""
          style={{
            overflowX: "auto",
          }}
        >
          {enrollments?.length > 0 && (
            <Table variant={"striped"} className="table p-3">
              <Thead>
                <Tr className="">
                  <Th> index</Th>
                  <Th> name</Th>
                  <Th> address</Th>
                  <Th> phoneNum</Th>
                  <Th> dob</Th>
                  <Th> socialSociety</Th>
                  <Th> email</Th>
                  <Th> race</Th>
                  <Th> gender</Th>
                  <Th> hispanicOrigin</Th>
                  <Th> militaryVeteran</Th>
                  <Th> disablePerson</Th>
                  <Th> HighestGradeCompleted</Th>
                  <Th> dateOfSign</Th>
                  <Th> createAt</Th>
                  <Th> status</Th>
                  <Th> checkedAt</Th>
                  <Th> checkedByName</Th>
                  <Th> Operation</Th>
                </Tr>
              </Thead>

              <Tbody>
                {enrollments.map((studentItem, index) => (
                  <tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{studentItem?.name}</Td>
                    <Td>{studentItem?.address}</Td>
                    <Td>{studentItem?.phoneNum}</Td>
                    <Td>{studentItem?.dob}</Td>
                    <Td>{studentItem?.socialSociety}</Td>
                    <Td>{studentItem?.email}</Td>
                    <Td>{studentItem?.race}</Td>
                    <Td>{studentItem?.gender}</Td>
                    <Td>{studentItem?.hispanicOrigin}</Td>
                    <Td>{studentItem?.militaryVeteran}</Td>
                    <Td>{studentItem?.disablePerson}</Td>
                    <Td>{studentItem?.HighestGradeCompleted}</Td>
                    <Td>{studentItem?.dateOfSign}</Td>
                    <Td>{studentItem?.createAt}</Td>
                    <Td>{studentItem?.status}</Td>
                    <Td>{studentItem?.checkedAt}</Td>
                    <Td>{studentItem?.checkedByName}</Td>
                    <Td>
                      <Button
                        colorScheme={"red"}
                        onClick={() => {
                          Swal.fire("Not Allowed");
                        }}
                      >
                        Delete
                      </Button>
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
export default ShowAgreements;
