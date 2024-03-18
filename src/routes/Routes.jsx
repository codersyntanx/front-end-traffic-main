import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./PrivateRoutes";

// import UploadDocuments from "../pages/Student/Features/UploadDocuments";
import ShowModules from "../pages/Student/Features/ShowModules";
import AttemptQuiz from "../pages/Student/Features/AttemptQuiz";
import ContactUs from "../pages/ContactUs";
import ShowAdmins from "../pages/SuperAdmin/ShowAdmins";
import CreateAdmin from "../pages/SuperAdmin/CreateAdmin";
import EmailVerified from "../pages/EmailVerified";
import StudentDashboard from "../pages/Student/StudentDash";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import EnrollmentAgreement from "../pages/Student/Features/EnrollmentAgreement";
import ApplicationForEnrollment from "../pages/Student/Features/ApplicationForEnrollment";
import DataCollectionForm from "../pages/Student/Features/DataCollectionForm";
import EditProfile from "../pages/Student/Features/EditProfile";
import SuperShowStudentProfile from "../pages/SuperAdmin/SuperShowStudentProfile";
import SuperShowStudents from "../pages/SuperAdmin/ShowStudents";
import SuperChangeStudentPassword from "../pages/SuperAdmin/SuperChangeStudentPassword";
import SuperChangeAdminPassword from "../pages/SuperAdmin/SuperChangeAdminPassword";
import DataCollectionFormSuperAdmin from "../pages/SuperAdmin/DataCollectionForm";
import AdminRoutes from "./AdminRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import SuperShowStudentDocs from "../pages/SuperAdmin/SuperShowStudentDocs ";
import AdminApplicationForEnrollment from "../pages/SuperAdmin/AdminApplicationForEnrollment";
import AdminEnrollmentAgreement from "../pages/SuperAdmin/AdminEnrollmentAgreement";
import ShowDataCollections from "../pages/Admin/ShowEnrollments";
import ShowEnrollmentsApplications from "../pages/Admin/ShowEnrollmentsApplications copy";
import ShowAgreements from "../pages/Admin/ShowAgreements";
import ShowStudentsTable from "../pages/Admin/ShowStudentsTable";
import AboutUs from "../pages/AboutUs";
import MainLogin from "../pages/Student/Basic/MainLogin";
import CreateAccount from "../pages/Student/Basic/CreateAccount";
import ForgotPasswordStudent from "../pages/Student/Basic/FotgotPasswordStudent";
import StudentRoutes from "./StudentRoutes";
import CompletionCertificate from "../pages/Student/Features/CompletionCertificate";
import StudentCollectionDetailed from "../pages/SuperAdmin/StudentCollectionDetailed";
import CorrectStudentResult from "../pages/Student/Features/CorrectStudentResults";
import Forms from "../pages/Admin/Forms";
import EditFormData from "../pages/Admin/EditFormData";
import ShowFormData from "../pages/Admin/ShowFormData";
import CollectForm from "../pages/Student/Features/CollectForm";
import AllFormsOnly from "../pages/SuperAdmin/AllFormsOnly";
import ManageModuleResult from "../pages/SuperAdmin/ManageModuleResult";
import ShowStudentModuleResults from "../pages/SuperAdmin/ShowStudentModuleResults";
import DeleteStudent from "../pages/SuperAdmin/DeleteStudent";
import HeaderFooter from "../components/HeaderFooter";
import UnderDevelopment from "../pages/Student/Features/UnderDev";

