import express, { Router } from 'express'
import { PokemonController } from '../controllers/pokemonController.ts'

const router : Router = express.Router()

router.post('/pokeball', PokemonController.buyPokeballs)
export default router