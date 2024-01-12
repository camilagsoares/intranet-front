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
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/CloseOutlined';
import Save from '@mui/icons-material/SaveAltOutlined';


const TableDepartamentos = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchText, setSearchText] = useState('');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
    };


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
    console.log(data)

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
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Box component='form' noValidate>
                                    <DialogContent dividers sx={{ paddingTop: 1 }}>
                                        <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>


                                            <Grid item xs={12} sm={12} md={12}>
                                                <TextField
                                                    // {...register('titulo')}
                                                    fullWidth
                                                    required
                                                    label='Título'
                                                    type='text'
                                                // error={!!errors.titulo}
                                                // helperText={errors.titulo?.message}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <TextField
                                                    // {...register('valor')}
                                                    fullWidth
                                                    required
                                                    label='Valor estimado. Exemplo: 31.000,98'
                                                    type='text'
                                                // error={!!errors.valor}
                                                // helperText={valorError ? 'Não coloque ponto ou vírgula no campo de valor,se precisar arredonde' : errors.valor?.message}
                                                />
                                            </Grid>

                                        </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            // disabled={loading}
                                            startIcon={<Close width={24} />}
                                            variant='outlined'
                                            color='info'
                                            // onClick={handleFecharModalForm}
                                            sx={{ minWidth: 156, height: '100%' }}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type='submit'
                                            // disabled={loading || isButtonDisabled}
                                            // startIcon={<Save width={24} />}
                                            variant='outlined'
                                            color='success'
                                            sx={{ minWidth: 156, height: '100%' }}
                                        >
                                            {/* {!loading ? 'Adicionar' : <CircularProgress color='success' size={23} />} */}
                                        </Button>
                                    </DialogActions>
                                </Box>
                            </Box>
                        </Modal>
                    </Grid>
                </Box>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='customized table' >
                        <TableHead className='borda-azul'>
                            <StyledTableRow>
                                <StyledTableCell align='left' width={112}>

                                    Id
                                </StyledTableCell>


                                <StyledTableCell width={192}>Departamento</StyledTableCell>

                                <StyledTableCell align='left' width={180}>
                                    Editar
                                </StyledTableCell>
                                <StyledTableCell align='left' width={180}>
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
                                            -
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            <Button>
                                                <MdOutlineClose size={18} color='#68739C' />

                                            </Button>
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
