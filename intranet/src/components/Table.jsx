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
import Pagination from '@mui/material/Pagination';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';
import { createTheme } from '@mui/material/styles';
import Modal from './Modal';
import { FaCircleUser } from "react-icons/fa6";


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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='customized table' >
                        <TableHead className='borda-azul'>
                            <StyledTableRow>

                                <StyledTableCell align='left' width={112}>

                                    Nome
                                </StyledTableCell>


                                <StyledTableCell width={192}>Departamento</StyledTableCell>
                                <StyledTableCell align='left' width={180}>
                                    Secretaria
                                </StyledTableCell>
                                <StyledTableCell align='left' width={112}>
                                    Cargo
                                </StyledTableCell>
                                <StyledTableCell align='left' width={180}>
                                    Telefone
                                </StyledTableCell>
                                <StyledTableCell align='left' width={180}>
                                    Modal
                                </StyledTableCell>



                            </StyledTableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">
                                    <FaCircleUser size={40} />
                                </TableCell>
                                <TableCell align="left">-</TableCell>
                                <TableCell align="left">-</TableCell>
                                <TableCell align="left">-</TableCell>
                                <TableCell align="left">-</TableCell>
                                <TableCell align="left"> <Modal /></TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </React.Fragment>
    );
};



export default TableT;
