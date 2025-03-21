import express, { Router } from 'express'
import { PokemonController } from '../controllers/pokemonController.ts'

const router : Router = express.Router()

router.get('/pokemon', PokemonController.getPokemon)
export default router