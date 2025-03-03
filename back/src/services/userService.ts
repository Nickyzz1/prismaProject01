import { IPokemon } from '../services/pokemonService.ts'

export interface IUser {
    name : string,
    email : string,
    password : string,
    pokemons : IPokemon[]
}