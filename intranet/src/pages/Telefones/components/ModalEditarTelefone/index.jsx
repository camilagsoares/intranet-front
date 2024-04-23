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
import './style.css'

const ModalEditarTelefone = ({ isOpen, onClose, selectedItemId }) => {

    const [loading, setLoading] = useState(false);
    const [numero, setNumero] = useState('');
    const [cargoId, setCargoId] = useState('');
    const [nome, setNome] = useState('');
    // const [secretaria, setSecretaria] = useState('');
    const [departamentoId, setDepartamentoId] = useState('');
    const [situacao, setSituacao] = useState('');


    const { data, loading: loadingTelefones, refetchData } = useApiRequestGet(`/telefone/listar-telefone/${selectedItemId}`);

    const { data: dataDptos } = useApiRequestGet('/departamento/listar-departamentos') //id

    const { data: dataCargos } = useApiRequestGet('/cargo/listar-cargos') //id


    const handleChangeCargo = (event) => {
        setCargoId(event.target.value);
    };


    useEffect(() => {
        if (selectedItemId) {
            refetchData();
        }
    }, [selectedItemId]);




    useEffect(() => {
        if (!loadingTelefones && data) {
            setNumero(data?.numero || '');
            setNome(data?.nome || '');
            setCargoId(data?.cargoId || '');
            // setSecretaria(data?.departamento.secretaria.nome || '');
            setDepartamentoId(data?.departamentoId || '');
            setSituacao(data?.situacao || '');
        }
    }, [loadingTelefones, data]);


    const editaTelefone = (e) => {
        e.preventDefault();
        setLoading(true);

        const departamentoSelecionado = dataDptos.find(departamento => departamento.id === parseInt(departamentoId, 10));

        const cargoSelecionado = dataCargos.find(cargo => cargo.id === parseInt(cargoId, 10));


        // Verificar se o departamentoSelecionado é válido
        if (departamentoSelecionado) {
            const data = {
                numero: numero,
                nome: nome,
                cargoId: cargoSelecionado.id,
                departamentoId: departamentoSelecionado.id,
                situacao: situacao,
            };

            console.log('Dados enviados para o backend:', data);

            axiosApi
                .put(`/telefone/atualizar-telefone/${selectedItemId}`, data)
                .then(() => {
                    alert('Telefone atualizado com sucesso');
                    setTimeout(() => {
                        setLoading(false);
                        window.location.reload();
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            console.error('Departamento selecionado inválido');
            setLoading(false);
        }
        console.log('Dados enviados para o backend:', data);

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



    const handleChangeDepartamento = (event) => {
        setDepartamentoId(event.target.value);
    };

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
                                {/* <TextField
                                    value={cargoId}
                                    onChange={(e) => setCargoId(e.target.value)}
                                    fullWidth
                                    required
                                    label='Cargo'
                                    type='text'

                                /> */}
                                <label htmlFor="departamento-select">Selecione um cargo</label>
                                <select id="departamento-select" className="custom-select" value={cargoId} onChange={handleChangeCargo} fullWidth required>
                                    <option value="">Selecione um cargo</option>

                                    {Array.isArray(dataCargos) && dataCargos.map((cargo) => (
                                        <option key={cargo.id} value={cargo.id}>
                                            {cargo.nome}
                                        </option>
                                    ))}
                                </select>


                          
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* <TextField
                                    value={departamentoId}
                                    onChange={(e) => setDepartamentoId(e.target.value)}
                                    fullWidth
                                    required
                                    label='Departamento'
                                    type='text'

                                /> */}
                            <label htmlFor="departamento-select">Selecione um departamento</label>
                            <select id="departamento-select" className="custom-select" value={departamentoId} onChange={handleChangeDepartamento} required>
                                <option value="">Selecione um departamento</option>
                                {Array.isArray(dataDptos) && dataDptos.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nome}
                                    </option>
                                ))}
                            </select>
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
        </Modal >
    )
}

export default ModalEditarTelefone