import "./BarChart.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);

export const BarChart = () => {
  const optionsChart = {};

  const dataChart = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgb(0, 255, 255)",
        border: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Orders",
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: "rgb(255, 99, 132)",
        border: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <div className="barChart">
      <Bar data={dataChart} options={optionsChart} />
    </div>
  );
};
