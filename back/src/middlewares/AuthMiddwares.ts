import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/prisma.ts";
import CryptoJS from "crypto-js";


export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
             res.status(400).send("Todos os campos obrigatórios devem ser preenchidos!");
             return
        }

        const userExists = await prisma.iUSer.findUnique({ where: { email } });

        if (!userExists) {
             res.status(404).send("Usuário não encontrado.");
             return
        }

        if (!process.env.SECRET_KEY) {
             res.status(500).send("A chave não está configurada.");
             return
        }

        const bytes = CryptoJS.AES.decrypt(userExists.password, process.env.SECRET_KEY);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== password) {
             res.status(401).send("Senha incorreta.");
             return
        }

        return next(); // Agora está retornando explicitamente `void`
    } catch (error) {
        next(error); // Passa para o middleware de erro
    }
};

export const validateRegister =  async (req : Request, res : Response,  next: NextFunction) => {
    
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400).send("Informações faltantes")
        return
    }

    const userExists = await prisma.iUSer.findUnique({where :  {email : email}})

    if(userExists) { 
        res.status(400).send("Usuário já cadastrad0")
        return
    }

    next(); 
}