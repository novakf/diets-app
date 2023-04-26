const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'electron-app',
  password: '302310',
  port: 5432,
});

const getCustomers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM customers', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createCustomer = (body) => {
  return new Promise(function(resolve, reject) {
    const { last_name, email } = body
    pool.query('INSERT INTO customers (last_name, email) VALUES ($1, $2) RETURNING *', [last_name, email], (error, results) => {
      if (error) {
        reject(error)
        console.log(error)
      }
      resolve(`A new Customer has been added: ${results.rows[0]}`)
    })
  })
}

const deleteCustomer = (id) => {
  return new Promise(function(resolve, reject) {
    const customer_id = id
    pool.query('DELETE FROM customers WHERE customer_id = $1', [customer_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Customer deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getCustomers,
  createCustomer,
  deleteCustomer,
}