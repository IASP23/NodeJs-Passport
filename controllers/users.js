import { User } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.send(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await User.create(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    /*     const {userName  , password , role  } = req.body ;
     */
    const userUpdate = await User.findByPk(id);
    /*     userUpdate.userName = userName ; 
    userUpdate.password = password ; 
    userUpdate.role = role ;  */
    userUpdate.set(req.body);
    await userUpdate.save();
    res.send("Updating");
  } catch (error) {
    return res.sendStatus(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, userName: user.userName },
      "your_secret_key",
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
