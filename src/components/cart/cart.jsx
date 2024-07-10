import React from 'react'
import "./cart.css"
import Button from '../button/button'
import { totalPrice } from '../../units/total-price';


const Cart = ({ cartItem, onCheckout }) => {

  return (
    <>
    <div className='cart_container'>
              <p>Umumiy narx: {totalPrice(cartItem).toLocaleString("eng-US", {
                  style: "currency",
                  currency: "USD"
              })}</p>

              <Button title={`${cartItem.length === 0 ? "Buyurtma berish" : "To'lov"}`} disable={cartItem.length === 0 ? true : false} type={"checkout"} onClick={onCheckout} />
    </div>
    </>
  )
}

export default Cart