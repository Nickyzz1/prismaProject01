import express, {Router} from "express";
import {UserController} from '../controllers/UserController.ts'
import {userMiddware} from '../middlewares/userMiddwares.ts'

const router : Router = express.Router()

router.get('/:id',  userMiddware.validateId, UserController.getOneUser)
router.put('/update/:id', userMiddware.validateId, UserController.updateuser)
router.delete('/delete/:id',  userMiddware.validateId, UserController.deleteuser)

export default router;