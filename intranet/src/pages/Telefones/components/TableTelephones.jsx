import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useApiRequestGet } from "../../../services/api"
// import { ContainerInput } from "../styles/styles"
import { PaginationTelephones } from "./PaginationTelephones"
import { TableRowsLoaderSkeleton, StyledTableCell, StyledTableRow } from "../utils"

const TableTelephones = (props) => {

    const { data, loading } = useApiRequestGet('/telefone/listar-telefones');


    return (
        <React.Fragment>
            <Box marginY={1} paddingY={2}>

                <Box sx={{ p: 1 }}>
                    {/* <ContainerInput placeholder='Pesquisar' /> */}

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

                            </StyledTableRow>
                        </TableHead>

                        <TableBody>
                            {
                                loading ? (<TableRowsLoaderSkeleton rowsNum={5} />) : (data && data.length && data
                                    .map((person) => (
                                        <StyledTableRow key={person?.id}>
                                            <StyledTableCell align="left" >
                                                {person.numero}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" >
                                                {person.nome}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" >
                                                {person.cargo.nome}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" >
                                            {person.departamento.secretaria.nome}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" >
                                                {person.departamento.nome}
                                            </StyledTableCell>


                                            <StyledTableCell align="left" >
                                                {person.situacao}
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    )))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <PaginationTelephones />
            </Box>
        </React.Fragment>
    );
};



export default TableTelephones;
