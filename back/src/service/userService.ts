import { IUserIdDto } from "../dto/user/IUserDto.ts"
import { prisma } from "../lib/prisma.ts"
import { IUserDto } from "../dto/user/IUserDto.ts"

export class userService {
    static getOneUserService = async( data : IUserIdDto ) => {
        const id = data.id
        const user = await prisma.iUSer.findUnique({where : {id: id}})
        return user
    }
    
    static updateuser = async (data : IUserDto) => {
        const updatedData: any = {}
        const name = data.name
        const email = data.email
        const password = data.password
        const pokemons = data.pokemons
        const id = data.id
        
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;
        if (password) updatedData.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY as string).toString();
        if (pokemons) updatedData.pokemons = pokemons;
      
        await prisma.iUSer.update({
            where: { id: id },  
            data: updatedData,  
        }); 
    } 

    static deleteuser = async (data : IUserIdDto) => {
        // Primeiro, exclui os registros relacionado
        await prisma.iUSer.update({
            where: { id: data.id }, 
            data: { pokemons: { set: [] } } // Remove todos os vínculos com pokémons
        });
        
        await prisma.pokedexUserBall.deleteMany({ where: { userId: data.id } });
        // Agora, exclui o usuário
        await prisma.iUSer.delete({ where: { id : data.id } });
    }
}