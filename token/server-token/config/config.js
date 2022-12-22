const dotenv = require("dotenv");
dotenv.config();

const accessSecret = process.env.ACCESS_SECRET;

module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  accessSecret,
};
