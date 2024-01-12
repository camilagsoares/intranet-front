import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { ContainerLogin, AlignContainerCenter } from "../../styles/styles"
import { useApiLogin } from '../../services/api';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";

const defaultTheme = createTheme();

export default function Login() {

  const [open, setOpen] = useState(true);


  const schema = yup
    .object({
      nome: yup.string(),
      senha: yup.string(),
    })
    .required();

  const navigate = useNavigate();

  const { token, criarSessao }  = useContext(AuthContext);


  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      senha: '',
    },
  });

  const { errors } = formState;


  const { handlerSubmitLogin, loginData, loading } = useApiLogin('/auth/login');
 
  const handleEfetuarLogin = (data) => {
    handlerSubmitLogin(data);
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    };

    return () => {
      reset();  
    };
  }, []);

  useEffect(() => {
    if (loginData) {
      criarSessao(loginData);
    }
  }, [loginData]);

  useEffect(() => { });

  return (
    <div className="flex">

    <div className="h-screen flex-1">
      <h1 className="text-2xl font-semibold ">
      <AlignContainerCenter>
      <Container component="main" maxWidth="xs">
        <ContainerLogin>
          <Box
            sx={{
              // marginTop: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#367EEB' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Acesso Administrador
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handleEfetuarLogin)}>
              <TextField
                {...register('nome')}
                disabled={loading}
                required
                fullWidth
                autoFocus
                id='nome'
                label='Nome'
                margin='normal'
                type='text'
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
              <TextField
                {...register('senha')}
                disabled={loading}
                fullWidth
                required
                id='password'
                label='Senha'
                margin='normal'
                type='password'
                error={!!errors.senha}
                helperText={errors.senha?.message}
              />
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {!loading ? 'Entrar' : <CircularProgress color='success' size={26} />}

              </Button>
           
            </Box>
          </Box>
        </ContainerLogin>
      </Container>
    </AlignContainerCenter>
      </h1>
    </div>
  </div>
    
  );
}