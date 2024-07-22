import "./Nav.css";
import { Link } from "react-router-dom";
import dashboardImg from "../../Assets/dashboard.png";
import inventoryImg from "../../Assets/inventory.png";
import salesorderImg from "../../Assets/salesorder.svg";
import supliersImg from "../../Assets/suppliers.png";
import reportsImg from "../../Assets/reports.png";
import helpImg from "../../Assets/help.svg";
import settingImg from "../../Assets/settings.png";

export const Nav = () => {
  return (
    <nav className="navContainer">
      <ul className="ulContainer">
        <span>
          <b>GENERAL</b>
        </span>
        <li>
          <img src={dashboardImg} alt="Dashboard Icon"></img>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <img src={inventoryImg} alt="Inventory Icon" />
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <img src={salesorderImg} alt="Sales Order Icon" />
          <Link to="/salesorder">Sales Order</Link>
        </li>
        <li>
          <img src={supliersImg} alt="Supliers Icon" />
          <Link to="/supliers">Supliers</Link>
        </li>
        <li>
          <img src={reportsImg} alt="Report Icon" />
          <Link to="/reports">Reports</Link>
        </li>
      </ul>
    </nav>
  );
};
