import React, { useState, useEffect } from 'react';
import './Customers.css'; // Ensure this file contains your desired styles
import { FaEdit, FaTrash } from 'react-icons/fa';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    // Fetch initial customer data
    // Example: Fetch from an API
    // fetch('/api/customers')
    //   .then(response => response.json())
    //   .then(data => setCustomers(data));

    // Sample static data for demonstration
    const sampleCustomers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '098-765-4321',
      },
    ];

    setCustomers(sampleCustomers);
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCustomerDeselect = () => {
    setSelectedCustomer(null);
  };

  const handleEditCustomer = (customer) => {
    // Handle edit customer logic
    alert(`Edit customer: ${customer.name}`);
  };

  const handleDeleteCustomer = (customer) => {
    // Handle delete customer logic
    if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      setCustomers(customers.filter(c => c.id !== customer.id));
      setSelectedCustomer(null);
    }
  };

  return (
    <div className="customers">
      <h1>Manage Customers</h1>
      <div className="customers-container">
        {selectedCustomer ? (
          <div className="customer-details">
            <button className="back-btn" onClick={handleCustomerDeselect}>Back</button>
            <h2>Customer Details</h2>
            <div className="customer-info">
              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <div className="customer-actions">
                <button className="edit-btn" onClick={() => handleEditCustomer(selectedCustomer)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteCustomer(selectedCustomer)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="customer-list">
            <h2>Customer List</h2>
            <ul>
              {customers.map(customer => (
                <li key={customer.id} className="customer-item" onClick={() => handleCustomerSelect(customer)}>
                  <h3>{customer.name}</h3>
                  <p>{customer.email}</p>
                  <p>{customer.phone}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
