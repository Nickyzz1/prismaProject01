import { prisma } from "./prisma.ts";

async function seed() {
  // Adding pokébolas on database
  const pokebolas = [
    { name: "Pokebola", capture_percentual: 0.4, image : '../public/pokeBall.png', price: 3},
    { name: "Great Ball", capture_percentual: 0.6, image : '../public/greatBall.png', price: 4},
    { name: "Ultra Ball", capture_percentual: 0.8, image : '../public/ultraBall.png', price: 7},
    { name: "Master Ball", capture_percentual: 1.0, image : '../public/masterBall.png', price: 10}, 
  ];

  // Inserting ...
  for (const ball of pokebolas) {
    await prisma.pokeBall.create({
      data: { 
        name: ball.name,
        capture_percentual: ball.capture_percentual, 
        image: ball.image,
        price: ball.price
      }
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
