import { Outlet } from "react-router-dom";
import Header from "./Header";
import imgfile from "./gptlogo.jpeg";

const Layout = () => {
  return (
    <div className="max-w-screen-md mx-auto min-h-screen shadow-md">
      <img className="flex flex-auto" src={imgfile} />
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
