import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navbar from "../../../components/Navbar";
import { useState } from "react";
import { Button, Grid, Input, Spinner, Stack } from "@chakra-ui/react";
import { correctResults, correctResultsById } from "../../../services/Student";
import { Radio, RadioGroup } from "@chakra-ui/react";
const CorrectStudentResult = () => {
  const [value, setValue] = useState("name");
  const [studentName, setStudentName] = useState("");
  const [loader, setLoader] = useState(false);

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <div
          className="p-5"
          style={{
            margin: "0px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <h1
            className={"display-4 text-center"}
            style={{ fontWeight: "bold" }}
          >
            Update Results
          </h1>
          <Input
            name="studentName"
            value={studentName}
            className="form-control my-1 mb-3"
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student Name"
          />
          <div>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="name">Name</Radio>
                <Radio value="id">Id</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <button
            className="mt-3 w-40 bg-[rgba(41,41,41,0.89)] text-white py-2 px-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            onClick={async () => {
              if (studentName.trim().length == 0) {
                Swal.fire("Invalid Name", "please Enter the Name", "error");
                return;
              }
              setLoader(true);
              if (value === "name") {
                const result = await correctResults(studentName);
                if (result?.success) {
                  Swal.fire(
                    "Result Update",
                    "The Result of Student :" +
                      studentName +
                      " has been updated",
                    "success"
                  );
                } else
                  Swal.fire(
                    "Result Update",
                    "The Result of Student :" +
                      studentName +
                      " Did not Updated",
                    "error"
                  );
                setLoader(false);
              } else if (value === "id") {
                const result = await correctResultsById(studentName);
                console.log(result);
                if (result?.data.success) {
                  Swal.fire(
                    "Result Update",
                    "The Result of Student :" +
                      studentName +
                      " has been updated",
                    "success"
                  );
                } else
                  Swal.fire(
                    "Result Update",
                    "The Result of Student :" +
                      studentName +
                      " Did not Updated",
                    "error"
                  );
                setLoader(false);
              }
            }}
          >
            Update
          </button>
          {loader == true && (
            <div className="text-center">
              <Spinner width={20} padding={20}></Spinner>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CorrectStudentResult;
