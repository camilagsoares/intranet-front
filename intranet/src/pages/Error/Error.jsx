import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Container } from './styles';



const Error = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container >
                <Grid container >
                    <Grid>
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h6">
                            A página que você procura não existe.
                        </Typography>

                        <Link to="/">
                            <Button variant="contained">Voltar para o início</Button>
                        </Link>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Error;