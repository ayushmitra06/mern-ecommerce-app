import React, { useContext, useState } from 'react';
import './Checkout.css';
import '../CartItems/CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom'
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Checkout = () => {
  const { all_product, cartItems, getTotalCartAmount } = useContext(ShopContext)

  const handleCheckout = (formData) => {
    // Perform actions with the form data, e.g., send it to the server
    const totalCartValue = all_product.reduce((total, product) => {
      if (cartItems[product.id] > 0) {
        total += product.new_price * cartItems[product.id];
      }
      return total;
    }, 0);

    // Add the total cart value to the form data
    formData.totalCartValue = totalCartValue;
    formData.products = cartItems

    // Perform actions with the form data, e.g., send it to the server
    console.log('Form Data in Checkout:', formData);

    // You can perform any additional actions here based on the form data
  };
  return (
    <div className='cartitems'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return <div>
            <div className="cartitems-format cartitem-format-main">
              <img src={e.image} alt="" className='carticon-product-icon' />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className='cartitems-quantity'>{cartItems[e.id]}</button>
              <p>${e.new_price * cartItems[e.id]}</p>
            </div>
            <hr />
          </div>
        }
        return null;
      })}
      <CheckoutForm onCheckout={handleCheckout} />
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <Link to='/CheckoutForm' ><button>CHECKOUT</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
