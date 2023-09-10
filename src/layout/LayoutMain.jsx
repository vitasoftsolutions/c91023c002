import { Outlet } from "react-router-dom";
// import Footer from "../components/Footer/Footer";
// import Nav_bar from "../components/shared/Nav_bar";

const LayoutMain = () => {
  return (
    <div className="min-h-[100vh] bg-erp_bg_main">
      <h1>Nav</h1>
      <div className="outlet_height">
        <Outlet></Outlet>
      </div>
      <h1>Footer</h1>
    </div>
  );
};

export default LayoutMain;
