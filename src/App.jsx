import React, { useCallback, useEffect } from 'react';
import './App.css'
import { getData } from './constants/db';
import Card from './components/card/card';
import Cart from './components/cart/cart';
import { useState } from 'react';

const courses = getData();
const telegram = window.Telegram.WebApp

const App = () => {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    telegram.ready()
  })

  const onAddItem = (item) => {
    const existItem = cartItem.find(c => c.id === item.id);

    if (existItem) {
      const newData = cartItem.map(c => c.id === item.id ? { ...existItem, quantity: existItem.quantity + 1 } : c);

      setCartItem(newData);
    } else {
      const newData = [...cartItem, { ...item, quantity: 1 }];

      setCartItem(newData);
    }
  };

  const onRemoveItem = (item) => {
    const existItem = cartItem.find(c => c.id === item.id);

    if (existItem.quantity === 1) {
      const newData = cartItem.filter(c => c.id !== existItem.id);

      setCartItem(newData);
    } else {
      const newData = cartItem.map(c => c.id === item.id ? { ...existItem, quantity: existItem.quantity - 1 } : c);

      setCartItem(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish"
    telegram.MainButton.show()
  }

  const onSendData = useCallback(() => {
    telegram.sendData(JSON.stringify(cartItem))
  }, [cartItem])

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', onSendData)
    return () => telegram.offEvent('mainButtonClicked', onSendData)
  }, [onSendData])

  return (
    <>
      <h1 className='heading'>Barcha kurslar</h1>
      <Cart cartItem={cartItem} onCheckout={onCheckout} />
      <div className='cards_container'>
        {courses.map(course => (
          <Card key={course.id} course={course} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
        ))}
      </div>
    </>
  );
};

export default App;