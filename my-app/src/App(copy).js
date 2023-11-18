import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import './App.css'

function App() {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  function authUser() {
    let login = prompt('Login')
    let password = prompt('Pass')
    fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password })
    })
      .then(response => {
        return response.text()
      })
      .then(data => {
        alert(data)
      })
  }

  function getProduct() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setProducts(data);
      });
  }

  function createProduct() {
    let name = prompt('Enter product name');
    let category = prompt('Enter product category');
    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, category }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getProduct();
      });
  }

  function deleteProduct() {
    let id = prompt('Enter product id');
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getProduct();
      });
  }

  return (
    <div>
      <Button variant="outlined" onClick={createProduct}>Add product</Button>
      <Button variant="outlined" onClick={deleteProduct}>Delete product</Button>
      <Button variant='outlined' onClick={authUser}>Auth</Button>
      <div>
        {products && Object.values((JSON.parse(products))).map(product =>
          <div className='info' key={product.product_id}>

            <br />
            <span>{product.product_id}. Название: {product.product_name}</span>
            <br />
            <span>Категория: {product.category}</span>
            <br />
            <span>Цена: {product.price} руб.</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;