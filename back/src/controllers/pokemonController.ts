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

    static buyPokeballs = async (req: Request, res: Response) => { // Corrigido: req primeiro, depois res
        try {
            const buyed = await pokemonService.buyPokeballsService(req, res);
    
            if (buyed == undefined) {
                res.status(500).send("Falha ao consultar API");
                return
            }
            res.status(200).send(buyed);
        } catch (error) {
            console.error("Erro ao comprar Pokébola:", error);
            res.status(500).send("Erro interno do servidor");
        }
    };
}


