import Image from "next/image";
import Textarea from "@mui/joy/Textarea";
import { Button, Input, TextField } from "@mui/material";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import pokemon from '../../../public/pokemonRemove.png';

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-radial from-sky-100 to-sky-200">
          <div className="flex flex-col items-center wrap outline-double  bg-sky-400 h-full p-12 gap-3 w-96 outline-9 rounded-2xl outline-sky-500" >
        <Image src={pokemon} alt="pokemon" className="" ></Image>
          <Input placeholder="Email" sx={{
            '&::before': {
                display: 'none',}, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px',
               },
              }} className="bg-sky-50 rounded p-2 mt-2" 
            />

          <Input placeholder="Password" sx={{
            '&::before': {
                display: 'none',}, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px',
               },
              }} className="bg-sky-50 rounded  p-2" 
            />
          
            <Button variant="contained">Logar</Button>
            <Link href={ROUTES.register}>Naõ tem uma conta? Cadastre-se</Link>
          </div>
      </div>
    
    </>
  );
}
