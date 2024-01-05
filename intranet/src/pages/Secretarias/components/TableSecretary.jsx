import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useApiRequestGet } from "../../../services/api"
// import { ContainerInput } from "../styles/styles"
import { PaginationSecretary } from "./PaginationSecretary"
import { TableRowsLoaderSkeleton, StyledTableCell, StyledTableRow } from "../utils"

const TableSecretary = (props) => {

    const { data, loading } = useApiRequestGet('/secretaria/listar-secretarias')

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
                            {
                                loading ? (<TableRowsLoaderSkeleton rowsNum={5} />) : (data && data.length && data
                                    .map((secretary) => (
                                        <StyledTableRow key={secretary?.id}>

                                            <StyledTableCell align="left" >
                                                {secretary.id}
                                            </StyledTableCell>


                                            <StyledTableCell align="left" >
                                                {secretary.sigla}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" >
                                                {secretary.nome}
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    )))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <PaginationSecretary />
            </Box>
        </React.Fragment>
    );
};



export default TableSecretary;
