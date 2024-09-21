import React from 'react';
import './Footer.css'; // Optional: add styles for footer

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-4">
      <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
      <ul className="list-inline">
        <li className="list-inline-item"><a href="/privacy" className="text-light">Privacy Policy</a></li>
        <li className="list-inline-item"><a href="/terms" className="text-light">Terms of Service</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
