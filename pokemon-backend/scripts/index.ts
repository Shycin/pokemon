import { PokemonType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.pokemon.create({
        data: {
            name: 'Salamèche',
            type: [PokemonType.FEU],
            description: 'Pokemon de type feu, retrouvé au début du jeu',
            idPokedex: 4
        },
    });

    const allPokemon = await prisma.pokemon.findMany();
    console.dir(allPokemon, { depth: null });
}

main()
    .catch(async (e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
