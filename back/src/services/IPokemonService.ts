import { Ability } from "@prisma/client"

export interface IPokemon {
    name : string,
    abilities : Ability[]
}