import { ContainerInput, Container, SearchIcon } from "../../../styles/styles"
import { TableRowsLoaderSkeleton, StyledTableCell, StyledTableRow } from "../utils"
import ModalCriarSecretaria  from './modalCriarSecretaria/index';
import ModalEditarSecretaria from './modalEditarSecretaria/index'
import ModalDeletarSecretaria from './ModalDeletarSecretaria/index';
import { useModal } from '../components/modalUtils';
import * as imports from "../../../imports/utils";

const TableSecretary = (props) => {

    const { data, loading } = imports.useApiRequestGet('/secretaria/listar-secretarias')

    const [searchText, setSearchText] = imports.useState('')

    const dadosFiltrados = data && data.filter((number) => {
        const textoFiltrado = `${number.id} ${number.nome} ${number.sigla}`

        return textoFiltrado.trim().toLowerCase().includes(searchText.trim().toLowerCase())
    })


    const [pageNumber, setPageNumber] = imports.useState(0);
    const projectsPerPage = 6;
    const pagesVisited = pageNumber * projectsPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    imports.useEffect(() => {
        setPageNumber(0);
    }, [data]);



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
        selectedItemId
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
                    <imports.Button onClick={handleOpen} variant='outlined' startIcon={<imports.AddIcon />}>Criar secretaria</imports.Button>

                        <ModalCriarSecretaria isOpen={modalOpen} onClose={handleClose} data={data} />

                    </imports.Grid>
                </imports.Box>


                <imports.TableContainer component={imports.Paper}>
                    <imports.Table sx={{ minWidth: 700 }} aria-label='customized table' >
                        <imports.TableHead className='borda-azul'>
                            <imports.StyledTableRow>

                                <imports.StyledTableCell width={192}>Id</imports.StyledTableCell>

                                <imports.StyledTableCell align='left' width={180}>
                                    Nome
                                </imports.StyledTableCell>

                                <imports.StyledTableCell align='left' width={112}>
                                    Secretaria
                                </imports.StyledTableCell>

                                <imports.StyledTableCell align='left' width={20}>
                                    Editar
                                </imports.StyledTableCell>
                                <imports.StyledTableCell align='left' width={20}>
                                    Deletar
                                </imports.StyledTableCell>
                            </imports.StyledTableRow>
                        </imports.TableHead>


                        <imports.TableBody>
                            {dadosFiltrados && dadosFiltrados.length ? (
                                dadosFiltrados?.slice(pagesVisited, pagesVisited + projectsPerPage).map((number) => (
                                    <imports.StyledTableRow key={number?.id}>


                                        <imports.StyledTableCell align="left" >
                                            {number.id}
                                        </imports.StyledTableCell>


                                        <imports.StyledTableCell align="left" >
                                            {number.sigla}
                                        </imports.StyledTableCell>

                                        <imports.StyledTableCell align="left" >
                                            {number.nome}
                                        </imports.StyledTableCell>
                                        <imports.StyledTableCell align="left" >
                                                <imports.Tooltip title="Editar" arrow>
                                                    <imports.Button onClick={() => handleEditOpen(number?.id)}>
                                                        <imports.MdOutlineModeEditOutline size={18} color='#68739C' />
                                                    </imports.Button>
                                                </imports.Tooltip>
                                        </imports.StyledTableCell>

                                        <imports.StyledTableCell align="left" >
                                            <imports.Tooltip title='Deletar' arrow>
                                                <imports.Button onClick={() => handleDeleteOpen(number?.id)}>
                                                    <imports.MdOutlineClose size={18} color='#68739C' />

                                                </imports.Button>
                                            </imports.Tooltip>
                                        </imports.StyledTableCell>
                                    </imports.StyledTableRow>
                                ))
                            ) : (
                                <imports.StyledTableRow >
                                    <imports.StyledTableCell colSpan={7}>

                                        Nenhum resultado encontrado.

                                    </imports.StyledTableCell>


                                </imports.StyledTableRow>

                            )}
                        </imports.TableBody>
                    </imports.Table>
                </imports.TableContainer>

                <ModalDeletarSecretaria isOpen={modalDeleteOpen} onClose={handleDeleteClose} selectedDeleteId={selectedDeleteId} />

                <ModalEditarSecretaria 
                isOpen={modalEditOpen} onClose={handleEditClose} selectedItemId={selectedItemId} />

                {data && data.length > 0 && (
                    <imports.Box display="flex" justifyContent="end" mt={2}>
                        <imports.Pagination
                            color="primary"
                            count={Math.ceil(data?.length / projectsPerPage)}
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



export default TableSecretary;
