import express, {Router} from "express";
import {validateLogin, validateRegister} from '../middlewares/AuthMiddwares.ts'
import { authControler } from "../controllers/AuthController.ts";

const router : Router = express.Router()
router.post('/login', validateLogin, authControler.login )
router.post('/register', validateRegister, authControler.register )
