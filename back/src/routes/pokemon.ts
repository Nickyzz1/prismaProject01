import express, { Router } from 'express'
import {fetchPokemon} from '../controllers/PokemonController.ts'

const router : Router = express.Router()

router.get('/pokemon', fetchPokemon)

export default router