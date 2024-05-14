import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="bg-red-100 max-w-screen-md mx-auto min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
