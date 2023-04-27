import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

function App() {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  function getProduct() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setProducts(data);
        console.log(products)
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
      <div>
        {products && Object.values((JSON.parse(products))).map(product =>
          <div key={product.product_id}>
            <span>id: {product.product_id}</span>
            <br />
            <span>Название: {product.product_name}</span>
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