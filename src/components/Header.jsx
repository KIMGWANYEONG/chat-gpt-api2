import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <header className="bg-green-500 px-2 py-4 flex justify-center gap-8 shadow-md">
      <Link
        className={`link-style ${location.pathname === "/" && "text-gray-900"}`}
        to="/"
      >
        질문하기
      </Link>
      <Link
        className={`link-style ${
          location.pathname === "/chat-list" && "text-gray-900"
        }`}
        to="/chat-list"
      >
        질문내역
      </Link>
    </header>
  );
};

export default Header;
