import React from "react";
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


const ModalEditarTelefone = ({ isOpen, onClose }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
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
            contentLabel="Exemplo Modal"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box component='form' noValidate>


                    <Typography
                        sx={{
                            fontSize: {
                                lg: 20,
                                md: 20,
                                sm: 15,
                                xs: 10
                            }
                        }}
                    >
                        Editar telefone
                    </Typography>

                    <DialogContent dividers sx={{ paddingTop: 1 }}>
                        <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label='Número'
                                    type='text'

                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label='Nome'
                                    type='text'

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label='Cargo'
                                    type='text'

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label='Secretaria'
                                    type='text'

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label='Departamento'
                                    type='text'

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
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