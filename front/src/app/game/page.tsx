import Image from "next/image";
import pikachu from '../../../public/pikachuFofo.png'
import mapa from '../../../public//paisagens/mapaPokemon.jpg'

const game = () => {

    return(
        <>
            <div className="flex flex-col min-h-screen items-center gap-3" >
                <div className="flex items-start mt-21 justify-start bg-slate-200 rounded-3xl gap-3 p-4 max-w-90" >
                    <Image className="max-w-40 outline-3 outline-slate-800 object-cover rounded-full " src={pikachu} alt="pikachu"></Image>
                    <h1>Bem vindo, caçador! O mapa indica onde você vai nos achar... ou não Hahah! Boa sorte campeão :) </h1>
                </div>

                <div className="flex items-center justify-center bg-blue-400 max-w-110 p-2 rounded-3xl">
                    <Image className="rounded-3xl" src={mapa} alt="" ></Image>
                </div>

            </div>
        </>
    )


}

export default game;

// mapa, vão ter bolinhas para clicar e nesses luigares aparecerão pokemons para vc capturar
// tem 200 imagens diferentes e isso é randômico
// 