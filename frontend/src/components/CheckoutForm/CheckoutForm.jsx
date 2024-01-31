// CheckoutForm.jsx
import React, { useEffect, useState } from 'react';
import './CheckoutForm.css';

const CheckoutForm = ({ onCheckout }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [contact, setContact] = useState('');
  const [totalCartValue, setTotalCartValue] = useState(0);

  useEffect(()=>{
    setTotalCartValue(onCheckout ? onCheckout.totalCartValue : 0);
  },[onCheckout])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  
    // Validate and submit the form data
    if (name && address && city && state && zipCode && contact) {
      const formData = {
        name,
        address,
        city,
        state,
        zipCode,
        contact,
        totalCartValue,
      };

      console.log('Form Data:', formData); // Log the form data
      
  
      // Pass the form data to the parent component (CheckoutPage)
      onCheckout(formData);
    } else {
      // Handle form validation error
      alert('Please fill in all the required fields.');
    }
  };
  
  return (
    <div className="checkout-form">
      <h2>Delivery Details</h2>
      <div className='form-container'>
         <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="larger-input"
          />
        </div>

        <div className="form-group city-state">
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="larger-input"
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group contact-zip">
          <div>
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="total">Cart Total:</label>
            <input
              type="text"
              value={`${totalCartValue}`}
              readOnly
            />
          </div>
        </div>

        <button onClick={handleSubmit} type="submit">Proceed to Payment</button>
      </form>
      </div>
     
    </div>
  );
};

export default CheckoutForm;
