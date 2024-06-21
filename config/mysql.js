import {} from "dotenv/config";
import Sequelize from "sequelize";

const database = process.env.MYSQL_DATABASE || "auth_db";
const username = process.env.MYSQL_USER || "root";
const password = process.env.MYSQL_PASSWORD || "";
const host = process.env.MYSQL_HOST || "127.0.0.1";

export const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
});
