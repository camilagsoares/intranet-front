import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useApiRequestGet } from "../../../services/api"
import { PaginationTelephones } from "./PaginationTelephones"
import { TableRowsLoaderSkeleton, StyledTableCell, StyledTableRow } from "../utils"
import { ContainerInput, Container, SearchIcon } from "../../../styles/styles"
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

const TableTelephones = (props) => {

    const { data, loading } = useApiRequestGet('/telefone/listar-telefones');

    const [searchText, setSearchText] = useState('')

    const dadosFiltrados = data && data.filter((number) => {
        const textoFiltrado = `${number.numero} ${number.nome} ${number.cargo} ${number.departamento.secretaria.nome} ${number.departamento.nome} ${number.situacao}`

        return textoFiltrado.trim().toLowerCase().includes(searchText.trim().toLowerCase())
    })


    return (
        <React.Fragment>
            <Box marginY={1} paddingY={2}>


                <Box  sx={{ p: 1 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        <Button variant='outlined' startIcon={<AddIcon />}>Criar telefone</Button>
                    </Grid>
                </Box>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='customized table' >
                        <TableHead className='borda-azul'>
                            <StyledTableRow>
                                <StyledTableCell align='left' width={112}>
                                    Número
                                </StyledTableCell>


                                <StyledTableCell width={192}>Nome</StyledTableCell>

                                <StyledTableCell align='left' width={200}>
                                    Cargo
                                </StyledTableCell>

                                <StyledTableCell align='left' width={200}>
                                    Secretaria
                                </StyledTableCell>

                                <StyledTableCell align='left' width={112}>
                                    Departamento
                                </StyledTableCell>



                                <StyledTableCell align='left' width={112}>
                                    Situação
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
                                            {number.numero}
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            {number.nome}
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            {number.cargo.nome}
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            {number.departamento.secretaria.nome}
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            {number.departamento.nome}
                                        </StyledTableCell>


                                        <StyledTableCell align="left" >
                                            {number.situacao}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                        <MdOutlineEdit size={18} color='#68739C'/>

                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            <Button>
                                                <MdOutlineClose size={18} color='#68739C'/>

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

                <PaginationTelephones />
            </Box>
        </React.Fragment>
    );
};



export default TableTelephones;
