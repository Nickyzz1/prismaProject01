import express, {Router} from "express";
import {validateLogin, validateRegister} from '../middlewares/AuthMiddwares.ts'
import { AuthControler } from "../controllers/AuthController.ts";

const router : Router = express.Router()
router.post('/login', validateLogin, AuthControler.login )
router.post('/register', validateRegister, AuthControler.register )

export default router;