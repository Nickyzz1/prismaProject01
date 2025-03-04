import axios from 'axios'
import {Request, Response } from 'express'

export const fetchPokemon = async (req: Request, res : Response) => {

    const firstGenPokemon: string[] = [
        "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
        "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
        "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
        "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu",
        "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen",
        "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix",
        "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish",
        "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett",
        "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape",
        "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra",
        "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout",
        "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler",
        "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton",
        "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder",
        "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby",
        "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak"
    ];

    try {
        const randomIndex: number = Math.floor(Math.random() * firstGenPokemon.length)
        const pokemonName = firstGenPokemon[randomIndex]
        const pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)).data
        const {abilities, sprites } = pokemon;
  
        // Mapeando as habilidades para pegar somente as desejadas
        const filteredPokemon = {
            name: pokemonName,
            abilities: abilities.map((item: any) => item.ability.name), // no front : pegar quantidade
            sprite: sprites
        };

        res.json(filteredPokemon);
                
        } catch (error) {
            res.status(500).send('Falha ao fazer requisição para API')
        }
}