const AppRoutes = () => {
  return (
    <Router>
      <div
        className=""
        style={{
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<MainLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminRoutes />}>
              <Route element={<SuperAdminRoutes />}>
                <Route
                  path="/superAdmin/deleteStudent/:studentId"
                  element={
                    <HeaderFooter>
                      <DeleteStudent />
                    </HeaderFooter>
                  }
                />

                <Route
                  path="/superAdmin/manageModuleResult/:studentId"
                  element={
                    <HeaderFooter>
                      <ManageModuleResult />
                    </HeaderFooter>
                  }
                />

                <Route
                  path="/superAdmin/showModuleResult/:studentId"
                  element={
                    <HeaderFooter>
                      <ShowStudentModuleResults />
                    </HeaderFooter>
                  }
                />

                <Route
                  path="/superAdmin/showAll"
                  element={
                    <HeaderFooter>
                      <ShowAdmins />
                    </HeaderFooter>
                  }
                />
                <Route
                  path="/superAdmin/changePasswordAdmin/:adminEmail"
                  element={
                    <HeaderFooter>
                      <SuperChangeAdminPassword />
                    </HeaderFooter>
                  }
                />

                <Route
                  path="/superAdmin/dashboard"
                  element={
                    <HeaderFooter>
                      <SuperAdminDashboard />
                    </HeaderFooter>
                  }
                />
              </Route>

              <Route
                path="/superAdmin/allForms"
                element={
                  <HeaderFooter>
                    <AllFormsOnly />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/createAdmin"
                element={
                  <HeaderFooter>
                    <CreateAdmin />
                  </HeaderFooter>
                }
              />

              <Route
                path="/Admin/showList"
                element={
                  <HeaderFooter>
                    <StudentCollectionDetailed />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/showList"
                element={
                  <HeaderFooter>
                    <StudentCollectionDetailed />
                  </HeaderFooter>
                }
              />

              <Route
                path="/Admin/Certificate/:studentId"
                element={
                  <HeaderFooter>
                    <CompletionCertificate />
                  </HeaderFooter>
                }
              />

              <Route
                path="/Admin/showAllStudents"
                element={
                  <HeaderFooter>
                    <SuperShowStudents />
                  </HeaderFooter>
                }
              />
              <Route
                path="/superAdmin/showAllStudents"
                element={
                  <HeaderFooter>
                    <SuperShowStudents />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/student/dataCollection/:id"
                element={
                  <HeaderFooter>
                    <DataCollectionFormSuperAdmin />
                  </HeaderFooter>
                }
              />
              <Route
                path="/superAdmin/student/enrollmentApplication/:id"
                element={
                  <HeaderFooter>
                    <AdminApplicationForEnrollment />
                  </HeaderFooter>
                }
              />
              <Route
                path="/superAdmin/student/enrollAgreement/:id"
                element={
                  <HeaderFooter>
                    <AdminEnrollmentAgreement />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/allStudentsTable"
                element={
                  <HeaderFooter>
                    <ShowStudentsTable />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/allCollectedData"
                element={
                  <HeaderFooter>
                    <ShowDataCollections />
                  </HeaderFooter>
                }
              />
              <Route
                path="/superAdmin/allEnrollments"
                element={
                  <HeaderFooter>
                    <ShowEnrollmentsApplications />
                  </HeaderFooter>
                }
              />
              <Route
                path="/superAdmin/forms"
                element={
                  <HeaderFooter>
                    <Forms />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/editForm/:studentId"
                element={
                  <HeaderFooter>
                    <EditFormData />
                  </HeaderFooter>
                }
              />
              <Route
                path="/superAdmin/form/:studentId"
                element={
                  <HeaderFooter>
                    <ShowFormData />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/allAgreements"
                element={
                  <HeaderFooter>
                    <ShowAgreements />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/student/:studentId"
                element={
                  <HeaderFooter>
                    <SuperShowStudentProfile />
                  </HeaderFooter>
                }
              />
              <Route
                path="/superAdmin/student/docs/:studentId"
                element={
                  <HeaderFooter>
                    <SuperShowStudentDocs />
                  </HeaderFooter>
                }
              />

              <Route
                path="/superAdmin/changePasswordStudent/:studentEmail"
                element={
                  <HeaderFooter>
                    <SuperChangeStudentPassword />
                  </HeaderFooter>
                }
              />

              <Route
                path="/Admin/ShowAllStudents"
                element={
                  <HeaderFooter>
                    <SuperShowStudents />
                  </HeaderFooter>
                }
              />
              <Route
                path="/Admin/studentProfile"
                element={
                  <HeaderFooter>
                    <SuperShowStudentProfile />
                  </HeaderFooter>
                }
              />
              <Route
                path="/Admin/dashboard"
                element={
                  <HeaderFooter>
                    <AdminDashboard />
                  </HeaderFooter>
                }
              />
              <Route
                path="Admin/correctResult"
                element={
                  <HeaderFooter>
                    <CorrectStudentResult />
                  </HeaderFooter>
                }
              />
            </Route>

            <Route element={<StudentRoutes />}>
              {/* <Route
                path="/student/uploadDocument"
                element={<UploadDocuments />}
              />
               */}

              <Route
                path="/student/dataCollectionForm"
                element={
                  <HeaderFooter>
                    <DataCollectionForm />
                  </HeaderFooter>
                }
              />

              <Route path="/student/fillData" element={<CollectForm />} />

              <Route
                path="/student/applicationForEnrollment"
                element={
                  <HeaderFooter>
                    <ApplicationForEnrollment />
                  </HeaderFooter>
                }
              />
              <Route
                path="/student/enrollmentAgreement"
                element={
                  <HeaderFooter>
                    <EnrollmentAgreement />
                  </HeaderFooter>
                }
              />
              <Route
                path="/student/Certificate/:studentId"
                element={
                  <HeaderFooter>
                    <CompletionCertificate />
                  </HeaderFooter>
                }
              />

              <Route
                path="/student/showModules"
                element={
                  <HeaderFooter>
                    <ShowModules />
                  </HeaderFooter>
                }
              />
              <Route
                path="/student/attempQuiz/:quiz"
                element={
                  <HeaderFooter>
                    <AttemptQuiz />
                  </HeaderFooter>
                }
              />

              <Route
                path="/student/editProfile"
                element={
                  <HeaderFooter>
                    <EditProfile />
                  </HeaderFooter>
                }
              />

              <Route
                path="/under-development"
                element={
                  <HeaderFooter>
                    <UnderDevelopment />
                  </HeaderFooter>
                }
              />

              <Route
                path="/student/changePassword"
                element={<ForgotPasswordStudent />}
              />
              <Route
                path="/student/dashboard"
                element={
                  <HeaderFooter>
                    <StudentDashboard />
                  </HeaderFooter>
                }
              />
              {/* <Route
                path="/student/myCertificate"
                element={<CompletionCertificate />}
              /> */}
            </Route>
          </Route>

          {/* <Route path="/DRIVER_CONNECT" element={<DriverConnect />} /> */}
          <Route path="/Admin/Login" element={<MainLogin />} />
          <Route path="/emailVerified" element={<EmailVerified />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/student/SignUp" element={<CreateAccount />} />
          <Route path="/student/Login" element={<MainLogin />} />
          <Route
            path="/student/forgotPassword"
            element={<ForgotPasswordStudent />}
          />

          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/tokenExpired"
            element={
              <HeaderFooter>
                <div className="display-3 text-center"> Token Expired </div>
              </HeaderFooter>
            }
          />
          <Route
            path="/*"
            element={
              <HeaderFooter>
                <div className="display-3 text-center"> Not Found </div>
              </HeaderFooter>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};
export default AppRoutes;
