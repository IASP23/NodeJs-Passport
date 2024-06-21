import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Obtener el token desde el encabezado Authorization

  if (!token) {
    return res.sendStatus(401); // Unauthorized si no hay token
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden si el token es inválido
    }
    req.user = user; // Guardar los datos decodificados del usuario en el request para uso posterior
    next(); // Continuar con la ejecución de la ruta protegida
  });
};
