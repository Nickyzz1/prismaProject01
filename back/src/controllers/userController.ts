import { Request, Response } from "express"
import { prisma } from '../../prisma/prisma.ts'

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
            if (password) updatedData.password = password;
            if (pokemons) updatedData.pokemons = pokemons;
            if (userballs) updatedData.userballs = userballs


            const updatedUser = await prisma.iUSer.update({
                where: { id: parseInt(id) },  
                data: updatedData,  
            });

            res.status(200).json(updatedUser);

        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao atualizar o usuário");
        }
    }

    static deleteuser = async (req : Request, res : Response) => {
        const id = req.params.id;
        const user = prisma.iUSer.findUnique({where : {id :parseInt(id)}})
        await prisma.iUSer.delete({
            where: { id: parseInt(id) }
        })
        res.status(200).send(user)
    }
}