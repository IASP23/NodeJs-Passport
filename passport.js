import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./models/users.js";

// Configuración de serialización y deserialización de usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Configuración de la estrategia local de Passport
passport.use(
  new LocalStrategy(
    { usernameField: "userName" }, // Ajusta según el campo de nombre de usuario en tu modelo
    async (userName, password, done) => {
      try {
        const user = await User.findOne({ where: { userName } });

        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Función para firmar el token JWT si es necesario
export const signToken = (user) => {
  return jwt.sign({ id: user.id, userName: user.userName }, "your_secret_key", {
    expiresIn: "1h",
  });
};

export default passport;
