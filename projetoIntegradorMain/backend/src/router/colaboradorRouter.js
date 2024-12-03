import { Router } from "express";
import { createColaborador } from "../controller/colaboradorController.js";


const router = Router()

router.post("/cadastroSP", createColaborador)

export default router