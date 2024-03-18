import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllAdmins,
  makeAdminActive,
  makeAdminInActive,
} from "../../services/Student";
import { FaUserCircle } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Check, Info, Lock } from "../../assets/icons";

const ShowAdmins = () => {
  const user = useSelector((state) => state?.user);
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    async function fetchAllAdmins() {
      const data = await getAllAdmins();

      if (data.success) {
        // setAdmins[data.teachers];
        setAdmins([...data.teachers]);
      }
    }
    fetchAllAdmins();
  }, [update]);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="container">
        <div className="display-6 text-center">All Admins</div>
        <div className="container d-flex flex-wrap">
          {admins.map((adminItem) => (
            <div
              key={adminItem?._id}
              className=" mx-3 my-3 shadow-lg"
              style={{
                borderRadius: "20px",
                backgroundColor:
                  adminItem?.active === true
                    ? "rgba(41,41,41,0.89)"
                    : "#8F0005",
              }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="p-3">
                  <FaUserCircle color="white" size={50} />
                </div>
                <div
                  className="fw-bolder"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  <div>{adminItem?.name}</div>
                </div>
                <div
                  className="fw-lighter"
                  style={{ color: "white", fontSize: "16px" }}
                >
                  <div>{adminItem?.email}</div>
                </div>
                <div className="d-flex justify-content-around flex-wrap w-100 my-3 mx-5">
                  <Button
                    onClick={() =>
                      navigate(
                        `/superAdmin/changePasswordAdmin/${adminItem?._id}`
                      )
                    }
                    rightIcon={<Lock />}
                  >
                    Password
                  </Button>

                  {adminItem?.active === true ? (
                    <Button
                      onClick={async () => {
                        const result = await makeAdminInActive(
                          adminItem?._id,
                          user?.id
                        );
                        if (result?.success) {
                          Swal.fire("InActivated Trainee", "", "success");
                          setUpdate(update + 1);
                        } else {
                          {
                            Swal.fire(
                              "Error in InActivation Trainee",
                              "",
                              "question"
                            );
                          }
                        }
                      }}
                      rightIcon={<Check />}
                    >
                      InActivate
                    </Button>
                  ) : (
                    <Button
                      onClick={async () => {
                        const result = await makeAdminActive(
                          adminItem?._id,
                          user?.id
                        );
                        if (result?.success) {
                          Swal.fire("Activated Trainee", "", "success");
                          setUpdate(update + 1);
                        } else {
                          {
                            Swal.fire(
                              "Error in Activated Trainee",
                              "",
                              "question"
                            );
                          }
                        }
                      }}
                      rightIcon={<Check />}
                    >
                      Activate
                    </Button>
                  )}

                  <Button
                    isDisabled={true}
                    onClick={() => {}}
                    rightIcon={<Info />}
                    // colorScheme="blue"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ShowAdmins;
