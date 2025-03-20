"use client"
import Image from "next/image"
import pikachu from "../../../public/pikachuFofo.png";
import mapa from "../../../public/mapaCuritiba.png";
import voltar from '../../../public/voltar.png'
import { useRouter } from "next/navigation"
import Link from "next/link";
import { ROUTES } from '@/constants/routes'

const gameMitico = () => {
    const router = useRouter()

    const locations = [
        { top: "29%", left: "28%", path: "/pokemon/4", local: "Parque Barigui" },
        { top: "27%", left: "50%", path: "/pokemon/2", local: "XV novembro" },
        { top: "34%", left: "63%", path: "/pokemon/3", local: "Jardim Botânico" },
        { top: "71%", left: "69%", path: "/pokemon/3", local: "Parque SJ" },
        { top: "42%", left: "57%", path: "/pokemon/3", local: "PUC" },

        { top: "45%", left: "18%", path: "/pokemon/3", local: "UP" },
        { top: "45%", left: "39%", path: "/pokemon/3", local: "Praça do Japão" },
        { top: "70%", left: "40%", path: "/pokemon/3", local: "Terminal Capão Raso" },
        { top: "63%", left: "27%", path: "/pokemon/3", local: "Senai CIC" },
        { top: "70%", left: "12%", path: "/pokemon/3", local: "Bosch" },
    ]

    const handleClick = (path: string) => {
        router.push(path);
    };

    return (
        <>
            <div className="flex w-full flex-col min-h-screen p-2">

                <div className="flex items-start justify-start" >
                    <Link className="m-2 bg-slate-200 p-2 rounded hover:bg-slate-300" href={ROUTES.selectMap}>
                        <Image src={voltar} alt="voltar" className="justify-start max-w-5" ></Image>
                    </Link>
                </div>

                <div className="flex flex-col gap-3 items-center">

                    {/* Header */}
                    <div className="flex items-start mt-3 justify-start bg-slate-200 rounded-3xl gap-3 p-4 max-w-90">
                        <Image
                            className="max-w-40 outline-3 outline-slate-800 object-cover rounded-full"
                            src={pikachu}
                            alt="pikachu"
                        />
                        <h1>
                            Bem vindo, caçador! O mapa indica onde você vai nos achar... ou não
                            Hahah! Boa sorte campeão :)
                        </h1>
                    </div>
                    {/* Mapa */}
                    <div className="relative flex items-center justify-center bg-blue-400 max-w-110 p-2 rounded-3xl">
                        <Image className="rounded-3xl" src={mapa} alt="Mapa Pokémon" />
                        {/* Bolinhas clicáveis */}
                        {locations.map((loc, index) => (
                            <div
                                key={index}
                                className="absolute w-5 h-5 bg-red-500 rounded-full cursor-pointer animate-pulse"
                                style={{ top: loc.top, left: loc.left, transform: "translate(-50%, -50%)" }}
                                onClick={() => handleClick(loc.path)}

                            > <h1 className="p-4 text-blue-600 font-bold" ></h1> </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}

export default gameMitico