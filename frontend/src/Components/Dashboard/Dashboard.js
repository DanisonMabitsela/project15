import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import Chart from "../Chart/Chart";
import "./Dashboard.css";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    // Fetch the incomes and expenses data on component mount
    getIncomes();
    getExpenses();
  }, []);

  return (
    <div className="dashboard">
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            {/* Render the Chart component */}
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>Rand {totalIncome()}</p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>Rand {totalExpenses()}</p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>Rand {totalBalance()}</p>
              </div>
            </div>
          </div>
          <div className="history-con">
            {/* Render the History component */}
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span> Max
            </h2>
            <div className="salary-item">
              <p>R{Math.min(...incomes.map((item) => item.amount))}</p>
              <p>R{Math.max(...incomes.map((item) => item.amount))}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span> Max
            </h2>
            <div className="salary-item">
              <p>R{Math.min(...expenses.map((item) => item.amount))}</p>
              <p>R{Math.max(...expenses.map((item) => item.amount))}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </div>
  );
}

export default Dashboard;
