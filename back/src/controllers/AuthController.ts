import { Request, Response } from "express"
import { prisma } from '../../prisma/prisma.ts'
import jwt from 'jsonwebtoken'

export class authControler {
    static register = async (req : Request, res : Response) => {

        const {name, email, pass} = req.body
        const encryptedPassword = CryptoJS.AES.encrypt(pass, process.env.SECRET_KEY as string).toString()
        // Creating user with prisma
        try {

            await prisma.iUSer.create ({
                data: {
                    name : name,
                    email : email,
                    password : encryptedPassword,
                    userBalls : {
                        connect: [
                          { id: 1 }, // Id da primeira Pokédex
                          { id: 2 }, // Id da segunda Pokédex
                          { id: 3 }, 
                          { id: 4 }, 
                        ]
                    },
                }
            })

            res.status(200).send("Usuário criado com sucesso");

        } catch (error) {

            res.status(500).send("INTERNAL SERVER ERROR ON REGISTER USER")
        }
    }
    
    static login = async (req : Request, res : Response) => {

        const {email, pass} = req.body

        const user = await prisma.iUSer.findUnique({where :{email : email}})

        try {
            
            // Gerando o token JWT
            const secret = process.env.SECRET;
            const token = jwt.sign(
            { id: user?.id },
            secret as string,
            { expiresIn: '30d' }  // Token válido por 30 dias
            );
        
            res.status(200).send(`Logado com sucesso : ${token}`)
        
        } catch (error) {
            res.status(500).send(`Internal server error: ${error}`)
        }
    }
}