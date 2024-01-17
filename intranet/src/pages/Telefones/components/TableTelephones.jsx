import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useApiRequestGet } from "../../../services/api"
import { TableRowsLoaderSkeleton, StyledTableCell, StyledTableRow } from "../utils"
import { ContainerInput, Container, SearchIcon } from "../../../styles/styles"
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import ModalCriarTelefone from './ModalCriarTelefone/index';
import ModalDeletarTelefone from './ModalDeletarTelefone/index';
import ModalEditarTelefone from './ModalEditarTelefone/index';
import Tooltip from '@mui/material/Tooltip';
import { useModal } from '../modalUtils';

const TableTelephones = (props) => {

    const { data, loading } = useApiRequestGet('/telefone/listar-telefones');

    const [pageNumber, setPageNumber] = useState(0);
    const projectsPerPage = 6;
    const pagesVisited = pageNumber * projectsPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        setPageNumber(0);
    }, [data]);

    const [searchText, setSearchText] = useState('')

    const dadosFiltrados = data && data.filter((number) => {
        const textoFiltrado = `${number.numero} ${number.nome} ${number.cargo.nome} ${number.departamento.secretaria.nome} ${number.departamento.nome} ${number.situacao}`

        return textoFiltrado.trim().toLowerCase().includes(searchText.trim().toLowerCase())
    })

    //
    const [token, setToken] = useState(localStorage.getItem('token'));

    const isAuthenticated = !!token;


    const { modalOpen,
        handleOpen,
        handleClose,
        modalDeleteOpen,
        handleDeleteOpen,
        handleDeleteClose,
        modalEditOpen,
        handleEditOpen,
        handleEditClose,
        selectedDeleteId,
        selectedItemId,
        setSelectedItemId
    } = useModal();




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
                        {
                            isAuthenticated && (
                                <Button onClick={handleOpen} variant='outlined' startIcon={<AddIcon />}>Criar telefone</Button>
                            )
                        }
                        <ModalCriarTelefone isOpen={modalOpen} onClose={handleClose} data={data} />
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
                                {
                                    isAuthenticated && (
                                        <StyledTableCell align='left' width={30}>
                                            Editar
                                        </StyledTableCell>
                                    )
                                }

                                {
                                    isAuthenticated && (
                                        <StyledTableCell align='left' width={30}>
                                            Deletar
                                        </StyledTableCell>
                                    )
                                }
                            </StyledTableRow>
                        </TableHead>

                        <TableBody>
                            {dadosFiltrados && dadosFiltrados.length ? (
                                dadosFiltrados?.slice(pagesVisited, pagesVisited + projectsPerPage).map((number) => (
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

                                        {
                                            isAuthenticated && (
                                                <StyledTableCell align="left">
                                                    <Tooltip title="Editar" arrow>
                                                        <Button  onClick={() => number?.id && handleEditOpen(number.id)}>
                                                            <MdOutlineEdit size={18} color='#68739C' />
                                                        </Button>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            )
                                        }

                                        {
                                            isAuthenticated && (
                                                <StyledTableCell align="left" >
                                                    <Tooltip title='Deletar' arrow>
                                                        <Button onClick={() => handleDeleteOpen(number?.id)}>
                                                            <MdOutlineClose size={18} color='#68739C' />

                                                        </Button>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            )
                                        }

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

                <ModalDeletarTelefone isOpen={modalDeleteOpen} onClose={handleDeleteClose} data={data}  selectedDeleteId={selectedDeleteId}/>
                <ModalEditarTelefone isOpen={modalEditOpen} onClose={handleEditClose} data={data}  selectedItemId={selectedItemId}/>

                {dadosFiltrados && dadosFiltrados.length > 0 && (
                    <Box display="flex" justifyContent="end" mt={2} >
                        <Pagination
                            color="primary"
                            count={Math.ceil(dadosFiltrados?.length / projectsPerPage)}
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



export default TableTelephones;
