import React, { useContext } from 'react';
import AddressContext from '../../context/AddressApi';
import './UserAddress.css'; // Import CSS for styling

function Address() {
  const { Address } = useContext(AddressContext);

  const handleEdit = () => {
    // Logic for editing the address goes here
    console.log('Edit address');
  };

  const handleDelete = () => {
    // Logic for deleting the address goes here
    console.log('Delete address');
  };

  const handleCreateNew = () => {
    // Logic for creating a new address goes here
    console.log('Create new address');
  };

  return (
    <div className="address-container">
      <h2 className="address-heading">Address Information</h2>
      {Address ? (
        <>
          <div className="address-info">
            <span className="address-label">First Name:</span>
            <span className="address-data">{Address.firstName}</span>
          </div>
          <div className="address-info">
            <span className="address-label">Last Name:</span>
            <span className="address-data">{Address.lastName}</span>
          </div>
          <div className="address-info">
            <span className="address-label">Apartment Number:</span>
            <span className="address-data">{Address.apartmentNumber}</span>
          </div>
          <div className="address-info">
            <span className="address-label">Street Address:</span>
            <span className="address-data">{Address.streetAddress}</span>
          </div>
          <div className="address-info">
            <span className="address-label">Landmark:</span>
            <span className="address-data">{Address.landmark}</span>
          </div>
          <div className="address-info">
            <span className="address-label">Place:</span>
            <span className="address-data">{Address.place}</span>
          </div>
          <div className="address-info">
            <span className="address-label">City:</span>
            <span className="address-data">{Address.city}</span>
          </div>
          <div className="address-info">
            <span className="address-label">District:</span>
            <span className="address-data">{Address.district}</span>
          </div>
          <div className="address-info">
            <span className="address-label">Postal Code:</span>
            <span className="address-data">{Address.postalCode}</span>
          </div>
          <div className="address-info">
            <span className="address-label">Phone Number:</span>
            <span className="address-data address-phone-number">{Address.phoneNumber}</span>
          </div>

          <div className="button-group">
            <button className="edit-btn" onClick={handleEdit}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </>
      ) : (
        <p>No address found.</p>
      )}
      
      <button className="create-btn" onClick={handleCreateNew}>Create New Address</button>
    </div>
  );
}

export default Address;
