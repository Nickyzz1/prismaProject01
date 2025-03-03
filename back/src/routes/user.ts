import express, {Router} from "express";
import {userController} from '../controllers/userController.ts'
import {userMiddware} from '../middlewares/userMiddwares.ts'

const router : Router = express.Router()

router.get('./user/:id',  userMiddware.validateId, userController.getOneUser)
router.post('./update/:id', userMiddware.validateId, userController.updateuser)
router.post('./delete/:id',  userMiddware.validateId, userController.deleteuser)

