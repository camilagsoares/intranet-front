import { Container } from './styles';
import * as imports from "../../imports/utils";


const Error = () => {

    return (
        <imports.Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container >
                <imports.Grid container >
                    <imports.Grid>
                        <imports.Typography variant="h1">
                            404
                        </imports.Typography>
                        <imports.Typography variant="h6">
                            A página que você procura não existe.
                        </imports.Typography>

                        <imports.Link to="/">
                            <imports.Button variant="contained">Voltar para o início</imports.Button>
                        </imports.Link>

                    </imports.Grid>
                </imports.Grid>
            </Container>
        </imports.Box>
    )
}

export default Error;