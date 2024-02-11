import React, { useState, useContext } from 'react'
import styles from './Login.module.css';
import {TextField, Box, Button} from '@mui/material';
import { UserContext } from '../../Contexts/UserContext'
import { postLogin} from '../../api/service'
import { Link, useNavigate } from 'react-router-dom';
import Mensagem from '../../components/Mensagem/Mensagem';
import { MSG_INICIAL } from '../../helpers/Constantes';

const Login = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState(MSG_INICIAL);

  const navigate = useNavigate();

  const { setAuth, auth, name, setName, id, setId } = useContext(UserContext)

  const handleChangeEmail = (e)=>{
    setEmail(e.target.value);
  }

  const handleChangeSenha = (e)=>{
    setSenha(e.target.value);
  }

  const handleAutenticar = (e) =>{
    e.preventDefault();

    if(email  && senha){

      const user = {email, senha};

      postLogin(user).then((data)=>{

        const senhaTemporaria = data.ativo_senha_temporaria;
        
        if (data) {
          setAuth(true);
          setId(data.id);
          setName(data.nome);
          if(senhaTemporaria === 1) {
            navigate('/redefinir-senha')
          } else {
            navigate('/home')
          }
        } else {
          setAuth(false);
          setErrorMessage({
            message: `${Date.now()}. E-mail ou senha inválida`,
            type: 'error',
          });
        }
        
      }).catch((err)=>console.log("MSG: ", err.message));
    }
  }


  return (
    <>
      <section className={styles.homeContainer}>
        <Box 
        componen="form" 
        sx={{padding: '4rem', color:'#333'}}
        autoComplete="off"
        >
        <h1>Login</h1>
        <div >
          <form className={styles.form}  onSubmit={handleAutenticar}> 
          <TextField
            required
            id="outlined-required"
            label="E-mail"
            type='email'
            name='email'
            value={email}
            onChange={handleChangeEmail}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            name='senha'
            value={senha}
            onChange={handleChangeSenha}
          />
          
            <Button variant="contained" type='submit'>Entrar</Button>
          
          </form>
          
          <Mensagem msg={errorMessage.message} tipo={errorMessage.type} />
          
          <Link to={`/recuperar-senha`} className={styles.perdeu}>Perdeu a Senha?</Link>

          <div className={styles.cadastro}>
            <h2 className={styles.subtitle}> 
            Cadastre-se
            </h2>
            <p>Ainda não possui conta? Cadastre-se no site.</p>
            <Link to={`/cadastre-se`} >
            <Button variant="contained">Cadastro</Button>
            </Link>
          </div>
        </div>
        </Box>
       
      </section>
    </>
  );
};

export default Login;
