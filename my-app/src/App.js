import React, { useState, useEffect } from 'react';

function App() {
  const [customers, setCustomers] = useState(false);

  useEffect(() => {
    getCustomer();
  }, []);

  function getCustomer() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setCustomers(data);
        console.log(customers)
      });
  }

  function createCustomer() {
    let last_name = prompt('Enter customer name');
    let email = prompt('Enter customer email');
    fetch('http://localhost:3001/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ last_name, email }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getCustomer();
      });
  }

  function deleteCustomer() {
    let id = prompt('Enter customer id');
    fetch(`http://localhost:3001/customers/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getCustomer();
      });
  }

  return (
    <div>
      {console.log(JSON.parse(customers))}
      {customers ? customers : 'There is no customers data available'}
      <br />
      <button onClick={createCustomer}>Add customer</button>
      <br />
      <button onClick={deleteCustomer}>Delete customer</button>

      <div>
        {Object.values((JSON.parse(customers))).map(customer =>
          <div key={customer.customer_id}>
            <span>id: {customer.customer_id}</span>
            <br />
            <span>Компания: {customer.company_name}</span>
            <br />
            <span>Фамилия: {customer.last_name}</span>
            <br />
            <span>Имя: {customer.first_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;