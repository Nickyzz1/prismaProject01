import { IPokemon } from '../pokemon/pokeDto.ts'

export interface IUserDto {
    id : number,
    name : string,
    email : string,
    password : string,
    pokemons : IPokemon[]
}

export interface IUserIdDto {
    id : number
}