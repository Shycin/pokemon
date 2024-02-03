export interface Pokemon {
    id: string,
    name: string,
    type: string[],
    description: string,
    idPokedex: number
}

export interface PokemonInputs {
    name: HTMLInputElement,
    type: HTMLInputElement[],
    description: HTMLInputElement,
    idPokedex: HTMLInputElement
}

export interface PokemonForm {
    readonly target: PokemonInputs;
}