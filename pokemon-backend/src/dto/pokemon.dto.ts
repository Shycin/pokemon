import { ApiProperty } from '@nestjs/swagger';
import { PokemonType } from '@prisma/client';


export class CreatePokemonDto {

    @ApiProperty({ default: "Salamèche" })
    name: string

    @ApiProperty({ default: Object.keys(PokemonType) })
    type?: PokemonType[]

    @ApiProperty({ default: "Pokemon de type feu, retrouvé au début du jeu" })
    description: string

    @ApiProperty({ default: 4 })
    idPokedex: number
}

export class UpdatePokemonDto {

    @ApiProperty()
    name?: string

    @ApiProperty({ default: Object.keys(PokemonType) })
    type?: PokemonType[]

    @ApiProperty()
    description?: string

    @ApiProperty()
    idPokedex?: number
}
