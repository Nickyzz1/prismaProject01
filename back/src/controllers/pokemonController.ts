import {Request, Response } from 'express'
import { pokemonService } from '../service/pokemonService.ts';
export class PokemonController{

    static getPokemon = async (req: Request, res : Response) => {
        const pokemon = await pokemonService.getPokemonService(req, res);
        try {
            if(pokemon){
                res.json(pokemon) 
            }
        } catch (error) {
            res.status(500).send("Falha ao consultar API")
        }
    }

    static buyPokeballs = async (req: Request, res: Response): Promise<void> => { 
        try {
            const buyed = await pokemonService.buyPokeballsService(req, res);
    
            if (buyed) {
                res.status(200).send({
                    message: "Pokébola comprada com sucesso!",
                });
                return
            }
        } catch (error) {
            console.error("Erro ao comprar Pokébola:", error);
            res.status(500).send("Erro interno do servidor");
            return
        }
    };

    static huntPokemon = async(req : Request, res:Response):Promise<void> => {
        try {
            const huntPercent = await pokemonService.huntPokemon(req, res);
    
            if (huntPercent) {
                res.status(200).send({
                    message: "Pokébola comprada com sucesso!",
                }).json(huntPercent)
                return
            }
        } catch (error) {
            console.error("Erro ao comprar Pokébola:", error);
            res.status(500).send("Erro interno do servidor");
            return
        }

    }
}


