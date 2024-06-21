import { Router } from "express";
import { createUser, getUser, login } from "../controllers/users.js";
import { authenticateToken } from "../middleware/middlewareValidateLogin.js";

const router = Router();

router.post("/register", createUser);
router.get("/user/:id", authenticateToken, getUser);

router.post("/login", login);

export default router;
