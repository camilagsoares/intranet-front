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

const TableSecretary = (props) => {

    const { data, loading } = useApiRequestGet('/secretaria/listar-secretarias')
    console.log(data)

    const [searchText, setSearchText] = useState('')

    const dadosFiltrados = data && data.filter((number) => {
        const textoFiltrado = `${number.id} ${number.nome} ${number.sigla}`

        return textoFiltrado.trim().toLowerCase().includes(searchText.trim().toLowerCase())
    })


    return (
        <React.Fragment>
            <Box marginY={1} paddingY={2}>


                <Box sx={{ p: 1 }}>
                    <Container>
                        <SearchIcon />
                        <ContainerInput
                            type="text"
                            placeholder="Digite para filtrar..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Container>
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
                                    </StyledTableRow>
                                ))
                            ) : (
                                <StyledTableRow >
                                    <StyledTableCell  colSpan={7}>

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
