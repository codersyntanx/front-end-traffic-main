import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerified = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 5000);
  return (
    <div className="container">
      <div className="display-3 text-center">Email Verified</div>
      <div className="display-3 text-center">
        You will be redirected to Offical Site to Have Better Experience
      </div>
    </div>
  );
};
export default EmailVerified;
