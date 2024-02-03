import { PokemonCard, TopLeftPokedex } from "./uiComponent"
import { Pokemon } from "../dto/pokemon.dto"

export const ShowInformation = ({
    allPokemon, indexCurrentPokemon = 0, handleChangePokemon
} : {
    allPokemon: Pokemon[], indexCurrentPokemon?: number, handleChangePokemon: (nextIndexPokemon: number) => void
    }) => {
    
    const handleChangeIndex = (newIndex: number) => {
        if(newIndex%allPokemon.length >= 0)
            handleChangePokemon(newIndex % allPokemon.length)
        else
            handleChangePokemon(allPokemon.length - 1)
    }
    return (
        <div className="left-open-pokedex">
            <TopLeftPokedex />
            <PokemonCard currentPokemon={allPokemon[indexCurrentPokemon]?.idPokedex} />
            <div
                className="pokedexInteraction"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: '20px',
                    padding: "20px 0",
                    height: "80px",
                    width: "100%",
                    position: "absolute",
                    zIndex: 99,
                }}
            >
                <ul
                    style={{
                        backgroundColor: "lightgreen",
                        width: "100px",
                        overflow: "hidden",
                        textAlign: "left"
                    }}
                >
                    <li>{allPokemon[indexCurrentPokemon-1]?.name}</li>
                    <li>{allPokemon[indexCurrentPokemon]?.name}</li>
                    <li>{allPokemon[indexCurrentPokemon+1]?.name}</li>
                </ul>
                <div className="joysticks">
                    <button className="topArrow" onClick={() => handleChangeIndex(indexCurrentPokemon-1)}></button>
                    <button className="leftArrow"></button>
                    <button className="rightArrow"></button>
                    <button className="bottomArrow" onClick={() => handleChangeIndex(indexCurrentPokemon+1)}></button>
                </div>
            </div>
        </div>
    )
}