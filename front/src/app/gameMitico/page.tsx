
"use client"
import Image from "next/image";
import Link from "next/link";
import pikachu from "../../../public/pikachuFofo.png";
import mapa from "../../../public/paisagens/mapaPokemon.jpg";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import voltar from '../../../public/voltar.png'

const game = () => {
  const router = useRouter();

  // Lista de locais no mapa e suas respectivas rotas
  const locations = [
    { top: "20%", left : "35%", path: "/pokemon/4"},
    { top: "30%", left: "60%", path: "/pokemon/2" },
    { top: "70%", left: "50%", path: "/pokemon/3" },
    { top: "50%", left: "70%", path: "/pokemon/3" },
    { top: "40%", left: "50%", path: "/pokemon/3" },
    { top: "55%", left: "80%", path: "/pokemon/3" },
    { top: "70%", left: "10%", path: "/pokemon/3" },
    { top: "30%", left: "20%", path: "/pokemon/3" },
    { top: "60%", left: "30%", path: "/pokemon/3" },
    { top: "30%", left: "80%", path: "/pokemon/3" },
    { top: "18%", left: "13%", path: "/pokemon/3" },
  ];

  // const handleClick = (path : string) => {
  //   // router.push(path);
  // };
  // onClick={() => handleClick(loc.path)}

  return (
    <div className="flex flex-col min-h-screen p-2">

      <div className="flex items-start justify-start" >
        <Link className="m-2 bg-slate-200 p-2 rounded hover:bg-slate-300" href={ROUTES.selectMap}>
          <Image src={voltar} alt="voltar" className="justify-start max-w-5" ></Image>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3" >
        {/* Header */}
        <div className="flex items-start mt-10 justify-start bg-slate-200 rounded-3xl gap-3 p-4 max-w-90">
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
              onClick={() =>  router.push(ROUTES.pageMitico)}
            ></div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default game;
