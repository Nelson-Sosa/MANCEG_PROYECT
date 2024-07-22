import "./reports.css";
import { AvatarSection, QuickActions } from "components";

export const Reports = () => {
  return (
    <div className="mainReportContainer">
      <div className="reportsContainer">
        <h1>Reports</h1>
      </div>
      <div className="rightPanel">
        <AvatarSection />
        <QuickActions />
      </div>
    </div>
  );
};
