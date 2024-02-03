import React from 'react'
import './App.css'
import { ShowInformation } from './components/showInformation'
import { deleteData, getAll, postData, putData } from './utils/fetcher'
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Snackbar, TextField, Typography } from '@mui/material';
import { Pokemon } from './dto/pokemon.dto';
import { PokemonCard } from './components/uiComponent';

const modalStlye = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: "black",
  textWrap: "balance"
};

const initialSnackBar = { message: '', statusCode: null}

function App() {

  const [openModal, setOpenModal] = React.useState<"add" | "update" | "delete" | null>(null);
  const [snackbarMessage, setSnackbarMessage] = React.useState<{message: string, statusCode: number | null}>({ message: '', statusCode: null});
  
  const handleClose = () => { setOpenModal(null); setSnackbarMessage(initialSnackBar) };

  
  
  const [allPokemon, setAllPokemon] = React.useState<Pokemon[]>([])
  const [allPokemonType, setAllPokemonType] = React.useState<string[]>([])
  const [currenIndexPokemon, setCurrentIndexPokemon] = React.useState<number>(0)

  const UpdatePokemon = ({ pokemon, isUpdated = false }: { pokemon?: Pokemon, isUpdated?: boolean }) => {
    const [type, setType] = React.useState<string[]>(pokemon?.type || []) 
    const [idPokedex, setIdPokedex] = React.useState<number | null>(pokemon?.idPokedex || null)

    const handleChangeType = (event: SelectChangeEvent<typeof type>) => {
      const { target: { value } } = event;
      setType(
        Array.isArray(value) ? value : [],
      );
    };

    const handleChangeIdPokedex = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target: { value }} = event;
      setIdPokedex(
        typeof value === 'string' && !isNaN(parseInt(value)) ? parseInt(value) : null,
      );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent default behavior
        event.preventDefault();
      
      const formData = new FormData(event.currentTarget)
      if (isUpdated && pokemon)
      {
        let data: Pokemon | {} = {}
        if (pokemon.name !== formData.get('pokemon-name'))
          Object.assign(data, { name: formData.get('pokemon-name') });
        
        if (pokemon.description !== formData.get('pokemon-desc'))
          Object.assign(data, { description: formData.get('pokemon-desc') });
        
        if (pokemon.idPokedex !== idPokedex)
          Object.assign(data, { idPokedex: idPokedex });
        
        const newMapType = new Map()
        pokemon.type.forEach((eachType, index) => newMapType.set(eachType, index))

        const includesAny = () => type.every(v => newMapType.has(v));

        if (!includesAny())
          Object.assign(data, {type: type});
       
        updateData({ pokemon: { id: pokemon.id, ...data } as Pokemon, isUpdated})
      }
      else
      {
        const data: Omit<Pokemon, 'id'> = {
          name: formData.get('pokemon-name') as string,
          type: type,
          description: formData.get('pokemon-desc') as string,
          idPokedex: idPokedex as number 
          };
        
        updateData({ pokemon: data as Pokemon, isUpdated})
      }
      
    }

    return (
      <form autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "20px"}} onSubmit={handleSubmit}>
        <Typography variant='h4' component='p'>{pokemon ? "Modification" : "Ajoute"} d'un pokemon</Typography>
        <TextField id="pokemon-name" name="pokemon-name" label="Nom" variant="standard" defaultValue={pokemon?.name} required/>
        <FormControl fullWidth>
          <InputLabel id="pokemon-type">Type</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="pokemon-type"
            name="pokemon-type"
            value={type}
            label="Age"
            onChange={handleChangeType}
          >
            {
              allPokemonType.map((type, index) => <MenuItem key={`pokemon-type-${index}`} value={type}>{type}</MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField id="pokemon-desc" name="pokemon-desc" label="Description" variant="standard" defaultValue={pokemon?.description} required />
        <TextField id="pokemon-pokedex-id" name="pokemon-pokedex-id" value={idPokedex ?? ""} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', type: 'number' }} onChange={handleChangeIdPokedex} required />
        <PokemonCard currentPokemon={idPokedex} />
        <FormControl fullWidth sx={{display: 'flex', flexDirection: "row", justifyContent: "center", gap: "20px"}}>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">{pokemon ? "Modifier" : "Ajouter"}</Button>
        </FormControl>
        
      </form>
    )
  }

  const DeletePokemon = ({ pokemon}: { pokemon: Pokemon }) => {
    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        // Prevent default behavior
        event.preventDefault();

        const responseUpdate = await deleteData(`pokemon/${pokemon.id}`)
        setAllPokemon((oldPokemon) => oldPokemon.filter((each) => {
          if (each.id === responseUpdate.id)
            return null

          return each
        }))
        handleClose()
    }

    return (
    <form autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "20px"}} onSubmit={handleSubmit}>
      <Typography variant='h4' component='p'>Supprimer un pokemon</Typography>
        <Box>
          <Typography>Voulez-vous supprimer le pokemon : {pokemon.name} ? </Typography>
          <PokemonCard currentPokemon={pokemon.idPokedex} />
        </Box>
        <FormControl fullWidth sx={{display: 'flex', flexDirection: "row", justifyContent: "center", gap: "20px"}}>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Supprimer</Button>
        </FormControl>
      </form>)
  }

  const updateData = async ({ pokemon, isUpdated } : {pokemon: Pokemon, isUpdated: boolean}) => {
    const { id, ...rest } = pokemon
    
    if (isUpdated && id)
    {
      const responseUpdate = await putData(`pokemon/${id}`, rest)

      console.log("responseUpdate", responseUpdate)
      if (responseUpdate.statusCode === 200)
      {
        setAllPokemon((oldPokemon) => oldPokemon.map((each) => {
          if (each.id === responseUpdate.id)
            return responseUpdate

          return each
        }))

        setSnackbarMessage({ message: `Pokemon ${responseUpdate.name} is updated`, statusCode: responseUpdate.statusCode })

      }
      else
      {
        setSnackbarMessage({ message: responseUpdate.error, statusCode: responseUpdate.statusCode })
      }
    }
    else
    {
      const responseCreate = await postData("pokemon", rest)

      if (responseCreate)
      {
        setSnackbarMessage({ message: `Pokemon ${responseCreate.name} is created`, statusCode: 200 })
        setAllPokemon((oldPokemon) => [...oldPokemon, responseCreate])
      }
      else
      {
        setSnackbarMessage({ message: responseCreate.error, statusCode: responseCreate.statusCode })
      }

    }
  }

  const clearData = async () => {
    setAllPokemon([])
    setAllPokemonType([])

    setTimeout(() => {
      loadData()
    }, 5000)
    
    
  }

  const loadData = async () => {
    setAllPokemon([])
    setAllPokemonType([])

    Promise.all([getAll("pokemon"), getAll("pokemon/type")]).then((responses) => {
      setAllPokemon(responses[0])
      setAllPokemonType(responses[1])
    });
  }

  const changeCurrentIndexPokemon = (newIndex: number) => {
    setCurrentIndexPokemon(newIndex)
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      loadData()
    }, 2000)

    return () => {
        clearTimeout(timer)
      }
  }, [])

  React.useEffect(() => {
    setCurrentIndexPokemon(allPokemon.length - 1)
  }, [allPokemon])

  return (
    <>
      <div className={`pokedex ${allPokemon.length ? "open" : ''}`}>
        <Modal
          open={!!openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStlye}>
            {openModal === 'add' ? <UpdatePokemon /> : ''}
            {openModal === 'update' ? <UpdatePokemon pokemon={allPokemon[currenIndexPokemon]} isUpdated={true} /> : ''}
            {openModal === 'delete' ? <DeletePokemon pokemon={allPokemon[currenIndexPokemon]} /> : ''}
            <Snackbar
              open={!!snackbarMessage.message}
              autoHideDuration={6000}
              onClose={() => setSnackbarMessage(initialSnackBar)}
            >
              <Alert
                onClose={() => setSnackbarMessage(initialSnackBar)}
                severity={ snackbarMessage.statusCode === 200 ? "success" : "error"}
                variant="filled"
                sx={{ width: '100%' }}
              >
                {snackbarMessage.message}
              </Alert>
            </Snackbar>
          </Box>
        </Modal>
        <ShowInformation allPokemon={allPokemon} indexCurrentPokemon={currenIndexPokemon} handleChangePokemon={changeCurrentIndexPokemon}/>
        <div className="flip-card-pokedex">
          <div className="flip-card-inner">
            <div style={{ backgroundColor: "transparent" }}></div>
            <div>
              <div className="flip-card-front"  style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px"}}>
                <button onClick={() => setOpenModal('add')}>add pokemon</button>
                <button onClick={() => setOpenModal('update')}>update pokemon</button>
                <button onClick={() => setOpenModal('delete')}>delete pokemon</button>
              </div>
              <div className="flip-card-back">
                <div className={`pokeball ${allPokemon.length ? "catch" : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{margin: "50px auto"}} className={`pokeball catch`}><Button sx={{color: 'white'}} onClick={() => clearData()}>Refresh pokedex</Button></div>
    </>
  )
}

export default App
