import React, { useState } from "react";
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
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosApi, useApiRequestGet } from "../../../../services/api";
import { toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useModal } from '../modalUtils';

const ModalDeletarCargo = ({ isOpen, onClose, selectedDeleteId }) => {

    const schema = yup
        .object({
            situacao: yup.string(),
        })
        .required();

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState, control, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            situacao: 'ATIVADO',
        },
    });
    const { errors } = formState;


    const handleDeletarDpto = (data) => {
        data.situacao = 'DESATIVADO';

        setLoading(true);
        axiosApi
            .patch(`/cargo/deletar-cargo/${selectedDeleteId}`, data)
            .then(() => {
                toast('Telefone criado com sucesso', {
                    type: 'success',
                });

                reset();
                window.location.reload();
            })
            .catch((error) => {
                toast(error.message, {
                    type: 'error',
                });
            })
            .finally(() => {
                setLoading(false);
            });
     
    };


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
                <Box component='form' noValidate onSubmit={handleSubmit(handleDeletarDpto)}>

                    <DialogContent dividers sx={{ paddingTop: 1 }}>
                        <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5} padding={2}>

                            Deseja deletar esse cargo?


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

                            Deletar
                            {/* {!loading ? 'Deletar' : <CircularProgress color='success' size={23} />} */}
                        </Button>

                    </DialogActions>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalDeletarCargo