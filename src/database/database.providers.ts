import { Sequelize } from "sequelize-typescript";
import { SEQUELIZE } from "../constants";
import * as dotenv from 'dotenv';
dotenv.config()

const {
  DEV_USERNAME,
  DEV_PASSWORD,
  DEV_DB_PORT,
  DEV_HOST,
  PROD_USERNAME,
  PROD_PASSWORD,
  PROD_DB_PORT,
  PROD_HOST,
  NODE_ENV,
  DATABASE_NAME
} = process.env

const isProduction = NODE_ENV === "production"
console.log(isProduction);
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "postgres",
        host:  isProduction ? PROD_HOST : DEV_HOST,
        port: isProduction ? parseInt(PROD_DB_PORT) : parseInt(DEV_DB_PORT),
        username: isProduction ? PROD_USERNAME : DEV_USERNAME,
        password: isProduction ? PROD_PASSWORD : DEV_PASSWORD,
        database: DATABASE_NAME,
      });
      sequelize.addModels([]);
      await sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
        })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
        });
      return sequelize;
    }
  }
];