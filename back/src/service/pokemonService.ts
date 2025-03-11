import axios from 'axios'
import {Request, Response } from 'express'
import { IPokemon } from '../dto/pokemon/pokeDto.ts';
import { IPokeball } from '../dto/pokemon/pokeballDto.ts';
import { jwtDecode } from 'jwt-decode';

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
    "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak",
    "Hitmonlee", "Hitmonchan", "Lickitung",
    "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
    "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime",
    "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp",
    "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon",
    "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax",
    "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite",
    "Mewtwo", "Mew"
];
export class pokemonService {
    static getPokemonService = async (req: Request, res : Response) => {

        try {
            const randomIndex: number = Math.floor(Math.random() * firstGenPokemon.length);
            const pokemonName = firstGenPokemon[randomIndex];
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            const data = response.data;
        
            const pokemon: IPokemon = {
                id: data.id,
                name: data.name,
                base_experience: data.base_experience,
                stats: data.stats.map((s: any) => ({
                    base_stat: s.base_stat,
                    stat: {
                        name: s.stat.name,
                    },
                })),
                sprites: {
                    front_default: data.sprites.front_default,
                    front_shiny: data.sprites.front_shiny,
                    back_default: data.sprites.back_default,
                    back_shiny: data.sprites.back_shiny,
                    other: {
                        "official-artwork": {
                            front_default: data.sprites.other["official-artwork"]?.front_default || "",
                            front_shiny: data.sprites.other["official-artwork"]?.front_shiny || "",
                        },
                    },
                },
                species: {
                    name: data.species.name,
                },
            };
            return pokemon;
        
        } catch (error) {
            res.status(500).send("Falha ao fazer requisição para API: " + error);
        }
    }

    static buyPokeballsService = (req : Request, res : Response, ) => {
        const {pokeball : IPokeball } = req.body
        const token = req.headers.authorization
        if(!token)
            res.status(401).send("Não permitido!")
        if(token) {
            const userInfo = jwtDecode(token);
            console.log(userInfo); 
        }

    }
    
}
