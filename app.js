import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./config/mysql.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "./passport.js";

const app = express();

// Conexión a la base de datos
async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("MySQL conexión correcta");
  } catch (e) {
    console.log("MySQL fallo en la conexión ", e);
  }
}

main();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your_secret_session_key", // Clave secreta para la sesión
    resave: false,
    saveUninitialized: false,
  })
);

// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use(authRoutes);

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
