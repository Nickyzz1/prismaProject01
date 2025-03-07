import { prisma } from "./prisma.ts";

async function seed() {
  // Adding pokébolas on database
  const pokebolas = [
    { name: "Pokebola", capture_percentual: 0.4, image : '../public/pokeBall.png'},
    { name: "Great Ball", capture_percentual: 0.6, image : '../public/greatBall.png'},
    { name: "Ultra Ball", capture_percentual: 0.8, image : '../public/ultraBall.png'},
    { name: "Master Ball", capture_percentual: 1.0, image : '../public/masterBall.png'}, 
  ];

  // Inserting ...
  for (const ball of pokebolas) {
    await prisma.
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
