import { Sequelize } from 'sequelize-typescript';
import User from '../src/models/UserModel';
import FinancialRecord from '../src/models/FinancialRecordModel';


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'sword666',
  database: process.env.DB_NAME || 'finannce',
  models: [User,FinancialRecord],

});

export default sequelize;
