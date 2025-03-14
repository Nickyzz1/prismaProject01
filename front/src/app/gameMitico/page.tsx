
"use client"
import Image from "next/image";
import pikachu from "../../../public/pikachuFofo.png";
import mapa from "../../../public/paisagens/mapaPokemon.jpg";
import { useRouter } from "next/navigation";

const game = () => {
  const router = useRouter();

  // Lista de locais no mapa e suas respectivas rotas
  const locations = [
    { top: "20%", left: "30%", path: "/pokemon/1" },
    { top: "40%", left: "60%", path: "/pokemon/2" },
    { top: "70%", left: "50%", path: "/pokemon/3" },
  ];

  const handleClick = (path : string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen items-center gap-3">
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
            onClick={() => handleClick(loc.path)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default game;
