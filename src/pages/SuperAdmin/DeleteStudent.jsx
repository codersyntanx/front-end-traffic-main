import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { deleteStudentData } from "../../services/Student";
import { useParams } from "react-router-dom";

const DeleteStudent = () => {
  const { studentId } = useParams();
  const [password, setPassword] = useState("");
  return (
    <Box p={"48"} textAlign={"center"}>
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
        _placeholder={{ color: "red" }}
      />
      <Button
        m={"10"}
        colorScheme="red"
        onClick={async () => {
          const results = await deleteStudentData(studentId, password);
          // console.log(results);
          alert(JSON.stringify(results));
        }}
      >
        Delete
      </Button>
    </Box>
  );
};
export default DeleteStudent;
