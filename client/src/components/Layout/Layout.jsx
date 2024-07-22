import { Nav } from "../Nav/Nav";
import { Header } from "../Header/Header";
import { useLocation } from "react-router-dom";
import "./Layout.css";
// import { Footer } from "../Footer/Footer";

export const Layout = ({ children }) => {
  const { pathname } = useLocation();

  if (pathname === "/login" || pathname === "/register" || pathname === "/welcome") {  
    return children;
  } else {
    return (
      <div className="layoutContainer">
        <div className="rowUp">
          <Header />
        </div>
        <div className="columns">
          <Nav />
          {children}
        </div>
        {/* <div className="rowDown">
          {<Footer />}
        </div> */}
      </div>
    );
  }
};
