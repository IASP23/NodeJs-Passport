import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    /*     role: {
      type: DataTypes.ENUM(["user", "student", "admin", "entreprenaur"]),
      allowNull: false,
    }, */
  },
  {
    timestamps: true,
  }
);
