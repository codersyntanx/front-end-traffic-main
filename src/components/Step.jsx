import React from "react";

const Step = ({ number, desc, onClickHandler = () => {}, children, icon }) => {
  return (
    <div className="group flex items-center mt-3">
      <span className="rounded-full w-14 h-14 mt-[-20px] text-center font-extrabold bg-[rgba(41,41,41,0.7)] group-hover:bg-[rgba(41,41,41,0.89)] text-white text-[30px] transition-all flex items-center justify-center peer">
        {number}
      </span>

      <div className="flex items-center mb-4 w-full">
        <div className="h-1 bg-[rgba(41,41,41,0.2)]  transition-all peer ml-4 w-2/5"></div>
        <div className="ml-4 flex-1" onClick={onClickHandler}>
          <div className="border rounded-lg text-center min-w-[300px] text-lg px-1  py-1  bg-[rgba(41,41,41,0.5)] hover:bg-[rgba(41,41,41,0.7)]  text-white transition-all peer">
            <p className="flex font-bold items-center justify-center text-center">
              {desc}
              <span className="pl-1">{icon}</span>
            </p>
            {children}
          </div>
        </div>
        <div className="h-1 bg-[rgba(41,41,41,0.2)]  transition-all peer ml-4 w-2/5"></div>
      </div>
    </div>
  );
};

export default Step;
