
import { ContainerInput, Container, SearchIcon } from "../../../styles/styles"
import ModalCriarDepartamento from './modalCriarDepartamento';
import ModalEditarDepartamento from './ModalEditarDepartamento';
import ModalDeletarDepartamento from './ModalDeletarDepartamento';
import { useModal } from '../components/modalUtils';
import * as imports from '../../../imports/utils';
import { StyledTableCell,StyledTableRow } from '../../../imports/utils';


const TableDepartamentos = (props) => {

    const [open, setOpen] = imports.useState(false);

    const [pageNumber, setPageNumber] = imports.useState(0);
    const [searchText, setSearchText] = imports.useState('');


    const { data, loading } = imports.useApiRequestGet('/departamento/listar-departamentos')
   

    const projectsPerPage = 6;
    const pagesVisited = pageNumber * projectsPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    imports.useEffect(() => {
        setPageNumber(0);
    }, [data]);


    const filteredData = data && data.filter((number) => {
        const searchableText = `${number?.nome} ${number?.id}`;
        return searchableText.trim().toLowerCase().includes(searchText.trim().toLowerCase());
    });



    const { modalOpen,
        handleOpen,
        handleClose,
        modalDeleteOpen,
        handleDeleteOpen,
        handleDeleteClose,
        modalEditOpen,
        handleEditOpen,
        handleEditClose,
        selectedItemId,
        selectedDeleteId
    } = useModal();



    return (
        <imports.React.Fragment>
            <imports.Box marginY={1} paddingY={2}>
                <imports.Box sx={{ p: 1 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <imports.Container>
                        <SearchIcon />
                        <ContainerInput
                            type="text"
                            placeholder="Digite para filtrar..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </imports.Container>

                    <imports.Grid container justifyContent="flex-end">
                        <imports.Button onClick={handleOpen} variant='outlined' startIcon={<imports.AddIcon />}>Criar departamento</imports.Button>
                        <ModalCriarDepartamento isOpen={modalOpen} onClose={handleClose} />
                    </imports.Grid>
                </imports.Box>

                <imports.TableContainer component={imports.Paper}>
                    <imports.Table sx={{ minWidth: 700 }} aria-label='customized table' >
                        <imports.TableHead className='borda-azul'>
                            <imports.StyledTableRow>
                                <imports.StyledTableCell align='left' width={112}>
                                    Id
                                </imports.StyledTableCell>

                                <imports.StyledTableCell width={300}>Departamento</imports.StyledTableCell>

                                <imports.StyledTableCell width={300}>Secretaria</imports.StyledTableCell>

                                <imports.StyledTableCell align='left' width={20}>
                                    Editar
                                </imports.StyledTableCell>
                                <imports.StyledTableCell align='left' width={20}>
                                    Deletar
                                </imports.StyledTableCell>

                            </imports.StyledTableRow>
                        </imports.TableHead>

                        <imports.TableBody>
                            {filteredData && filteredData.length ? (
                                filteredData?.slice(pagesVisited, pagesVisited + projectsPerPage).map((number) => (
                                    <imports.StyledTableRow key={number?.id}>
                                        <imports.StyledTableCell align="left" >
                                            {number?.id}
                                        </imports.StyledTableCell>

                                        <imports.StyledTableCell align="left" >
                                            {number?.nome}
                                        </imports.StyledTableCell>

                                        <imports.StyledTableCell align="left" >
                                            {number?.secretaria.nome}
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
                                                <imports.Button 
                                                 onClick={() => handleDeleteOpen(number?.id)}
                                             >
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

                <ModalDeletarDepartamento isOpen={modalDeleteOpen} onClose={handleDeleteClose} selectedDeleteId={selectedDeleteId} />
                <ModalEditarDepartamento isOpen={modalEditOpen} onClose={handleEditClose} selectedItemId={selectedItemId}/>

                {filteredData && filteredData.length > 0 && (
                    <imports.Box display="flex" justifyContent="end" mt={2} >
                        <imports.Pagination
                            color="primary"
                            count={Math.ceil(filteredData?.length / projectsPerPage)}
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



export default TableDepartamentos;
