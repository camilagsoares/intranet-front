import React, { useEffect, useState } from "react";
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
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { axiosApi, useApiRequestGet } from "../../../../services/api";


const ModalEditarTelefone = ({ isOpen, onClose, selectedItemId }) => {

    const [loading, setLoading] = useState(false);
    const [numero, setNumero] = useState('');
    const [cargo, setCargo] = useState('');
    const [nome, setNome] = useState('');
    const [secretaria, setSecretaria] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [situacao, setSituacao] = useState('');


    const { data: dataTelefone, loading: loadingTelefones } = useApiRequestGet(`/telefone/listar-telefone/${selectedItemId}`);

    // const { data, loading: loadingTelefones } = useApiRequestGet(`/telefone/listar-telefones/${selectedItemId}`);
    // const { data: dataTelefone, loading: loadingTelefones } = useApiRequestGet(
    //     selectedItemId ? `/telefone/listar-telefone/${selectedItemId}` : null
    //   );
      


    // console.log(dataTelefone)
    // console.log(selectedItemId)



    // useEffect(() => {
    //     if (!loadingTelefones && dataTelefone) {
    //         setNumero(dataTelefone.numero);
    //         setNome(dataTelefone.nome);
    //         setCargo(dataTelefone.cargo.nome)
    //         setSecretaria(dataTelefone.secretaria);
    //         setDepartamento(dataTelefone.departamento.nome);
    //         setSituacao(dataTelefone.situacao);
    //     }
    // }, [loadingTelefones, dataTelefone]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     const data = {
    //         numero: numero,
    //         nome: nome,
    //         cargo: cargo,
    //         secretaria: secretaria,
    //         observacao: observacao,
    //         departamento: departamento,
    //         situacao: situacao,
    //     };

    //     axiosApi
    //         .put(`/telefone/atualizar-telefone/${selectedItemId}`, data)
    //         .then(() => {
    //             toast('Telefone atualizado com sucesso', {
    //                 type: 'success',
    //                 autoClose: 3000,
    //             });

    //             setTimeout(() => {
    //                 setLoading(false);
    //                 window.location.reload();
    //             }, 3000);
    //         })
    //         .catch((error) => {
    //             toast(error.message, {
    //                 type: 'error',
    //             });
    //             setLoading(false);
    //         });

    // };



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24
    };


    /*
{
    "id": 1,
    "nome": "Administração",
    "criadoEm": "2024-01-05T12:29:59.500Z",
    "atualizadoEm": "2024-01-05T12:29:59.500Z",
    "situacao": "ATIVADO",
    "secretariaId": 6
} */


    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box component='form' noValidate>


                <Typography
                        sx={{
                            fontSize: {
                                lg: 18,
                                md: 20,
                                sm: 15,
                                xs: 10
                            },
                            padding: 2,
                            marginLeft: 1,
                            color: "#27272F"
                        }}
                    >
                        Editar telefone
                    </Typography>
                    <DialogContent dividers sx={{ paddingTop: 1 }}>
                        <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                    fullWidth
                                    required
                                    label='Número'
                                    type='text'

                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    fullWidth
                                    required
                                    label='Nome'
                                    type='text'

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    value={cargo}
                                    onChange={(e) => setCargo(e.target.value)}
                                    fullWidth
                                    required
                                    label='Cargo'
                                    type='text'

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    value={secretaria}
                                    onChange={(e) => setSecretaria(e.target.value)}
                                    fullWidth
                                    required
                                    label='Secretaria'
                                    type='text'

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    value={departamento}
                                    onChange={(e) => setDepartamento(e.target.value)}
                                    fullWidth
                                    required
                                    label='Departamento'
                                    type='text'

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    value={situacao}
                                    onChange={(e) => setSituacao(e.target.value)}
                                    fullWidth
                                    required
                                    label='Situação'
                                    type='text'

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
                            onClick={onClose}
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
                            Editar
                            {/* {!loading ? 'Adicionar' : <CircularProgress color='success' size={23} />} */}
                        </Button>
                        {/* <button onClick={onClose}>Fechar Modal</button> */}

                    </DialogActions>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalEditarTelefone