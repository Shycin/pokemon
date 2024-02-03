import { PrismaModule } from './prisma/prisma.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { Module } from "@nestjs/common";
import { PrismaService } from './prisma/prisma.service';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonController } from './pokemon/pokemon.controller';

@Module({
  imports: [PrismaModule, PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
