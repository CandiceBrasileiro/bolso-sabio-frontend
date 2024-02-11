import React, { useState, useContext, useEffect } from 'react'
import styles from './NovaSenha.module.css';
import {TextField, Box, Button} from '@mui/material';
import Mensagem from '../../components/Mensagem/Mensagem';
import { MSG_INICIAL } from '../../helpers/Constantes';
import { validarString } from '../../helpers/Utils';
import { alterarSenha } from '../../api/service';
import { UserContext } from '../../Contexts/UserContext';

const NovaSenha = () => {
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(MSG_INICIAL);
    const [erros, setErros] = useState([]);
    const { id } = useContext(UserContext);
    
    const inicialValue = () => {
      setPassword("");
      setConfirmPassword("");
    }

    const validation = (user) => {

        const message = [];

        if (!validarString(user.password)) {
            message.push("Campo E-mail deve ser preenchido");
        }
        if (user.password.length < 7) {
            message.push("A senha deve ter mais de 7 caracteres");
        }
        if(!validarString(confirmPassword)){
            message.push("Campo confirmar senha deve ser preenchido");
        }
        if(confirmPassword !== user.password){
            message.push("Senhas devem ser iguais");
        }
        return message;
    }

    useEffect(() => {
      inicialValue();
    }, []);

    const handleEditPassword = (e) => {

      e.preventDefault();
      
      const newPassword = {password, id };
      const msgs = validation(newPassword)
   
      if(msgs.length === 0) {
        alterarSenha(newPassword).then((data) => {
          if(data){
            setErrorMessage({
              message: `${Date.now()}. Senha alterada com sucesso`,
              type: 'sucess',
            })
          } else {
            setErrorMessage({
              message: `${Date.now()}.Error`,
              type: 'error'
            })
          }
        }).catch((err)=>console.log("MSG: ", err.message));
      } else {
        setErrorMessage(msgs)
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
        <h1>Redefinir Senha</h1>
        {erros && erros.map((item) => (
          <Mensagem msg={item} tipo={'error'} />
          ))}
          <Mensagem msg={errorMessage.message} tipo={errorMessage.type} />
        <div>
          <form className={styles.form} onSubmit={handleEditPassword} > 
            <TextField
            required
            id='outlined-required'
            label='Senha'
            type='password'
            name='password'
            onChange={(e)=>setPassword(e.target.value)}
            />
            <TextField 
            required
            id='outlined-required'
            label="Confirmar senha"
            type='password'
            name='confirmPassword'
            onChange={(e) => setConfirmPassword(e.target.value)}
            />          
            <Button variant="contained" type='submit'>Enviar</Button>
          </form>
          
          <Mensagem  />
          
          
        </div>
        </Box>
       
      </section>
    </>
  );
};

export default NovaSenha;
