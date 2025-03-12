import axios from 'axios'
import {Request, Response } from 'express'
import { IPokemon } from '../dto/pokemon/pokeDto.ts';
import jwt from "jsonwebtoken";
import { prisma } from '../lib/prisma.ts';

// lista de pokemons da primeira geração
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

    // Pega o pokemon e seus atributos filtrados
    static getPokemonService = async (req: Request, res : Response): Promise<IPokemon | boolean> => {
        try {
            // Sorteando numero aleatório
            const randomIndex: number = Math.floor(Math.random() * firstGenPokemon.length);
            const pokemonName = firstGenPokemon[randomIndex];
            // Promisse espera resposta da API
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
            return false; // rertorna false poisn não consegui fazer a consulta na API
        }
    }

    static buyPokeballsService = async (req: Request, res: Response): Promise<boolean> => {
        try {
            const {pokeballId} = req.body; // o id é enviado no body, a probliedade dentro dsas chaves deve ser exatamanete igual a que é enviada no json. Ex no body: {"pokeballId": 1}
    
            if (!pokeballId) {
                res.status(400).send("ID da Pokébola não foi enviado.");
                console.log(req.body)
                return false; // Apenas retorna após a resposta para não continuar a execução.
            }
            
            const token = req.headers.authorization?.split(" ")[1]; // Remove "Bearer " do token
    
            if (!token) {
                res.status(401).send("Não permitido!");
                return false; // Retorna após enviar a resposta
            }
    
            const decoded = jwt.verify(token, 
            process.env.SECRET_KEY as string) as { id: number };
            
            if (!decoded.id) {
                res.status(401).send("Token inválido!");
                return false; // Retorna após enviar a resposta
            }
            
            console.log("Usuário identificado:", decoded.id);
            
            const userId = decoded.id;
            const user = await prisma.iUSer.findUnique({
                where: { id: userId }
            });
    
            if (!user) {
                res.status(404).send("Usuário não encontrado.");
                return false; // Retorna após enviar a resposta
            }
    
            const pokeball = await prisma.pokeBall.findUnique({
                where: { id: pokeballId }
            });
    
            if (!pokeball) {
                res.status(404).send("Pokébola não encontrada.");
                return  false; // Retorna após enviar a resposta
            }
    
            if (user.money < pokeball.price) {
                res.status(400).send("Dinheiro insuficiente.");
                return  false; // Retorna após enviar a resposta
            }
    
            const updatedUser = await prisma.iUSer.update({
                where: { id: userId },
                data: { money: user.money - pokeball.price }
            });
    
            const existingUserPokeball = await prisma.userPokeball.findFirst({
                where: { userId, pokeballId }
            });
    
            if (existingUserPokeball) {
                await prisma.userPokeball.update({
                    where: { id: existingUserPokeball.id },
                    data: { quantity: existingUserPokeball.quantity + 1 }
                });
            } else {
                await prisma.userPokeball.create({
                    data: {
                        userId,
                        pokeballId,
                        quantity: 1
                    }
                });
            }
            return true;
    
        } catch (error) {

            return false;
        }
    }

    static huntPokemon = async (req: Request, res : Response): Promise<number | void> => {
        const {pokemonId, pokeball} = req.body
        
        const pokeFinded = await prisma.iPokemon.findUnique({where : {id : pokemonId}})
        if(!pokeFinded) {
            res.status(404).send('Pokemon não encontrado!')
            return
        }

        const pokeballFinded = await prisma.pokeBall.findUnique({where : {id : pokemonId}})
        if(!pokeballFinded) {
            res.status(404).send('Pokebola não encontrado!')
            return
        }
        const chanceBase = (Number(pokeFinded.baseExperience) + Number(pokeFinded.hp)) / 
        (Number(pokeFinded.defense) + Number(pokeFinded.attack) + Number(pokeFinded.speed));
        const chanceCapture = chanceBase * (Number(pokeballFinded.capture_percentual) / 100)
        const randomFactor = Math.floor(Math.random() * 31);
        let percent = Math.min(Math.max(chanceCapture * randomFactor * 100, 1), 100);

        return percent;
    }
}
