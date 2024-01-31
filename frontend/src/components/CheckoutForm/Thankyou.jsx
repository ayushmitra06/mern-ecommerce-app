import React from 'react';
import './ThankYouPage.css'; // You can create a CSS file for styling
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h1>Thank You for Your Purchase!</h1>
        <p>Your order has been successfully placed.</p>

        <div className="logo-container">
          {/* Replace the following URLs with your actual logo URLs */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png" alt="Logo 1" />
        </div>

        <p>We appreciate your business. Your items will be shipped soon.</p>

        <p>For any inquiries, please contact our customer support.</p>

        <div className="thank-you-actions">
          <Link to='/'><button className="continue-shopping-btn">Continue Shopping</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
