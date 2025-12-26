import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "torado",     // database name
  "root",       // user
  "Smit@2025",  // password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, 
  }
);

export default sequelize;
