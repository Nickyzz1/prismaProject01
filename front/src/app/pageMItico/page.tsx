
"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

import abacaxiBob from '../../../public/paisagens/abacaxiBob.jpg';
import balancoNaruto from '../../../public/paisagens/balançoNaruto.jpg';
import biomaBambu from '../../../public/paisagens/biomaBambu.webp';
import elsaCastelo from '../../../public/paisagens/elsaCastelo.webp';
import floresta from '../../../public/paisagens/floresta.webp';
import mapaPokemon from '../../../public/paisagens/mapaPokemon.jpg';
import mapaQuarto from '../../../public/paisagens/mapaquarto.jpg';
import mapaSecundarioPokemon from '../../../public/paisagens/mapaSecundarioPokemon.png';
import mapaTerceiro from '../../../public/paisagens/mapaTerceiro.jpg';
import moesSimpsons from '../../../public/paisagens/moesSimpsons.webp';
import nether from '../../../public/paisagens/nether.webp';
import paisagem1 from '../../../public/paisagens/paisagem1.jpg';
import paisagem2 from '../../../public/paisagens/paisagem2.jpg';
import paisagem3 from '../../../public/paisagens/paisagem3.jpg';
import paisagem4 from '../../../public/paisagens/paisagem4.jpg';
import paisagem5 from '../../../public/paisagens/paisagem5.jpg';
import paisagem6 from '../../../public/paisagens/paisagem6.jpg';
import paisagem7 from '../../../public/paisagens/paisagem7.jpg';
import paisagem8 from '../../../public/paisagens/paisagem8.jpg';
import paisagem9 from '../../../public/paisagens/paisagem9.webp';
import paisagem10 from '../../../public/paisagens/paisagem10.jpg';
import paisagemNaruto from '../../../public/paisagens/paisagemnaruto.jpg';
import paisagemNarutoHokages from '../../../public/paisagens/paisagemNarutoHokages.jpg';
import torreRapunzel from '../../../public/paisagens/torreRapunzel.webp';
import vilaChaves from '../../../public/paisagens/vila_chaves_foto.webp';
import windowImg from '../../../public/paisagens/window.png';

const pageMitico  = () => {

    const num : number = Math.random() * 100
    const paisage : number = Math.random() * 25

    const images = [
        abacaxiBob, balancoNaruto, biomaBambu, elsaCastelo, floresta, mapaPokemon, mapaQuarto, mapaSecundarioPokemon, mapaTerceiro, moesSimpsons, nether, paisagem1, paisagem2, paisagem3, paisagem4, paisagem5, paisagem6, paisagem7, paisagem8, paisagem9, paisagem10, paisagemNaruto, paisagemNarutoHokages, torreRapunzel, vilaChaves, windowImg,
    ];

    interface IPokemon {
        id: number;
        name: string;
        base_experience: number;
        stats: {
            base_stat: number;
            stat: {
                name: string;
            };
        }[];
        sprites: {
            front_default: string;
            front_shiny: string;
            back_default?: string;
            back_shiny?: string;
            other?: {
                "official-artwork"?: {
                    front_default: string;
                    front_shiny?: string;
                };
            };
        };
        species: {
            name: string;
        };
    }

    const [data, setData] = useState<IPokemon>(); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
      
    useEffect(() => {
        fetch("http://localhost:8080/pokemons/pokemon")
          .then((res) => {
            if (!res.ok) {
              throw new Error("Erro ao buscar os dados");
            }
            return res.json();
          })
          .then((dataRes) => {
            setData(dataRes);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }, []);
    
      if (loading) return <p>Carregando...</p>;
      if (error) return <p>Erro: {error}</p>;
      
    return(
        <>
       

            <div>
                <Image  width={100} height={100} className="" src={images[paisage]} alt="paisagem">
                </Image>

                {num > 90 && data?.sprites.back_shiny && (
                    <Image  width={100} height={100} className="" src={data.sprites.back_shiny} alt="paisagem" />
                )}

                {num <= 90 && data?.sprites.back_default && (
                    <Image   width={100} height={100}  className="" src={data.sprites.back_default} alt="paisagem" />
                )}
            </div>
        
       
        </>
    )

}

export default pageMitico;