import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/prisma.ts";
import CryptoJS from "crypto-js";

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send("Todos os campos obrigatórios devem ser preenchidos!");
    }

    const userExists = await prisma.iUSer.findUnique({ where: { email: email } });

    if (userExists && process.env.SECRET) {
        const bytes = CryptoJS.AES.decrypt(userExists.password, process.env.SECRET);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedPassword !== password) { 
            res.status(401).send("Senha incorreta.")
        }
    } else {
        if (!userExists)
            res.status(404).send("usuário não encontrado");
        if (process.env.SECRET)
            res.status(500).send("A chave secreta não está configurada.");
    }
    next();
};


export const validateRegister =  async (req : Request, res : Response) => {
    
    const {name, email, password} = req.body

    if(!name || !email || !password) {res.status(400).send("Informações faltantes")}
    const userExists = await prisma.iUSer.findUnique({where :  {email : email}})
    if(userExists) {res.status(400).send("Usuário já cadastrad0") }
}