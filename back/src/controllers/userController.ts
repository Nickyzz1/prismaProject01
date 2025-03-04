import { Request, Response } from "express"
import { prisma } from '../../prisma/prisma.ts'
import CryptoJS from "crypto-js";

export class userController {
   

    static getOneUser = async (req : Request, res : Response) => {

        const id = req.params.id;
        const user = await prisma.iUSer.findUnique({where : {id :parseInt(id)}})
        res.status(200).send(user)

    }

    static updateuser = async (req : Request, res : Response) => {
        const id = req.params.id;
        const {name, email, password, pokemons, userballs } = req.body

        try {
            const updatedData: any = {};

            if (name) updatedData.name = name;
            if (email) updatedData.email = email;
            if (password) updatedData.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY as string).toString();
            if (pokemons) updatedData.pokemons = pokemons;
            if (userballs) updatedData.userballs = userballs


            await prisma.iUSer.update({
                where: { id: parseInt(id) },  
                data: updatedData,  
            });

            res.status(200);

        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao atualizar o usuário");
        }
    }

    static deleteuser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
    
        try {
            // Primeiro, exclui os registros relacionado
            await prisma.iUSer.update({
                where: { id: id }, // Converte id para número
                data: { pokemons: { set: [] } } // Remove todos os vínculos com pokémons
            });
            
            await prisma.pokedexUserBall.deleteMany({ where: { userId: id } });
    
            // Agora, exclui o usuário
            await prisma.iUSer.delete({ where: { id } });
    
            res.status(200).send("Usuário deletado com sucesso!");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao deletar o usuário");
        }
    };
}