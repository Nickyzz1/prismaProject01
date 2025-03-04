import express, {Router} from "express";
import {userController} from '../controllers/userController.ts'
import {userMiddware} from '../middlewares/userMiddwares.ts'

const router : Router = express.Router()

router.get('/:id',  userMiddware.validateId, userController.getOneUser)
router.put('/update/:id', userMiddware.validateId, userController.updateuser)
router.delete('/delete/:id',  userMiddware.validateId, userController.deleteuser)

export default router;