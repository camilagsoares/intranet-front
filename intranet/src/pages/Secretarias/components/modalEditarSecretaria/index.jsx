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
import { toast } from 'react-toastify';


const ModalEditarSecretaria = ({ isOpen, onClose, selectedItemId }) => {

    const { data, loadingSecretaria, refetchData } = useApiRequestGet(`/secretaria/listar-secretaria/${selectedItemId}`)


    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [sigla, setSigla] = useState('');


    // console.log(selectedItemId)


    useEffect(() => {
        if (selectedItemId) {
            refetchData();
        }
    }, [selectedItemId]);

   



      useEffect(() => {
        if (!loadingSecretaria && data) {

            setNome(data?.nome || '');
            setSigla(data?.sigla || '');

        }
    }, [loadingSecretaria, data]);


    const editaTelefone = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {

            nome: nome,
            sigla: sigla,

        };

        axiosApi
            .put(`/secretaria/atualizar-secretaria/${selectedItemId}`, data)
            .then(() => {
                toast('Secretaria atualizado com sucesso', {
                    type: 'success',
                    autoClose: 3000,
                });
                window.location.reload();
                setTimeout(() => {
                    setLoading(false);
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                toast(error.message, {
                    type: 'error',
                });
                setLoading(false);
            })
      

    };



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,

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
                <Box component='form' noValidate onSubmit={editaTelefone}>
                    <Typography
                        sx={{
                            fontSize: {
                                lg: 18,
                                md: 20,
                                sm: 15,
                                xs: 10
                            },
                            padding: 2,
                            color: "#27272F"
                        }}
                    >
                        Editar secretaria
                    </Typography>


                    <DialogContent dividers sx={{ paddingTop: 1 }}>
                        <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
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
                                    value={sigla}
                                    onChange={(e) => setSigla(e.target.value)}
                                    fullWidth
                                    required
                                    label='Sigla'
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
                            Salvar
                            {/* {!loading ? 'Adicionar' : <CircularProgress color='success' size={23} />} */}
                        </Button>
                        {/* <button onClick={onClose}>Fechar Modal</button> */}

                    </DialogActions>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalEditarSecretaria