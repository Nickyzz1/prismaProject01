import express, { Router } from 'express'
import {fetchPokemon} from '../controllers/pokemonController.ts'

const router : Router = express.Router()

router.get('/pokemon', fetchPokemon)

export default router