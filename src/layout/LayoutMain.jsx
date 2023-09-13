import { Outlet } from "react-router-dom";
import SideBar from "../Components/shared/SideBar";

const LayoutMain = () => {
  return (
    <div className="min-h-[100vh] flex">
      <SideBar />
      <div className="outlet_height flex-1 max-w-full overflow-hidden mx-2 my-10 md:mx-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default LayoutMain;
