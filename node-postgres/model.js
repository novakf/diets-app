import pkg from "pg";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { Pool } = pkg
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'electron-app',
  password: '302310',
  port: 5432,
});

export const createUser = async (body) => {
  const { login, password } = body
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  return new Promise(function (resolve, reject) {
    pool.query('INSERT INTO users(login, password_hash) VALUES($1, $2)', [login, passwordHash], (error, results) => {
      if (error) {
        reject('Пользователь с данным логином существует')
        console.log(error)
      }
      if (results) {
        pool.query('SELECT * FROM users WHERE login=$1', [login], (error, results) => {
          const token = jwt.sign(
            {
              id: results.rows[0].id,
              login: results.rows[0].login,
              passwordHash: results.rows[0].password_hash
            },
            'secretkey',
            {
              expiresIn: '24h'
            }
          )
          resolve(token)
        })
      }
    })
  })
}

export const checkUser = (body) => {
  const { login, password } = body
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM users WHERE login=$1', [login], async (error, results) => {
      if (error) {
        reject(error)
        console.log(error)
      }
      else if (results.rows.length == 0) {
        reject('Пользователь не найден')
      }
      else {
        const isValidPass = await bcrypt.compare(password, results.rows[0].password_hash)
        if (!isValidPass) {
          reject('Неверный логин или пароль')
        } else {
          const token = jwt.sign(
            {
              id: results.rows[0].id,
              login: results.rows[0].login,
              passwordHash: results.rows[0].password_hash
            },
            'secretkey',
            {
              expiresIn: '24h'
            }
          )
          resolve(token)
        }
      }
    })
  })
}

export const getUserInfo = (body) => {
  const { login } = body
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM users WHERE login = $1', [login], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

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
    pool.query('INSERT INTO products (product_name, category) VALUES ($1, $2)', [name, category], (error, results) => {
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