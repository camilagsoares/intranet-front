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
import { useApiRequestGet } from "../../../services/api"
import { ContainerInput, Container, SearchIcon } from "../../../styles/styles"
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { MdOutlineClose } from "react-icons/md";
import ModalCriarDepartamento from './modalCriarDepartamento';
import { MdOutlineModeEditOutline } from "react-icons/md";
import ModalEditarDepartamento from './ModalEditarDepartamento';
import ModalDeletarDepartamento from './ModalDeletarDepartamento';
import { MdOutlineEdit } from "react-icons/md";

const TableDepartamentos = (props) => {

    const [open, setOpen] = React.useState(false);

    const [pageNumber, setPageNumber] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [dadoSelecionado, setDadoSelecionado] = useState(null);



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

    const { data, loading } = useApiRequestGet('/departamento/listar-departamentos')
    // console.log(data)

    const projectsPerPage = 6;
    const pagesVisited = pageNumber * projectsPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        setPageNumber(0);
    }, [data]);


    const filteredData = data && data.filter((number) => {
        const searchableText = `${number?.nome} ${number?.id}`;
        return searchableText.trim().toLowerCase().includes(searchText.trim().toLowerCase());
    });

    //
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    // MODAL DELETAR DPTO
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

    const handleDeleteOpen = () => {
        setModalDeleteOpen(true);
    }


    const handleDeleteClose = () => {
        setModalDeleteOpen(false);
    }

    // MODAL EDITAR DPTO
    const [modalEditOpen, setModalEditOpen] = useState(false);

    const handleEditOpen = () => {
        setModalEditOpen(true);
        // setDadoSelecionado(idProjeto)
        console.log("Cliquei no btn de editar")
    }

    const handleEditClose = () => {
        setModalEditOpen(false);
    }



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
                        <Button onClick={handleOpen} variant='outlined' startIcon={<AddIcon />}>Criar departamento</Button>
                        <ModalCriarDepartamento isOpen={modalOpen} onClose={handleClose} />
                    </Grid>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='customized table' >
                        <TableHead className='borda-azul'>
                            <StyledTableRow>
                                <StyledTableCell align='left' width={112}>
                                    Id
                                </StyledTableCell>

                                <StyledTableCell width={300}>Departamento</StyledTableCell>

                                <StyledTableCell width={300}>Secretaria</StyledTableCell>

                                <StyledTableCell align='left' width={20}>
                                    Editar
                                </StyledTableCell>
                                <StyledTableCell align='left' width={20}>
                                    Deletar
                                </StyledTableCell>

                            </StyledTableRow>
                        </TableHead>

                        <TableBody>
                            {filteredData && filteredData.length ? (
                                filteredData?.slice(pagesVisited, pagesVisited + projectsPerPage).map((number) => (
                                    <StyledTableRow key={number?.id}>
                                        <StyledTableCell align="left" >
                                            {number?.id}
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            {number?.nome}
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            {number?.secretaria.nome}
                                        </StyledTableCell>


                                        <StyledTableCell align="left" >
                                                <Tooltip title="Editar" arrow>
                                                    <Button onClick={handleEditOpen}>
                                                        <MdOutlineModeEditOutline size={18} color='#68739C' />
                                                    </Button>
                                                </Tooltip>
                                        </StyledTableCell>

                                        <StyledTableCell align="left" >
                                            <Tooltip title='Deletar' arrow>
                                                <Button onClick={handleDeleteOpen}>
                                                    <MdOutlineClose size={18} color='#68739C' />

                                                </Button>
                                            </Tooltip>
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

                <ModalDeletarDepartamento isOpen={modalDeleteOpen} onClose={handleDeleteClose} />
                <ModalEditarDepartamento isOpen={modalEditOpen} onClose={handleEditClose} />

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



export default TableDepartamentos;
