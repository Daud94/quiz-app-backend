const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const {
  DEV_USERNAME,
  DEV_PASSWORD,
  DEV_DB_PORT,
  DEV_HOST,
  PROD_USERNAME,
  PROD_PASSWORD,
  PROD_DB_PORT,
  PROD_HOST,
  DATABASE_NAME,
  NODE_ENV
} = process.env;

const isProduction = NODE_ENV === "production";

const dbConfig = {
  development: {
    username: DEV_USERNAME,
    password: DEV_PASSWORD,
    database: DATABASE_NAME,
    host: DEV_HOST,
    dialect: "postgres",
    port: parseInt(DEV_DB_PORT),
    logging: false,
    dialectOptions: {
      decimalNumbers: true,
      ...(isProduction && {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      })
    }
  },
  test: {
    username: "root",
    password: "123@XYZ.com?",
    database: "fastadb",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 8889,
    dialectOptions: {
      decimalNumbers: true
    }
  },
  production: {
    username: PROD_USERNAME,
    password: PROD_PASSWORD,
    database: DATABASE_NAME,
    host: PROD_HOST,
    dialect: "postgres",
    port: parseInt(PROD_DB_PORT),
    logging: false,
    dialectOptions: {
      decimalNumbers: true
    }
  }
};
module.exports = dbConfig;
