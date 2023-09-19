import { Outlet } from "react-router-dom";
import SideBar from "../Components/shared/SideBar";
import TopNav from "../Components/shared/TopNav";

const LayoutMain = () => {
  return (
    <>
      <div className="w-full fixed z-20 bg-white">
        <TopNav />
      </div>
      <div className="min-h-[100vh] flex">
        <SideBar />
        <div className="flex-1 max-w-full overflow-hidden mx-2 mt-20 my-0 md:mx-10">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default LayoutMain;
