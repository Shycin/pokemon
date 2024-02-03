/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from "@nestjs/common";
import { Pokemon, Prisma } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PokemonService {
    constructor(private prisma: PrismaService) { }

    create(params: {
        data?: Prisma.PokemonCreateInput;
    }): Promise<Pokemon> {
        const { data } = params;

        return this.prisma.pokemon.create({
            data
        });
    }

    findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PokemonWhereUniqueInput;
        where?: Prisma.PokemonWhereInput;
        orderBy?: Prisma.PokemonOrderByWithRelationInput;
    }): Promise<Pokemon[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.pokemon.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    findOne(params: {
        id: string,
    }) {
        const { id } = params;

        return this.prisma.pokemon.findUnique({
            where: {
                id
            },
        });
    }

    update(params: {
        id: string,
        data: Prisma.PokemonUpdateInput
    }) {
        const { id, data } = params;

        return this.prisma.pokemon.update({
            data,
            where: {
                id
            },
        });
    }

    delete(params: {
        id: string
    }) {
        const { id } = params;

        return this.prisma.pokemon.delete({
            where: {
                id
            },
        }).catch((err) => {
            return false
        })
    }
}
