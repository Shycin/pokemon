/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon, PokemonType } from '@prisma/client';
import { CreatePokemonDto, UpdatePokemonDto } from 'src/dto/pokemon.dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get('type')
    findAllType() {
        return Object.keys(PokemonType)
    }

    @Post()
    async create(@Body() createPokemon: CreatePokemonDto): Promise<Pokemon> {

        try {
            const response = await this.pokemonService.create({ data: createPokemon })

            if (response)
                return response

            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Id is invalid',
            }, HttpStatus.NOT_FOUND, {
                cause: "not found"
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'pokemon is already created',
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }

    @Get()
    findAll(): Promise<Pokemon[]> {
        return this.pokemonService.findAll({});
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const response = await this.pokemonService.findOne({ id })

        if (response)
            return response

        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Id is invalid',
        }, HttpStatus.NOT_FOUND, {
            cause: "not found"
        });
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePokemon: UpdatePokemonDto) {
        try {
            return this.pokemonService.update({ id, data: updatePokemon })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Id is invalid',
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const response = await this.pokemonService.delete({ id })

        if (response) {
            return response
        }
        else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Id is invalid',
            }, HttpStatus.NOT_FOUND, {
                cause: "not found"
            });
        }
    }
}
