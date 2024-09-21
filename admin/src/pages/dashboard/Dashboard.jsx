import React from 'react';
import './Dashboard.css'; // Import CSS file for styling

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-user-info">
          <img src="https://via.placeholder.com/50" alt="User Avatar" className="user-avatar" />
          <span className="user-name">John Doe</span>
        </div>
      </header>

      <section className="dashboard-cards">
        <div className="card">
          <h2 className="card-title">Total Sales</h2>
          <p className="card-value">$34,567</p>
        </div>
        <div className="card">
          <h2 className="card-title">Total Orders</h2>
          <p className="card-value">1234</p>
        </div>
        <div className="card">
          <h2 className="card-title">New Customers</h2>
          <p className="card-value">567</p>
        </div>
        <div className="card">
          <h2 className="card-title">Pending Orders</h2>
          <p className="card-value">89</p>
        </div>
      </section>

      <section className="dashboard-charts">
        <div className="chart">
          <h2 className="chart-title">Sales Overview</h2>
          {/* Placeholder for a chart */}
          <div className="chart-placeholder">Chart Here</div>
        </div>
        <div className="chart">
          <h2 className="chart-title">Order Trends</h2>
          {/* Placeholder for a chart */}
          <div className="chart-placeholder">Chart Here</div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
