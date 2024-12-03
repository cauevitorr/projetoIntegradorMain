import { createUser, loginUser } from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);


export default router;
