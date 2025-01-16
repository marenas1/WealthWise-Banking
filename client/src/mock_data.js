export const lineChartData= {
    //x axis
    labels: [
        "January",
        "February",
        "March",
        "April",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    //y axis
    datasets: [
        {
            label: "Balance",
            data: [2000,5000,10000,6000,8000,2000,5000,4500,6000,8000,7000,9000],
            borderColor: "blue"
        },
        {
            label: "Income",
            data: [5000,5000,5000,5000,5000,5000,5000,5000,5000,6000,6000],
            borderColor: "green"
        },
        {
            label: "Spent",
            data: [3000,2000,0,9000,3000,11000,2000,5500,4000,3000,6000],
            borderColor: "red"
        },
    ],
};

export const recentTransactions = [
    { id: 1, date: "2024-12-01", category: "Income", description: "Part-time Job Paycheck", amount: 400.00 },
    { id: 2, date: "2024-12-02", category: "Expense", description: "Groceries", amount: -75.00 },
    { id: 3, date: "2024-12-02", category: "Expense", description: "Coffee", amount: -4.50 },
    { id: 4, date: "2024-12-03", category: "Expense", description: "Streaming Subscription", amount: -14.99 },
    { id: 5, date: "2024-12-04", category: "Expense", description: "Laundry", amount: -10.00 },
    { id: 6, date: "2024-12-07", category: "Expense", description: "Restaurant", amount: -25.00 },
    { id: 7, date: "2024-12-07", category: "Expense", description: "Holiday Gifts", amount: -120.00 },
    { id: 8, date: "2024-12-08", category: "Expense", description: "Groceries", amount: -80.00 },
    { id: 9, date: "2024-12-08", category: "Expense", description: "Transportation (Uber)", amount: -30.00 },
    { id: 10, date: "2024-12-08", category: "Income", description: "Freelance Tutoring", amount: 50.00 },
    { id: 11, date: "2024-12-09", category: "Expense", description: "Books & Supplies", amount: -100.00 },
    { id: 12, date: "2024-12-10", category: "Expense", description: "Holiday Decorations", amount: -25.00 },
    { id: 13, date: "2024-12-12", category: "Expense", description: "Utilities (Internet)", amount: -50.00 },
    { id: 14, date: "2024-12-15", category: "Income", description: "Scholarship Refund", amount: 250.00 },
    { id: 15, date: "2024-12-16", category: "Expense", description: "Groceries", amount: -85.00 },
    { id: 16, date: "2024-12-16", category: "Expense", description: "Coffee", amount: -6.00 },
    { id: 17, date: "2024-12-17", category: "Expense", description: "Club Dues", amount: -35.00 },
    { id: 18, date: "2024-12-20", category: "Expense", description: "Holiday Gifts", amount: -150.00 },
    { id: 19, date: "2024-12-22", category: "Expense", description: "Clothing Purchase", amount: -100.00 },
    { id: 20, date: "2024-12-23", category: "Expense", description: "Holiday Dinner Supplies", amount: -50.00 },
    { id: 21, date: "2024-12-23", category: "Expense", description: "Transportation (Gas)", amount: -40.00 },
    { id: 22, date: "2024-12-24", category: "Expense", description: "Holiday Party", amount: -70.00 },
    { id: 23, date: "2024-12-30", category: "Expense", description: "Phone Bill", amount: -50.00 },
    { id: 24, date: "2024-12-30", category: "Income", description: "Part-time Job Paycheck", amount: 400.00 },
    { id: 25, date: "2024-12-31", category: "Expense", description: "New Year's Eve Celebration", amount: -80.00 }
  ];
  
  

export const config = {
    type: 'line',
    data: lineChartData,
    options: {
      lineTension:0.5,
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Year to date finances'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
      
      }
    },
  };
export const amountData= {
    balance:{
        label:"Balance",
        amount: "1000"
    },
    expenses:{
        label:"Expenses",
        amount: "500"
    },
    budget:{
        label:"Budget",
        amount: "100"
    },
};

export let UserInvestmentData= {
    budget:{
        label:"Budget",
        amount: "100"
    },
    years:{
        label:"Years",
        amount: "5"
    },
    growth:{
        label:"Growth",
        amount: "5"
    },
};