import { useEffect, useState } from "react";
import { deleteModuleResult, fetchModuleResult } from "../../services/Student";
import { useParams } from "react-router-dom";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const ManageModuleResult = () => {
  const { studentId } = useParams();
  const [data, setDataFetched] = useState([
    {
      _id: "6435a9fb29d3769e0861ab49",
      studentName: "Ghazanfar mohammadi",
      studentId: "6435a99b29d3769e0861ab3f",
      chapterNo: 1,
      chapterName: "01_Orientation",
      videoPlayed: 100,
      videoCompleted: true,
      attempted: true,
      status: "PASSED",
      __v: 0,
      marks: 10,
      percentage: 1,
    },
  ]);
  useEffect(() => {
    async function fetchDataCollection() {
      const data = await fetchModuleResult({ studentId });
      // console.log(data);
      if (data.data.results.length !== 0) {
        setDataFetched(data.data.results);
        // setDataFetched(false);
      } else {
        setDataFetched(false);
      }
    }

    fetchDataCollection();
  }, []);
  return (
    <div>
      <Table variant={"striped"} className="table p-3">
        <Thead>
          <Tr className="">
            <Th>index </Th>
            <Th>chapterNo</Th>
            {/* <Th>chapterName</Th> */}
            <Th>videoPlayed</Th>
            <Th>attempted</Th>
            <Th>status</Th>
            <Th>marks</Th>
            <Th>percentage</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((studentItem, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{studentItem.chapterNo}</Td>
              {/* <Td>{studentItem.chapterName}</Td> */}
              <Td>{studentItem?.videoPlayed}</Td>
              <Td>{studentItem?.attempted}</Td>
              <Td>{studentItem.status}</Td>
              <Td>{studentItem.marks}</Td>
              <Td>{studentItem.percentage}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={async () => {
                    await deleteModuleResult({ id: studentItem._id });
                  }}
                >
                  {" "}
                  delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ManageModuleResult;
