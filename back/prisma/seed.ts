import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Adding pokébolas on database
  const pokebolas = [
    { name: "Pokébola", capture_percentual: 0.4, quantityToPlayer: 10 },
    { name: "Great Ball", capture_percentual: 0.6, quantityToPlayer: 5 },
    { name: "Ultra Ball", capture_percentual: 0.8, quantityToPlayer: 3 },
    { name: "Master Ball", capture_percentual: 1.0, quantityToPlayer: 1 }, 
  ];

  // Inserting ...
  for (const ball of pokebolas) {
    await prisma.pokedex.create({
      data: ball,
    });
  }

  console.log("Pokébolas criadas com sucesso!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1); // Exit code error
  })
  .finally(async () => {
    await prisma.$disconnect(); // thats is disconnecting database if sucess on the task
  });
