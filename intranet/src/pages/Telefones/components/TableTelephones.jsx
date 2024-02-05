import { useApiRequestGet } from "../../../services/api"
import { ContainerInput, Container, SearchIcon } from "../../../styles/styles"
import ModalCriarTelefone from './ModalCriarTelefone/index';
import ModalDeletarTelefone from './ModalDeletarTelefone/index';
import ModalEditarTelefone from './ModalEditarTelefone/index';
import { useModal } from '../modalUtils';
import * as imports from "../../../imports/utils";

const TableTelephones = (props) => {

    const { data, loading } = useApiRequestGet('/telefone/listar-telefones');

    const [pageNumber, setPageNumber] = imports.useState(0);
    const projectsPerPage = 6;
    const pagesVisited = pageNumber * projectsPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    imports.useEffect(() => {
        setPageNumber(0);
    }, [data]);

    const [searchText, setSearchText] = imports.useState('')
    const [totalPages, setTotalPages] = imports.useState(0);

    const dadosFiltrados = data && data.filter((number) => {
        const textoFiltrado = `${number.numero} ${number.nome} ${number.cargo.nome} ${number.departamento.secretaria.nome} ${number.departamento.nome} ${number.situacao}`

        return textoFiltrado.trim().toLowerCase().includes(searchText.trim().toLowerCase())
    })

    //
    const [token, setToken] = imports.useState(localStorage.getItem('token'));

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


    imports.useEffect(() => {
        if (dadosFiltrados) {
            setTotalPages(Math.ceil(dadosFiltrados.length / projectsPerPage));
        }
    }, [dadosFiltrados, projectsPerPage]);
    
    return (
        <imports.React.Fragment>
            <imports.Box marginY={1} paddingY={2}>


                <imports.Box sx={{ p: 1 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Container>

                        <ContainerInput
                            type="text"
                            placeholder="Digite para filtrar..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Container>

                    <imports.Grid container justifyContent="flex-end">
                        {
                            isAuthenticated && (
                                <imports.Button onClick={handleOpen} variant='outlined' startIcon={<imports.AddIcon />}>Criar telefone</imports.Button>
                            )
                        }
                        <ModalCriarTelefone isOpen={modalOpen} onClose={handleClose} data={data} />
                    </imports.Grid>
                </imports.Box>


                <imports.TableContainer component={imports.Paper}>
                    <imports.Table sx={{ minWidth: 700 }} aria-label='customized table' >
                        <imports.TableHead className='borda-azul'>
                            <imports.StyledTableRow>
                                <imports.StyledTableCell align='left' width={112}>
                                    Número
                                </imports.StyledTableCell>


                                <imports.StyledTableCell width={192}>Nome</imports.StyledTableCell>

                                <imports.StyledTableCell align='left' width={200}>
                                    Cargo
                                </imports.StyledTableCell>

                                <imports.StyledTableCell align='left' width={200}>
                                    Secretaria
                                </imports.StyledTableCell>

                                <imports.StyledTableCell align='left' width={112}>
                                    Departamento
                                </imports.StyledTableCell>



                                <imports.StyledTableCell align='left' width={112}>
                                    Situação
                                </imports.StyledTableCell>
                                {
                                    isAuthenticated && (
                                        <imports.StyledTableCell align='left' width={30}>
                                            Editar
                                        </imports.StyledTableCell>
                                    )
                                }

                                {
                                    isAuthenticated && (
                                        <imports.StyledTableCell align='left' width={30}>
                                            Deletar
                                        </imports.StyledTableCell>
                                    )
                                }
                            </imports.StyledTableRow>
                        </imports.TableHead>

                        <imports.TableBody>
                            {searchText && dadosFiltrados && dadosFiltrados.length ? (
                                dadosFiltrados?.slice(pagesVisited, pagesVisited + projectsPerPage).map((number) => (
                                    <imports.StyledTableRow key={number?.id}>

                                        <imports.StyledTableCell align="left" >
                                            {number.numero}
                                        </imports.StyledTableCell>

                                        <imports.StyledTableCell align="left" >
                                            {number.nome}
                                        </imports.StyledTableCell>

                                        <imports.StyledTableCell align="left" >
                                            {number.cargo.nome}
                                        </imports.StyledTableCell>

                                        <imports.StyledTableCell align="left" >
                                            {number.departamento.secretaria.nome}
                                        </imports.StyledTableCell>

                                        <imports.StyledTableCell align="left" >
                                            {number.departamento.nome}
                                        </imports.StyledTableCell>


                                        <imports.StyledTableCell align="left" >
                                            {number.situacao}
                                        </imports.StyledTableCell>

                                        {
                                            isAuthenticated && (
                                                <imports.StyledTableCell align="left">
                                                    <imports.Tooltip title="Editar" arrow>
                                                        <imports.Button onClick={() => number?.id && handleEditOpen(number.id)}>
                                                            <imports.MdOutlineEdit size={18} color='#68739C' />
                                                        </imports.Button>
                                                    </imports.Tooltip>
                                                </imports.StyledTableCell>
                                            )
                                        }

                                        {
                                            isAuthenticated && (
                                                <imports.StyledTableCell align="left" >
                                                    <imports.Tooltip title='Deletar' arrow>
                                                        <imports.Button onClick={() => handleDeleteOpen(number?.id)}>
                                                            <imports.MdOutlineClose size={18} color='#68739C' />

                                                        </imports.Button>
                                                    </imports.Tooltip>
                                                </imports.StyledTableCell>
                                            )
                                        }

                                    </imports.StyledTableRow>
                                ))
                            ) : searchText && (!dadosFiltrados || dadosFiltrados.length === 0) ? (
                                <imports.StyledTableRow>
                                    <imports.StyledTableCell colSpan={8}>
                                        Nenhum resultado encontrado.
                                    </imports.StyledTableCell>
                                </imports.StyledTableRow>
                            ) :
                                <imports.StyledTableCell colSpan={8}>
                                    Pesquise a informação desejada.
                                </imports.StyledTableCell>}
                        </imports.TableBody>
                    </imports.Table>
                </imports.TableContainer>

                <ModalDeletarTelefone isOpen={modalDeleteOpen} onClose={handleDeleteClose} data={data} selectedDeleteId={selectedDeleteId} />
                <ModalEditarTelefone isOpen={modalEditOpen} onClose={handleEditClose} data={data} selectedItemId={selectedItemId} />

                {searchText && dadosFiltrados && dadosFiltrados.length > 6 && (
                    <imports.Box display="flex" justifyContent="end" mt={2} >
                        <imports.Pagination
                            color="primary"
                            count={totalPages}
                            page={pageNumber + 1}
                            onChange={(event, page) => {
                                changePage({ selected: page - 1 });
                            }}
                            variant="outlined"
                            shape="rounded"
                        />
                    </imports.Box>
                )}
            </imports.Box>
        </imports.React.Fragment>
    );
};



export default TableTelephones;
