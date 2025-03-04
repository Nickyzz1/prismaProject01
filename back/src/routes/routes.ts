import {Express} from 'express'
import express from 'express'
import user from './user.ts'
import auth from './auth.ts'
import pokemon from './pokemon.ts'

export default function (app : Express) {
    app
        .use(express.json())
        .use('/user', user)
        .use('/auth', auth)
        .use('/pokemons', pokemon )
}

