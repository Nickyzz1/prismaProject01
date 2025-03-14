"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const messageStart = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Garante que o código só seja executado no lado do cliente
    setIsClient(true);

    // Definir o tempo de espera de 3 segundos e depois redirecionar
    const timer = setTimeout(() => {
      router.push("/game"); // Redireciona para a rota "/game"
    }, 3000); // 3000ms = 3 segundos

    // Limpeza do timer quando o componente for desmontado
    return () => clearTimeout(timer);
  }, [router]);

  if (!isClient) {
    return null; // Previne qualquer renderização no lado do servidor
  }

  return (
    <>
      <div className="flex bg-black min-h-screen items-center justify-center">
        <h1 className="text-white font-code animate-pulse">
          Iniciando seu jogo...
        </h1>
      </div>
    </>
  );
};

export default messageStart;

