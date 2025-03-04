import { IPokemon } from './IPokemonService.ts'

export interface IUser {
    name : string,
    email : string,
    password : string,
    pokemons : IPokemon[]
}