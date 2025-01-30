import PropTypes from "prop-types";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = ({ labels, incomeData, expenseData }) => {
  // Line Chart Data
  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: true,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "green",
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h2>Income vs. Expenses</h2>

      {/* Line Chart */}
      <Line data={lineChartData} options={{ responsive: true }} />

      <br />

      {/* Bar Chart */}
      <Bar data={barChartData} options={{ responsive: true }} />
    </div>
  );
};

// PropTypes validation
IncomeExpenseChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  incomeData: PropTypes.arrayOf(PropTypes.number).isRequired,
  expenseData: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default IncomeExpenseChart;
