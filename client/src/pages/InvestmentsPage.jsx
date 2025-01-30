import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Navbar from "../components/Navbar";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function InvestmentsPage() {
  const [monthlyContribution, setMonthlyContribution] = useState(100); // Monthly contribution
  const [growthRate, setGrowthRate] = useState(5.7); // Default growth rate for Moderate Strategy
  const [activeStrategy, setActiveStrategy] = useState("Moderate"); // Default to Moderate Strategy
  const [showStrategies, setShowStrategies] = useState(false); // Toggle to show/hide strategies

  // Set the default strategy when the component mounts
  useEffect(() => {
    setActiveStrategy("Moderate");
    setGrowthRate(5.7); // Default growth rate for Moderate Strategy
  }, []);

  // Function to update growth rate and active strategy based on selected strategy
  const updateGrowthRate = (strategy) => {
    if (strategy === "Aggressive") {
      setGrowthRate(6.5); // Aggressive strategy growth rate
      setActiveStrategy("Aggressive");
    } else if (strategy === "Moderate") {
      setGrowthRate(5.7); // Moderate strategy growth rate
      setActiveStrategy("Moderate");
    } else if (strategy === "Conservative") {
      setGrowthRate(5.0); // Conservative strategy growth rate
      setActiveStrategy("Conservative");
    }
  };

  // Generate investment growth data for 10 years (lower, average, and upper bounds)
  const generateInvestmentData = () => {
    let lowerBound = [];
    let upperBound = [];
    let average = [];
    let balanceLower = 0;
    let balanceUpper = 0;
    let balanceAverage = 0;

    for (let i = 0; i <= 10; i++) {
      // Lower Bound (lower growth rate)
      balanceLower += monthlyContribution * 12;
      balanceLower *= 1 + (growthRate - 1) / 100;
      lowerBound.push({ year: i, balance: balanceLower.toFixed(2) });

      // Upper Bound (upper growth rate)
      balanceUpper += monthlyContribution * 12;
      balanceUpper *= 1 + (growthRate + 5) / 100;
      upperBound.push({ year: i, balance: balanceUpper.toFixed(2) });

      // Average (default growth rate)
      balanceAverage += monthlyContribution * 12;
      balanceAverage *= 1 + growthRate / 100;
      average.push({ year: i, balance: balanceAverage.toFixed(2) });
    }

    return { lowerBound, upperBound, average };
  };

  const investmentData = generateInvestmentData();
  const finalInvestmentValue = investmentData.average[investmentData.average.length - 1]?.balance;

  // Calculate normal savings (without growth)
  const normalSavings = (monthlyContribution * 12 * 10).toFixed(2);

  // Chart Data (Lower, Average, Upper Bound)
  const chartData = {
    labels: investmentData.average.map((entry) => entry.year),
    datasets: [
      {
        label: "Lower Bound",
        data: investmentData.lowerBound.map((entry) => entry.balance),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderDash: [5, 5],
        tension: 0.3,
      },
      {
        label: "Average",
        data: investmentData.average.map((entry) => entry.balance),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
      {
        label: "Upper Bound",
        data: investmentData.upperBound.map((entry) => entry.balance),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Years",
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: "Investment Value ($)",
        },
      },
    },
  };

  return (
    <div className="bg-[#F5F5F5] dark:bg-gray-900 dark:text-white h-full">
      <Navbar />
      <br></br>

      {/* Final Investment Value and Normal Savings */}
      <div className="p-6 bg-green-500 dark:bg-green-700 text-white text-center rounded-md mb-6 flex justify-between">
        <div className="w-1/2 mr-2">
          <h2 className="text-2xl font-semibold">Final Investment Value</h2>
          <p className="text-3xl font-bold">${finalInvestmentValue}</p>
        </div>
        <div className="w-1/2 ml-2">
          <h2 className="text-2xl font-semibold">Normal Savings (No Growth)</h2>
          <p className="text-3xl font-bold">${normalSavings}</p>
        </div>
      </div>

      {/* Strategy Type Display */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold">Current Strategy: {activeStrategy}</h3>
      </div>

      {/* Monthly Contribution Slider */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Adjust Monthly Contribution</h2>
        <div className="mb-4">
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full"
            title="Slide to adjust the monthly contribution"
          />
          <p className="text-center">${monthlyContribution}</p>
        </div>
      </div>

      {/* Investment Strategy Overview (Dropdown from Button) */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md mb-6">
        <button
          onClick={() => setShowStrategies(!showStrategies)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {showStrategies ? "Hide Strategies" : "Show Strategies"}
        </button>

        {/* Show Strategies if toggled */}
        {showStrategies && (
          <div className="space-y-4">
            {[
              {
                name: "Aggressive",
                description: "This strategy focuses heavily on stocks, aiming for higher returns with higher risk.",
                onClick: () => updateGrowthRate("Aggressive"),
              },
              {
                name: "Moderate",
                description: "This strategy balances stocks and bonds, aiming for a moderate risk and return.",
                onClick: () => updateGrowthRate("Moderate"),
              },
              {
                name: "Conservative",
                description: "This strategy focuses on minimizing risk with a heavier allocation towards bonds.",
                onClick: () => updateGrowthRate("Conservative"),
              },
            ].map((strategy, index) => (
              <div key={index} className="mt-6">
                <h3 className="text-lg font-semibold">{strategy.name}</h3>
                <p>{strategy.description}</p>
                <button
                  onClick={strategy.onClick}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Select {strategy.name}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Investment Growth Chart */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full sm:w-[70vw] md:w-[75vw] lg:w-[70vw] h-[50vh] lg:h-[63vh]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default InvestmentsPage;
