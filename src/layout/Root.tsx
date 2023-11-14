import React from "react";
import SideNav from "../components/sidenav/SideNav";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className={"w-full overflow-hidden"}>
      <div className="flex flex-col justify-between h-screen lg:flex-row md:space-y-3 lg:space-y-0 ">
        <div className="w-full  hidden lg:block animate__fadeInLeft shadow-md   border-r lg:h-full   lg:w-1/6 pb-24 ">
          <SideNav />
        </div>
        <section
          className={
            "w-full lg:w-5/6 md:p-5  p-3   shadow-md    bg-[#FDFDFF] h-full pb-16 overflow-y-scroll"
          }
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Root;
