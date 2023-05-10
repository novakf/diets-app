import pkg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Pool } = pkg;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "electron-app",
  password: "302310",
  port: 5432,
});

export const createUser = async (body) => {
  const { login, password, name, age, height, weight } = body;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  return new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO users(login, password_hash, name, age, height, weight) VALUES($1, $2, $3, $4, $5, $6)",
      [login, passwordHash, name, age, height, weight],
      (error, results) => {
        if (error) {
          reject("Пользователь с данным логином существует");
          console.log(error);
        }
        if (results) {
          pool.query(
            "SELECT * FROM users WHERE login=$1",
            [login],
            (error, results) => {
              const token = jwt.sign(
                {
                  id: results.rows[0].id,
                  login: results.rows[0].login,
                  passwordHash: results.rows[0].password_hash,
                  name: results.rows[0].name,
                  age: results.rows[0].age,
                  height: results.rows[0].height,
                  weight: results.rows[0].weight,
                },
                "secretkey",
                {
                  expiresIn: "24h",
                }
              );
              resolve(token);
            }
          );
        }
      }
    );
  });
};

export const checkUser = (body) => {
  const { login, password } = body;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM users WHERE login=$1",
      [login],
      async (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else if (results.rows.length == 0) {
          reject("Пользователь не найден");
        } else {
          const isValidPass = await bcrypt.compare(
            password,
            results.rows[0].password_hash
          );
          if (!isValidPass) {
            reject("Неверный логин или пароль");
          } else {
            const token = jwt.sign(
              {
                id: results.rows[0].id,
                login: results.rows[0].login,
                passwordHash: results.rows[0].password_hash,
                name: results.rows[0].name,
                age: results.rows[0].age,
                height: results.rows[0].height,
                weight: results.rows[0].weight,
              },
              "secretkey",
              {
                expiresIn: "24h",
              }
            );
            resolve(token);
          }
        }
      }
    );
  });
};

export const getUserInfo = (body) => {
  const { login } = body;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM users WHERE login = $1",
      [login],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

export const getProducts = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM products", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

export const createProduct = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, category } = body;
    pool.query(
      "INSERT INTO products (product_name, category) VALUES ($1, $2)",
      [name, category],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        }
        resolve(`A new Product has been added: ${body.name}`);
      }
    );
  });
};

export const deleteProduct = (id) => {
  return new Promise(function (resolve, reject) {
    const product_id = id;
    pool.query(
      "DELETE FROM products WHERE product_id = $1",
      [product_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Product deleted with ID: ${id}`);
      }
    );
  });
};

export const getDiets = () => {
  async function selectDays(id) {
    try {
      const res = await pool.query(
        "SELECT dish1_id as dish1, dish2_id as dish2, dish3_id as dish3, dish4_id as dish4, dish5_id as dish5 FROM days WHERE day_id = $1",
        [id]
      );
      return res.rows[0];
    } catch (err) {
      return err.stack;
    }
  }

  async function selectDishes(id) {
    try {
      const res = await pool.query(
        "SELECT dish_name, photo, calories FROM dishes WHERE dish_id = $1",
        [id]
      );
      return res.rows[0];
    } catch (err) {
      return err.stack;
    }
  }

  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM diets", async (error, results) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        const array = results.rows;
        for (let i = 0; i < array.length; i++) {
          array[i].day1_id = await selectDays(array[i].day1_id);
          for (let key in array[i].day1_id) {
            array[i].day1_id[key] = await selectDishes(array[i].day1_id[key]);
          }
          array[i].day2_id = await selectDays(array[i].day2_id);
          for (let key in array[i].day2_id) {
            array[i].day2_id[key] = await selectDishes(array[i].day2_id[key]);
          }
          array[i].day3_id = await selectDays(array[i].day3_id);
          for (let key in array[i].day3_id) {
            array[i].day3_id[key] = await selectDishes(array[i].day3_id[key]);
          }
        }
        resolve(array);
      }
    });
  });
};

export const getStats = (id) => {
  const user_id = id;

  async function selectDiets(id) {
    try {
      const res = await pool.query(
        "SELECT diet_id, type FROM diets WHERE diet_id = $1",
        [id]
      );
      return res.rows[0];
    } catch (err) {
      return err.stack;
    }
  }

  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * from stats WHERE client_id=$1",
      [user_id],
      async (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          const array = results.rows;
          if (array[0]) array[0].diet_id = await selectDiets(array[0].diet_id);
          resolve(array);
        }
      }
    );
  });
};

export const setStats = (body) => {
  const { user_id, diet_id } = body;
  return new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO stats(client_id, diet_id, start_date) VALUES($1, $2, CURRENT_DATE)",
      [user_id, diet_id],
      (error, results) => {
        if (error) {
          reject("Вы уже выбрали рацион");
          console.log(error);
        }
        resolve("Рацион сохранен");
      }
    );
  });
};

export const deleteStats = (id) => {
  const user_id = id;

  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE from stats WHERE client_id=$1",
      [user_id],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        }
        resolve("Рацион завершен!");
      }
    );
  });
};

export const getDishes = () => {
  async function selectProductsId(id) {
    try {
      const res = await pool.query(
        "SELECT product_id FROM product_dish WHERE dish_id = $1",
        [id]
      );
      return res.rows;
    } catch (err) {
      return err.stack;
    }
  }

  async function selectProductsInfo(id) {
    try {
      const res = await pool.query(
        "SELECT * FROM products WHERE product_id = $1",
        [id]
      );
      return res.rows[0];
    } catch (err) {
      return err.stack;
    }
  }

  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM dishes", async (error, results) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        const array = results.rows;
        for (let i = 0; i < array.length; i++) {
          array[i].products = await selectProductsId(array[i].dish_id);
          for (let j = 0; j < array[i].products.length; j++) {
            array[i].products[j] = await selectProductsInfo(
              array[i].products[j].product_id
            );
          }
        }
        resolve(array);
      }
    });
  });
};
