import { Ability } from "@prisma/client"
import { IAbility } from "./AbilityDto.ts"

export interface getPoke {
    name : string,
}

export interface IPokemon {
    id : number,
    name : string,
    baseExperience : number,
    abilities : IAbility[],
    speed : number,
    hp: number,
    attack: number,
    defense : number,
    image: string,
    imageShiny : string,
    crie: string
}

