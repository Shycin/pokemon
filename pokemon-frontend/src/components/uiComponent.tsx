export const TopLeftPokedex = () => (
    <div
        style={{
            height: "50px",
            padding: "15px",
            display: "flex",
            gap: "20px",
        }}
    >
        <div
            style={{
                borderRadius: "90px",
                border: "5px solid white",
                backgroundColor: "skyblue",
                height: "40px",
                width: "40px",
            }}
        ></div>
        <div style={{ display: "flex", gap: "5px" }}>
            <div
                style={{
                    borderRadius: "90px",
                    backgroundColor: "darkred",
                    height: "10px",
                    width: "10px",
                }}
            ></div>
            <div
                style={{
                    borderRadius: "90px",
                    backgroundColor: "yellow",
                    height: "10px",
                    width: "10px",
                }}
            ></div>
            <div
                style={{
                    borderRadius: "90px",
                    backgroundColor: "lightgreen",
                    height: "10px",
                    width: "10px",
                }}
            ></div>
        </div>
    </div>
)

export const PokemonCard = ({ currentPokemon }: { currentPokemon: number | null }) => {
    const addZeroBegin = currentPokemon?.toString().padStart(3, '0')

    return (
        <div
            style={{
                backgroundColor: "white",
                width: "200px",
                height: "200px",
                margin: "auto",
                borderRadius: "10px",
                display: "flex",
            }}
        >
            <div
                style={{
                    backgroundColor: "black",
                    width: "150px",
                    height: "150px",
                    margin: "auto",
                }}
            >
                {addZeroBegin ? <img
                    width="150px"
                    height="150px"
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${addZeroBegin}.png`}
                /> : ''}
            </div>
        </div>
    )
}
    

    
