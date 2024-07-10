import React, { useState } from 'react';
import "./cart.css";
import Button from '../button/button';
import { totalPrice } from '../../units/total-price';
import Card from '../card/card';

const Cart = ({ cartItem, onCheckout }) => {
  const [selectedCategory, setSelectedCategory] = useState('ovqatlar');

  return (
    <>
      <div className='cart_container'>
        <p>Umumiy narx: {totalPrice(cartItem).toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        })}</p>

        <Button
          title={`${cartItem.length === 0 ? "Buyurtma berish" : "To'lov"}`}
          disable={cartItem.length === 0}
          type={"checkout"}
          onClick={cartItem.length === 0 ? null : onCheckout}
        />
      </div>

      <div className='cart_container'>
        <button
          className={selectedCategory === 'ovqatlar' ? 'active' : ''}
          onClick={() => setSelectedCategory('ovqatlar')}
        >
          Ovqatlar
        </button>
        <button
          className={selectedCategory === 'ichimliklar' ? 'active' : ''}
          onClick={() => setSelectedCategory('ichimliklar')}
        >
          Yaxna ichimliklar
        </button>
        <button
          className={selectedCategory === 'salatlar' ? 'active' : ''}
          onClick={() => setSelectedCategory('salatlar')}
        >
          Salatlar
        </button>
      </div>

      <div className='cart_content'>
        {selectedCategory === 'ovqatlar' && <p>salom</p>}
        {selectedCategory === 'ichimliklar' && <p>Yaxna ichimliklar content</p>}
        {selectedCategory === 'salatlar' && <p>Salatlar content</p>}
      </div>
    </>
  );
}

export default Cart;
