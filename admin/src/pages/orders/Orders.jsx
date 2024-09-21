import React, { useState } from 'react';
import './Orders.css'; // Ensure this file contains your desired styles

function Orders() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample order data
  const orders = [
    { id: 1, customer: 'John Doe', status: 'Shipped', date: '2024-09-10', total: '$120.00' },
    { id: 2, customer: 'Jane Smith', status: 'Processing', date: '2024-09-12', total: '$75.00' },
    { id: 3, customer: 'Alice Johnson', status: 'Delivered', date: '2024-09-15', total: '$200.00' },
    // Add more sample orders as needed
  ];

  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => 
    (statusFilter === 'all' || order.status === statusFilter) &&
    (order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
     order.id.toString().includes(searchQuery))
  );

  return (
    <div className="orders">
      <h1>Orders</h1>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search by customer or order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.status}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-orders">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
