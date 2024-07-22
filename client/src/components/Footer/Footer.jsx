import "./Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {

    return (
        <div className="footerContainer">
            <div className="firstContent">
                <span><b>Terracota Shoes</b></span>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/salesorder">Sales</Link></li>
                    <li>Bank</li>
                    <li>Records</li>
                    <li>Contact US</li>
                </ul>
            </div>
            <div className="secondContent">
                <span>Help</span>
                <ul>
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Twitter</li>
                </ul>
            </div>
            <div className="thirdContent">
            <span>Legal</span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            </div>
        </div>
    );
}
