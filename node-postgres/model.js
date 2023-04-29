import pkg from "pg";

const { Pool } = pkg
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'electron-app',
  password: '302310',
  port: 5432,
});

export const getProducts = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM products', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

export const createProduct = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, category } = body
    pool.query('INSERT INTO products (product_name, category) VALUES ($1, $2) RETURNING *', [name, category], (error, results) => {
      if (error) {
        reject(error)
        console.log(error)
      }
      resolve(`A new Product has been added: ${body.name}`)
    })
  })
}

export const deleteProduct = (id) => {
  return new Promise(function (resolve, reject) {
    const product_id = id
    pool.query('DELETE FROM products WHERE product_id = $1', [product_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Product deleted with ID: ${id}`)
    })
  })
}