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

const ModalCriarTelefone = ({ isOpen, onClose, data }) => {


    const requiredField = 'Campo obrigatorio';

    const schema = yup
        .object({
            numero: yup.string().required(),
            nome: yup.string().required(),
            situacao: yup.string().max(45, 'Máximo de 45 caracteres').required(requiredField),
            departamentoId: yup.number().required(requiredField),
            cargoId: yup.number().required(requiredField),
        })
        .required();

    const [loading, setLoading] = useState(false);


    const { register, handleSubmit, formState, control, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            numero: '',
            nome: '',
            situacao: 'ATIVADO',
            departamentoId: '',
            cargoId: ''
        },
    });
    const { errors } = formState;

    const handleCriarTelefone = (data) => {


        setLoading(true);
        axiosApi
            .post('/telefone/criar-telefone', data)
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
        console.log("Oq estou enviando", data)
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

    const { data: listarCargos, loading: loadingListarCargos } = useApiRequestGet('/cargo/listar-cargos');
    const { data: listarDptos, loading: loadingListarDptos } = useApiRequestGet('/departamento/listar-departamentos');
    console.log(listarDptos)

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box component='form' noValidate onSubmit={handleSubmit(handleCriarTelefone)}>
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
                      Criar telefone
                    </Typography>
                    
                    <DialogContent dividers sx={{ paddingTop: 1 }}>
                        <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    {...register('numero')}
                                    fullWidth
                                    required
                                    label='Número'
                                    type='text'
                                    error={!!errors.id}
                                    helperText={errors.id?.message}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    {...register('nome')}
                                    fullWidth
                                    required
                                    label='Nome'
                                    type='text'
                                    error={!!errors.nome}
                                    helperText={errors.nome?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Controller
                                    name='departamentoId'
                                    control={control}
                                    render={({ field }) => {
                                        const { onChange, name, onBlur, value, ref } = field;
                                        return (
                                            <TextField
                                                required
                                                ref={ref}
                                                select
                                                fullWidth
                                                key='secretaria'
                                                variant='outlined'
                                                onBlur={onBlur}
                                                name={name}
                                                label='Departamento'
                                                value={value}
                                                onChange={onChange}
                                                error={!!errors.departamentoId}
                                                helperText={errors.departamentoId?.message}
                                            >
                                                <MenuItem disabled value=''>
                                                    <em>Nenhuma</em>
                                                </MenuItem>
                                                {!loadingListarDptos &&
                                                    listarDptos &&
                                                    listarDptos.length &&
                                                    listarDptos.map((secretaria) => (
                                                        <MenuItem key={secretaria.id} value={secretaria.id}>
                                                       {secretaria.secretaria.sigla}  -   {secretaria.nome}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        );
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <Controller
                                    name='cargoId'
                                    control={control}
                                    render={({ field }) => {
                                        const { onChange, name, onBlur, value, ref } = field;
                                        return (
                                            <TextField
                                                required
                                                ref={ref}
                                                select
                                                fullWidth
                                                key='secretaria'
                                                variant='outlined'
                                                onBlur={onBlur}
                                                name={name}
                                                label='Cargo'
                                                value={value}
                                                onChange={onChange}
                                                error={!!errors.cargoId}
                                                helperText={errors.cargoId?.message}
                                            >
                                                <MenuItem disabled value=''>
                                                    <em>Nenhuma</em>
                                                </MenuItem>
                                                {!loadingListarCargos &&
                                                    listarCargos &&
                                                    listarCargos.length &&
                                                    listarCargos.map((secretaria) => (
                                                        <MenuItem key={secretaria.id} value={secretaria.id}>
                                                            {secretaria.nome}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        );
                                    }}
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

export default ModalCriarTelefone