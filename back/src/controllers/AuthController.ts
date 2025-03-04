import { Request, Response } from "express"
import { prisma } from '../../prisma/prisma.ts'
import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js";

export class authControler {
    static register = async (req: Request, res: Response) => {

        const {name, email, password} = req.body;

        // Criptografando a senha
        if(!process.env.SECRET_KEY)
            res.status(500).send("internal server error")
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY as string).toString();
        
        try {
            // Buscar todas as Pokédex (ou bolas) no banco
            const allPokedex = await prisma.pokedex.findMany();

            // Criando o usuário e associando todas as Pokébolas já existentes com a quantidade definida no banco
            await prisma.iUSer.create({
                data: {
                    name: name,
                    email: email,
                    password: encryptedPassword,
                    userBalls: {
                        create: allPokedex.map(pokedex => ({
                            pokedexId: pokedex.id,   // Conectando a Pokédex ao usuário
                            quantity: pokedex.quantityToPlayer // Usando a quantidade de Pokébolas configurada no banco
                        }))
                    },
                }
            });

            res.status(200).send("Usuário criado com sucesso");

        } catch (error) {
            console.error(error);
            res.status(500).send("Erro interno ao registrar o usuário");
        }
    }
    
    static login = async (req : Request, res : Response) => {

        const {email} = req.body

        const user = await prisma.iUSer.findUnique({where :{email : email}})

        try {
            
            // Gerando o token JWT
            const secret = process.env.SECRET_KEY;
            const token = jwt.sign(
            { id: user?.id },
            secret as string,
            { expiresIn: '30d' }  // Token válido por 30 dias
            );
        
            res.status(200).send(`TOKEN : ${token}\nID: ${user?.id}`)
        
        } catch (error) {
            res.status(500).send(`Internal server error: ${error}`)
        }
    }
}