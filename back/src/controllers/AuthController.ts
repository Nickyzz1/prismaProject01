import { Request, Response } from "express"
import { prisma } from '../../prisma/prisma.ts'
import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js";
import { login } from "../dto/auth/authdto.ts";
import { registerDto } from "../dto/auth/authdto.ts";
import { AuthService } from "../service/authService.ts";

export class AuthControler {
    static register = async (req: Request, res: Response) => {

        const data : registerDto = req.body

        if(!process.env.SECRET_KEY)
            res.status(500).send("internal server error")
        try {
            await AuthService.register(data)
            res.status(200).send("Usuário criado com sucesso");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro interno ao registrar o usuário");
        }
    }
    
    static login = async (req : Request, res : Response) => {
        const data : login = req.body
        const response =  await AuthService.loginUser(data)
        try {
            if (!response || !response.token || !response.user) {
                return res.status(400).send("Erro: Usuário ou token ausente");
            }
            res.status(200).send(`TOKEN : ${response.token}\nID: ${response.user.id}`);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).send("Erro interno do servidor");
        }
    }
}