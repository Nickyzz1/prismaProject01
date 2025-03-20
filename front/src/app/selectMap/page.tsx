
"use client"
import Image from "next/image";
import pikachu from "../../../public/pikachuFofo.png";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import voltar from '../../../public/voltar.png'

const selectMap = () => {

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex items-start justify-start" >
        <Link className="m-2 bg-slate-200 p-2 rounded hover:bg-slate-300" href={ROUTES.home}>
          <Image src={voltar} alt="voltar" className="justify-start max-w-5" ></Image>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3" >
        <div className="flex items-start mt-10 justify-start bg-slate-200 rounded-3xl gap-3 p-4 max-w-90">
          <Image
            className="max-w-40 outline-3 outline-slate-800 object-cover rounded-full"
            src={pikachu}
            alt="pikachu"
          />
          <h1>
            Bem vindo, caçador! Por onde deseja começar?
          </h1>
        </div>
        <div className="flex gap-9">
          <Link href={ROUTES.gameCuritiba}>
            <div className="bg-slate-200 rounded-2xl p-2 hover:bg-slate-300 cursor-pointer" > <h1>Curitiba 😎</h1></div>
          </Link>
          <Link href={ROUTES.game}>
            <div className="bg-slate-200 rounded-2xl p-2 hover:bg-slate-300 cursor-pointer" > <h1>Cidade mítica 🤩</h1></div>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default selectMap;
