import { Request, Response } from "express"
import { prisma } from '../../prisma/prisma.ts'
import CryptoJS from "crypto-js";
import { IUserIdDto } from "../dto/user/IUserDto.ts"
import { userService } from "../service/userService.ts";
import { IUserDto } from "../dto/user/IUserDto.ts";
export class UserController {

    static getOneUser = async (req : Request<{ id: number}>, res : Response) => {
        // just get one user if the id exists on database, one future fiature is implement a filter to get just image, biograph and name of the user
        const dataUser : IUserIdDto  = req.params;
        try {
            const user = await userService.getOneUserService(dataUser)
            res.status(200).send(user)
            return
        } catch (error) {
            res.status(404).send("User não encontrado")
            return
        }
    }

    static updateuser = async (req : Request, res : Response) => {
        const data : IUserDto = req.body
        try {
            const response = await userService.updateuser(data)
            res.status(200).send("User atualizado com sucesso")
            return

        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao atualizar o usuário");
            return
        }
    }

    static deleteuser = async (req : Request<{ id: number}>, res: Response) => {
        const data : IUserIdDto  = req.params;
        try {
            const user = await userService.deleteuser(data)
            res.status(200).send("Usuário deletado com sucesso!");
            return
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao deletar o usuário");
            return
        }
    };
}