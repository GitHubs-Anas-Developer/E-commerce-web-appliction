import React, { useState } from 'react';
import './Settings.css'; // Ensure this file contains your desired styles

function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settings-tabs">
        <button
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => handleTabChange('general')}
        >
          General
        </button>
        <button
          className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => handleTabChange('account')}
        >
          Account
        </button>
        <button
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => handleTabChange('notifications')}
        >
          Notifications
        </button>
        <button
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => handleTabChange('security')}
        >
          Security
        </button>
      </div>
      <div className="settings-content">
        {activeTab === 'general' && (
          <div className="settings-section">
            <h2>General Settings</h2>
            <p>Here you can configure general settings for your application.</p>
            {/* Add form or settings options here */}
          </div>
        )}
        {activeTab === 'account' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <p>Manage your account information and preferences.</p>
            {/* Add form or settings options here */}
          </div>
        )}
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <h2>Notification Settings</h2>
            <p>Adjust your notification preferences here.</p>
            {/* Add form or settings options here */}
          </div>
        )}
        {activeTab === 'security' && (
          <div className="settings-section">
            <h2>Security Settings</h2>
            <p>Manage your security settings, such as password changes and two-factor authentication.</p>
            {/* Add form or settings options here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
