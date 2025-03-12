import { Request, Response } from "express"
import { login } from "../dto/auth/authdto.ts";
import { registerDto } from "../dto/auth/authdto.ts";
import { AuthService } from "../service/authService.ts";

export class AuthControler {
    static register = async (req: Request, res: Response) => {

        const data : registerDto = req.body

        if(!process.env.SECRET_KEY)
            res.status(500).send("internal server error")
        try {
            await AuthService.register(data)
            res.status(200).send("Usuário criado com sucesso");
            return
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro interno ao registrar o usuário");
            return
        }
    }

    static login = async (req: Request, res: Response): Promise<void> => {
        try {
            const data: login = req.body;
            const response = await AuthService.loginUser(data);
    
            if (!response || !response.token || !response.user) {
                res.status(400).send("Erro: Usuário ou token ausente");
                return;
            }
            res.set("Authorization", `Bearer ${response.token}`);
            console.log("Authorization", `Bearer ${response.token}`)
            res.status(200).send("Logado com sucesso!");
            return
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).send("Erro interno do servidor");
            return
        }
    };    
}