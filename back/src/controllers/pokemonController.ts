import axios from 'axios'
import {Request, Response } from 'express'
import { IPokemon } from '../dto/pokemon/pokeDto.ts';
import { IPokeball } from '../dto/pokemon/pokeballDto.ts';
import { jwtDecode } from 'jwt-decode';
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
    
    static buyPokeballs = async (res : Response, req : Request) => {
        const buyed = await pokemonService.buyPokeballsService(req, res)
        if(buyed == null || buyed == undefined){
            res.status(500).send("Falha ao consultar API")
        }
    }
}


