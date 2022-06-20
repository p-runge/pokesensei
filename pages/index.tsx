import { Box, Button, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'

const Home: NextPage = (props) => {
  const title = 'PokéSensei'
  const copy = 'Here you can test your Pokémon knowledge and see if you\'re a true Pokémon master!'

  return (
    <Container component="main">
      <Box>
        <Typography variant="h1">{title}</Typography>
        <Typography>{copy}</Typography>
        <Button variant="contained" size="large">Start</Button>
      </Box>
    </Container>
  )
}

export default Home
