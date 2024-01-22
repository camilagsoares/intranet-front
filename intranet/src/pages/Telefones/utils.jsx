import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineClose } from "react-icons/md";
import { Box } from '@mui/material';
import { MdOutlineEdit } from "react-icons/md";
import React, { useState, useEffect } from 'react';

export {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Grid,
    AddIcon,
    Button,
    Tooltip,
    MdOutlineClose,
    Box,
    Pagination,
    MdOutlineEdit,
    useState,
    useEffect,
    React 
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.
            palette.info.dark,
        color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },

}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export const TableRowsLoaderSkeleton = ({ rowsNum }) => {
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


