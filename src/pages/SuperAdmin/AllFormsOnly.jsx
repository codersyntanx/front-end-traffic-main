import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Button } from "@chakra-ui/react";
import {
  FaCalculator,
  FaCrown,
  FaGraduationCap,
  FaList,
  FaNewspaper,
  FaTable,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { getStatsMonthly } from "../../services/Student";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const arrayData = [23, 23, 23, 33, 34, 19, 13, 24, 34, 21, 34, 30];

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MainData = {
  labels,
  datasets: [
    {
      label: "Student Reg By Month Data",
      data: arrayData,
      backgroundColor: "rgba(255, 99, 132, 0.9)",
    },
    // {
    //   label: "Student Verified By Month Data",
    //   data: arrayData,
    //   backgroundColor: "rgba(255, 99, 132, 0.4)",
    // },
  ],
};

const AllFormsOnly = () => {
  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Student Registration Count By Month",
      },
    },
    scales: {
      y: {
        max: 10,
        // max: arrayData.reduce((a, b) => Math.max(a, b), -Infinity) + 10,
        min: 0,
      },
    },
  });
  const [graphData, setGraphData] = useState({
    labels,
    datasets: [
      {
        label: "Student Reg By Month Data",
        data: arrayData,
        backgroundColor: "rgba(255, 99, 132, 0.9)",
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchStats() {
      const data = await getStatsMonthly();
      if (data?.success) {
        const monthsList = data?.data?.data;
        const result = {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        };
        monthsList.forEach((item) => {
          const month = new Date(item.createAt).toLocaleString("en-us", {
            month: "long",
          });
          result[month] = result[month] + 1;
        });
        // console.log(Object.keys(result));

        setOptions({
          ...options,
          scales: {
            y: {
              max:
                Object.values(result).reduce(
                  (a, b) => Math.max(a, b),
                  -Infinity
                ) + 10,
              min: 0,
            },
          },
        });
        setGraphData({
          // ...graphData,
          labels: Object.keys(result).map((str) => str.slice(0, 3)),
          datasets: [
            {
              label: "Student Reg By Month Data",
              data: Object.values(result),
              backgroundColor: "rgba(255, 99, 132, 0.9)",
            },
          ],
        });
      }
    }
    fetchStats();
  }, []);
  return (
    <div style={{}}>
      <div className="container">
        {/* <div className="display-3">Super Admin Dashboard</div> */}
        <div className="container   " style={{ borderRadius: "20px" }}>
          <div className="row my-3">
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div className="row my-3">
                <Button
                  className="col-lg-3 col-md-3 col-xs-11 col-sm-11 mx-3 my-2 adminDashButton customRadius py-4 shadow-sm"
                  leftIcon={<FaNewspaper />}
                  onClick={() => {
                    navigate("/superAdmin/allCollectedData");
                  }}
                >
                  All Collections
                </Button>
                <Button
                  className="col-lg-3 col-md-3 col-xs-11 col-sm-11 mx-3 my-2 adminDashButton customRadius py-4 shadow-sm"
                  leftIcon={<FaNewspaper />}
                  onClick={() => {
                    navigate("/superAdmin/allEnrollments");
                  }}
                >
                  All Enrollments
                </Button>
                <Button
                  className="col-lg-3 col-md-3 col-xs-11 col-sm-11 mx-3 my-2 adminDashButton customRadius py-4 shadow-sm"
                  leftIcon={<FaNewspaper />}
                  onClick={() => {
                    navigate("/superAdmin/allAgreements");
                  }}
                >
                  All Agreements
                </Button>

                <Button
                  className="col-lg-3 col-md-3 col-xs-11 col-sm-11 mx-3 my-2 adminDashButton customRadius py-4 shadow-sm"
                  leftIcon={<FaTable />}
                  onClick={() => {
                    navigate("/superAdmin/allStudentsTable");
                  }}
                >
                  All Students
                </Button>
                <Button
                  className="col-lg-3 col-md-3 col-xs-11 col-sm-11 mx-3 my-2 adminDashButton customRadius py-4 shadow-sm"
                  leftIcon={<FaTable />}
                  onClick={() => {
                    navigate("/superAdmin/forms");
                  }}
                >
                  Main Forms
                </Button>

                <Button
                  className="col-lg-3 col-md-3 col-xs-11 col-sm-11 mx-3 my-2 adminDashButton customRadius py-4 shadow-sm"
                  leftIcon={<FaList />}
                  onClick={() => {
                    navigate("/superAdmin/showList");
                  }}
                >
                  Users Area
                </Button>
              </div>
            </div>
            <div className="col-3">
              <div className="d-none d-sm-none d-md-block my-3">
                <div style={{ color: "silver" }}>
                  <div>
                    Auth :{" "}
                    <span style={{ color: "black" }}>
                      <b>{user?.userName?.toUpperCase()}</b>
                    </span>
                  </div>
                  <div>
                    Location :{" "}
                    <span style={{ color: "black" }}>
                      <b>{"Frederick, MD"?.toUpperCase()}</b>
                    </span>{" "}
                  </div>
                </div>
                <div>
                  <img
                    src="/logo.png"
                    alt="logo"
                    style={{ height: "600px", opacity: "0.5" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllFormsOnly;
