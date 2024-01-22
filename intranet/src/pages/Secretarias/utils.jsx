import React from 'react';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

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


