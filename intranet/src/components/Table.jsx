import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';
import { createTheme } from '@mui/material/styles';
import { FaCircleUser } from "react-icons/fa6";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useApiRequestGet } from "../services/api"
import { ContainerInput } from "../styles/styles"

const TableT = (props) => {


    const theme = createTheme({
        palette: {
            secondary: {
                main: '#EC8718'
            },
        },
    });


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

    const { data } = useApiRequestGet('/telefone/listar-telefones')

    const DataNumero = data?.map(res => res.numero)
    

    const [pageNumber, setPageNumber] = useState(0);
    const projectsPerPage = 6;
    const pagesVisited = pageNumber * projectsPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        setPageNumber(0);
    }, [data]);

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


    return (
        <React.Fragment>
            <Box marginY={1} paddingY={2}>

                <Box sx={{ p: 1 }}>
                    <ContainerInput placeholder='Pesquisar' />

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

                            {data && data.length && data

                                .map((number) => (
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
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                {data && data.length > 0 && (
                    <Box display="flex" justifyContent="end" mt={2} >
                        <Pagination
                            color="primary"
                            count={Math.ceil(data?.length / projectsPerPage)}
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
