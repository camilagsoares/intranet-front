import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useApiRequestGet } from "../../../services/api"
import { ContainerInput, Container, SearchIcon } from "../../../styles/styles"
import { PaginationSecretary } from "./PaginationSecretary"
import { TableRowsLoaderSkeleton, StyledTableCell, StyledTableRow } from "../utils"
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

const TableSecretary = (props) => {

    const { data, loading } = useApiRequestGet('/secretaria/listar-secretarias')

    const [searchText, setSearchText] = useState('')

    const dadosFiltrados = data && data.filter((number) => {
        const textoFiltrado = `${number.id} ${number.nome} ${number.sigla}`

        return textoFiltrado.trim().toLowerCase().includes(searchText.trim().toLowerCase())
    })


    return (
        <React.Fragment>
            <Box marginY={1} paddingY={2}>


                <Box sx={{ p: 1 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Container>
                        <SearchIcon />
                        <ContainerInput
                            type="text"
                            placeholder="Digite para filtrar..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Container>

                    <Grid container justifyContent="flex-end">
                        <Button variant='outlined' startIcon={<AddIcon />}>Criar secretaria</Button>
                    </Grid>
                </Box>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='customized table' >
                        <TableHead className='borda-azul'>
                            <StyledTableRow>

                                <StyledTableCell width={192}>Id</StyledTableCell>

                                <StyledTableCell align='left' width={180}>
                                    Nome
                                </StyledTableCell>

                                <StyledTableCell align='left' width={112}>
                                    Secretaria
                                </StyledTableCell>

                                <StyledTableCell align='left' width={180}>
                                    Editar
                                </StyledTableCell>
                                <StyledTableCell align='left' width={180}>
                                    Deletar
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>


                        <TableBody>
                            {dadosFiltrados && dadosFiltrados.length ? (
                                dadosFiltrados.map((number) => (
                                    <StyledTableRow key={number?.id}>


                                        <StyledTableCell align="left" >
                                            {number.id}
                                        </StyledTableCell>


                                        <StyledTableCell align="left" >
                                            {number.sigla}
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            {number.nome}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            <Button>
                                                <MdOutlineEdit size={18} color='#68739C' />
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            <Button>
                                                <MdOutlineClose size={18} color='#68739C' />

                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <StyledTableRow >
                                    <StyledTableCell colSpan={7}>

                                        Nenhum resultado encontrado.

                                    </StyledTableCell>


                                </StyledTableRow>

                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <PaginationSecretary />
            </Box>
        </React.Fragment>
    );
};



export default TableSecretary;
