import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useApiRequestGet } from "../services/api"
import { ContainerInput, Container, SearchIcon } from "../styles/styles"
import Skeleton from '@mui/material/Skeleton';
import { IoMdSearch } from "react-icons/io";


const TableT = (props) => {


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.
                palette.info.dark,
            color: theme.palette.primary.contrastText,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },

    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    }));

    const TableRowsLoaderSkeleton = ({ rowsNum }) => {
        return [...Array(rowsNum)].map((row, index) => (
            <TableRow key={index}>
                <StyledTableCell component='th' scope='row'>
                    <Skeleton animation='wave' variant='text' height={36} />
                </StyledTableCell>
                <StyledTableCell>
                    <Skeleton animation='wave' variant='text' height={36} />
                </StyledTableCell>
                <StyledTableCell>
                    <Skeleton animation='wave' variant='text' height={36} />
                </StyledTableCell>
                <StyledTableCell>
                    <Skeleton animation='wave' variant='text' height={36} />
                </StyledTableCell>
                <StyledTableCell>
                    <Skeleton animation='wave' variant='text' height={36} />
                </StyledTableCell>
                <StyledTableCell>
                    <Skeleton animation='wave' variant='text' height={36} />
                </StyledTableCell>
                <StyledTableCell>
                    <Skeleton animation='wave' variant='text' height={36} />
                </StyledTableCell>
                <StyledTableCell>
                    <Skeleton animation='wave' variant='text' height={36} />
                </StyledTableCell>
            </TableRow>
        ));
    };

    const { data, loading } = useApiRequestGet('/telefone/listar-telefones')



    const [pageNumber, setPageNumber] = useState(0);
    const projectsPerPage = 6;
    const pagesVisited = pageNumber * projectsPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        setPageNumber(0);
    }, [data]);


    //

    const [searchText, setSearchText] = useState('');

    const filteredData = data && data.filter((number) => {
        const searchableText = `${number?.cargo.nome} ${number?.departamento.nome} ${number?.numero}`;
        return searchableText.trim().toLowerCase().includes(searchText.trim().toLowerCase());
    });

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

                                <StyledTableCell align='left' width={112}>

                                    Nome
                                </StyledTableCell>


                                <StyledTableCell width={192}>Cargo</StyledTableCell>
                                <StyledTableCell align='left' width={180}>
                                    Secretaria
                                </StyledTableCell>
                                <StyledTableCell align='left' width={112}>
                                    Departamento
                                </StyledTableCell>
                                <StyledTableCell align='left' width={180}>
                                    Telefone
                                </StyledTableCell>




                            </StyledTableRow>
                        </TableHead>

                        <TableBody>
                            {filteredData && filteredData.length ? (
                                filteredData.map((number) => (
                                    <StyledTableRow key={number?.id}>
                                        <StyledTableCell align="left" >
                                            -
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            {number?.cargo.nome}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            -
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {number?.departamento.nome}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {number?.numero}
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


                {filteredData && filteredData.length > 0 && (
                    <Box display="flex" justifyContent="end" mt={2} >
                        <Pagination
                            color="primary"
                            count={Math.ceil(filteredData?.length / projectsPerPage)}
                            page={pageNumber + 1}
                            onChange={(event, page) => {
                                changePage({ selected: page - 1 });
                            }}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Box>
                )}
            </Box>

        </React.Fragment>
    );
};



export default TableT;
