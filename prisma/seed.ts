import data from '../src/data/players.json';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  for (const team of data) {
    await prisma.club.create({
      data: {
        name: team.team,
        players: {
          create: team.players.map((player: any) => ({
            name: player.name,
            age: player.age,
            role: player.role
          }))
        }
      }
    });
  }
}

main()
  .then(() => {
    console.log("Seed finalizado com sucesso");
    prisma.$disconnect();
  })
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
