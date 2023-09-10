import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/LayoutMain";
import Login_Page from "../pages/Login_Page";
// import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        // element: <Home />,
      },
      {
        path: "/login",
        element: <Login_Page />,
      },
    ],
  },
  //   {
  //     path: "*",
  //     element: <ErrorPage />,
  //   },
]);