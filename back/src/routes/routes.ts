import {Express} from 'express'
import express from 'express'
import bodyParser from "body-parser";
import user from './user.ts'
import auth from './auth.ts'
import pokemon from './pokemon.ts'
import pokeball from './pokeball.ts'

export default function (app : Express) {
    app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.json())
        .use('/user', user)
        .use('/auth', auth)
        .use('/pokemons', pokemon )
        .use('/pokeball', pokeball )
}

