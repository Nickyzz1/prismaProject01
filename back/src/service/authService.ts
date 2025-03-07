import { login, registerDto } from "../dto/auth/authdto.ts"
import { prisma } from '../../prisma/prisma.ts'
import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js";

export class AuthService {
    static register = async(data : registerDto ) => {

        const name = data.name
        const email = data.email
        const password = data.password

        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY as string).toString();
        // Criando o usuário e associando todas as Pokébolas já existentes com a quantidade definida no banco
        await prisma.iUSer.create({
            data: {
                name: name,
                email: email,
                password: encryptedPassword
            }
        });
    }

    static loginUser = async(data : login) => {
        const email = data.email
        const user = await prisma.iUSer.findUnique({where :{email : email}})
        const secret = process.env.SECRET_KEY;

        const token = jwt.sign(
        { id: user?.id },
        secret as string,
        { expiresIn: '30d' }  // Token válido por 30 dias
        );

        const info = {user, token}
        return info
    }
}