import { NextFunction, Request, Response } from "express"
import { prisma } from "../../prisma/prisma.ts";

export class userMiddware{
    static validateId = async (req: Request, res: Response, next: NextFunction) => {
        
        const id = req.params.id;
       
        if (!id) { 
            res.status(400).send("ID é obrigatório")
            return
        }

        const user = await prisma.iUSer.findUnique({ where: { id: parseInt(id) } });

        if (!user) { 
            res.status(404).send("Usuário não encontrado!")
            return
        }

        next();
    };
}
    
