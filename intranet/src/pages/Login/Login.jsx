import { ContainerLogin, AlignContainerCenter } from "../../styles/styles"
import { useApiLogin } from '../../services/api';
import * as imports from "../../imports/utils"
import { AuthContext } from '../../contexts/auth.context';
import * as yup from 'yup';


const defaultTheme = imports.createTheme();

export default function Login() {

  const [open, setOpen] = imports.useState(true);


  const schema = yup
    .object({
      nome: yup.string().required('Campo obrigatorio'),
      senha: yup.string().min(4, 'Mínimo 4 caracteres').required('Campo obrigatorio'),
    })
    .required();

  const navigate = imports.useNavigate();

  const { token, criarSessao } = imports.useContext(AuthContext);


  const { register, handleSubmit, formState, reset } = imports.useForm({
    resolver: imports.yupResolver(schema),
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

  imports.useEffect(() => {
    if (token) {
      navigate('/');
    };


  }, []);

  imports.useEffect(() => {
    if (loginData) {
      criarSessao(loginData);
      reset();

    }
  }, [loginData]);

  imports.useEffect(() => { });

  return (
  
      <div className="h-screen flex-1">
        <h1 className="text-2xl font-semibold ">
          <AlignContainerCenter>
              <ContainerLogin>
                <imports.Box
                  sx={{
                    // marginTop: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <imports.Avatar sx={{ m: 1, bgcolor: '#367EEB' }}>
                    <imports.LockOutlinedIcon />
                  </imports.Avatar>
                  <imports.Typography component="h1" variant="h5">
                    Acesso Administrador
                  </imports.Typography>
                  <imports.Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handleEfetuarLogin)}>
                    <imports.TextField
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
                    <imports.TextField
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
                    <imports.Button
                      disabled={loading}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {!loading ? 'Entrar' : <CircularProgress color='success' size={26} />}

                    </imports.Button>

                  </imports.Box>
                </imports.Box>
              </ContainerLogin>
          </AlignContainerCenter>
        </h1>
    </div>
   
  );
}