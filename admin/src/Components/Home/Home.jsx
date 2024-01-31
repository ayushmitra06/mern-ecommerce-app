import React from 'react';
import './Home.css';

const Home = () => {


    return (
        <div className="dashboard-home">
            <div className="welcome-section">
                <h1>Welcome to Admin Dashboard</h1>
                <p>Manage your eCommerce system efficiently.</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-box">
                    <h2>Users</h2>
                    <p>1200</p>
                </div>
                <div className="stat-box">
                    <h2>Orders</h2>
                    <p>500</p>
                </div>
                <div className="stat-box">
                    <h2>Products</h2>
                    <p>800</p>
                </div>
            </div>

            <div className="dashboard-charts">
                {/* Add your sales chart component here */}
                <div className="sales-chart">
                    {/* Placeholder for sales chart */}
                    <h2>Sales Chart</h2>
                    {/* You can use a chart library like Chart.js to display actual sales data */}
                </div>
            </div>

            <div className="last-row">
                <div className="recent-orders">
                    <h2>Recent Orders</h2>
                    <ul>
                        <li>Order #1234 - Shipped</li>
                        <li>Order #5678 - Processing</li>
                        <li>Order #91011 - Delivered</li>
                        {/* Add more recent orders */}
                    </ul>
                </div>
                <div className="quick-links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li>Manage Products</li>
                        <li>View Sales Reports</li>
                        <li>Customer Support</li>
                        {/* Add more quick links */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
