import React, { useState, useContext } from 'react'
import styles from './RecuperarSenha.module.css';
import {TextField, Box, Button} from '@mui/material';
import { UserContext } from '../../Contexts/UserContext'
import { recuperarSenha } from '../../api/service'
import { Link, useNavigate } from 'react-router-dom';
import Mensagem from '../../components/Mensagem/Mensagem';
import { MSG_INICIAL } from '../../helpers/Constantes';

const RecuperarSenha = () => {

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(MSG_INICIAL);


  const navigate = useNavigate();

  const handleChangeEmail = (e)=>{
    setEmail(e.target.value);
  }

  const handleRecoverPassword = (e) =>{
    e.preventDefault();
    if(email){

      recuperarSenha(email).then((data)=>{

        if (data) {
          setErrorMessage({
            message: `${Date.now()}. Uma nova senha foi enviada para o e-mail cadastrado`,
            type: 'sucess', 
          });
          navigate('/login')
        } else {
          setAuth(false);
          setErrorMessage({
            message: `${Date.now()}. E-mail não encontrado`,
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
        <h1>Recuperar Senha</h1>
        <div >
          <form className={styles.form}  onSubmit={handleRecoverPassword}> 
          <TextField
            required
            id="outlined-required"
            label="E-mail"
            type='email'
            name='email'
            value={email}
            onChange={handleChangeEmail}
          />
          
            <Button variant="contained" type='submit'>Enviar</Button>
          
          </form>
          
          <Mensagem msg={errorMessage.message} tipo={errorMessage.type} />
          
          
        </div>
        </Box>
       
      </section>
    </>
  );
};

export default RecuperarSenha;
