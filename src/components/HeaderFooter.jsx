import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const HeaderFooter = ({ children }) => {
  return (
    <React.Fragment>
      <div className="min-h-[100vh]">
        <Navbar />
        {children}
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default HeaderFooter;
