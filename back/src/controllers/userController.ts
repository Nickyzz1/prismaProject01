import { Request, Response } from "express"
import { prisma } from '../../prisma/prisma.ts'
import CryptoJS from "crypto-js";

export class UserController {

    static getOneUser = async (req : Request, res : Response) => {
        // just get one user if the id exists on database, one future fiature is implement a filter to get just image, biograph and name of the user
        const id = req.params.id;
        const user = await prisma.iUSer.findUnique({where : {id :parseInt(id)}})
        res.status(200).send(user)
        return
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

            res.status(200)
            return

        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao atualizar o usuário");
            return
        }
    }

    static deleteuser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
    
        try {
            // Primeiro, exclui os registros relacionado
            await prisma.iUSer.update({
                where: { id: id }, 
                data: { pokemons: { set: [] } } // Remove todos os vínculos com pokémons
            });
            
            await prisma.pokedexUserBall.deleteMany({ where: { userId: id } });
            // Agora, exclui o usuário
            await prisma.iUSer.delete({ where: { id } });
    
            res.status(200).send("Usuário deletado com sucesso!");
            return

        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao deletar o usuário");
            return
        }
    };
}