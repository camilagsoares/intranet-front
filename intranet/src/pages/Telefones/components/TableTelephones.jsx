import { useApiRequestGet } from "../../../services/api"
import { TableRowsLoaderSkeleton, StyledTableCell, StyledTableRow } from "../utils"
import { ContainerInput, Container, SearchIcon } from "../../../styles/styles"
import ModalCriarTelefone from './ModalCriarTelefone/index';
import ModalDeletarTelefone from './ModalDeletarTelefone/index';
import ModalEditarTelefone from './ModalEditarTelefone/index';
import { useModal } from '../modalUtils';
import * as imports from "../utils";

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




    return (
        <imports.React.Fragment>
            <imports.Box marginY={1} paddingY={2}>


                <imports.Box sx={{ p: 1 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Container>
                        <SearchIcon />
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
                        </imports.TableHead>

                        <imports.TableBody>
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
                                                    <imports.Tooltip title="Editar" arrow>
                                                        <imports.Button  onClick={() => number?.id && handleEditOpen(number.id)}>
                                                            <imports.MdOutlineEdit size={18} color='#68739C' />
                                                        </imports.Button>
                                                    </imports.Tooltip>
                                                </StyledTableCell>
                                            )
                                        }

                                        {
                                            isAuthenticated && (
                                                <StyledTableCell align="left" >
                                                    <imports.Tooltip title='Deletar' arrow>
                                                        <imports.Button onClick={() => handleDeleteOpen(number?.id)}>
                                                            <imports.MdOutlineClose size={18} color='#68739C' />

                                                        </imports.Button>
                                                    </imports.Tooltip>
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
                        </imports.TableBody>
                    </imports.Table>
                </imports.TableContainer>

                <ModalDeletarTelefone isOpen={modalDeleteOpen} onClose={handleDeleteClose} data={data}  selectedDeleteId={selectedDeleteId}/>
                <ModalEditarTelefone isOpen={modalEditOpen} onClose={handleEditClose} data={data}  selectedItemId={selectedItemId}/>

                {dadosFiltrados && dadosFiltrados.length > 0 && (
                    <imports.Box display="flex" justifyContent="end" mt={2} >
                        <imports.Pagination
                            color="primary"
                            count={Math.ceil(dadosFiltrados?.length / projectsPerPage)}
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
