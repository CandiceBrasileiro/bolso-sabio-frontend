import React, {useEffect, useState} from 'react';
import styles from './Cadastro.module.css';
import {Box} from '@mui/material/';
import { TextField, Button } from '@mui/material';
import { MSG_INICIAL } from '../../helpers/Constantes';
import { postUser } from '../../api/service';
import {validarCPF, validateEmail} from '../../validators/ComunsValidator';
import { validarString } from '../../helpers/Utils';
import Mensagem from '../../components/Mensagem/Mensagem';

const Cadastro = () => {

  const [nmUsuario, setNmUsuario] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState(MSG_INICIAL);
  const [erros, setErros] = useState([]);
  
  const limpaFormulario = () => {
    setNmUsuario("");
    setCPF("");
    setEmail("");
    setSenha("");
    setConfirmaSenha("");
  }

  const validar = (user) => {

    const message = [];

      if (!validarString(user.nmUsuario) ) {
        message.push("Campo de nome do usuário deve ser preenchido");
      } 
      if (user.nmUsuario.length > 50) {
        message.push("O nome do usuário deve até 50 caracteres");
      }
      if (!validarString(user.cpf)) {
        message.push("Campo CPF deve ser preenchido");
      }
      if (!validarCPF(user.cpf)) {
        message.push("CPF inválido");
      }
      if (!validarString(user.email)) {
        message.push("Campo E-mail deve ser preenchido");
      }
      if (!validateEmail(user.email)) {
        message.push("E-mail inválido");
      }
      if (!validarString(user.senha)) {
        message.push("Campo senha deve ser preenchido");
      }
      if (user.senha.length < 7) {
        message.push("A senha deve ter mais de 7 caracteres");
      }
      if(!validarString(confirmaSenha)){
        message.push("Campo confirmar senha deve ser preenchido");
      }
      if(confirmaSenha !== user.senha){
        message.push("Senhas devem ser iguais");
      }
  
      return message;
  }

  useEffect(() => {
    limpaFormulario();
  }, []);

  const handleCadastrar = (e) => {

    e.preventDefault();

    const newUser = {nmUsuario, cpf, email, senha};
    
    const msgs = validar(newUser);

    if(msgs.length === 0) {
      postUser(newUser).then((data) => {

        if (data) {
          setErrorMessage({
            message: `${Date.now()}. Registro cadastrado com sucesso.`,
            type: 'sucess',
          });

        } else {
          setErrorMessage({
            message: `${Date.now()}. Informações inválidas`,
            type: 'error'
          })
        }
      }).catch((err)=>console.log("MSG: ", err.message));
    } else {
      setErros(msgs)
    }
    
  }

  return (
    <>
        <section className={styles.homeContainer}>
          <Box
          componen="form" 
          sx={{padding: '4rem', color:'#333'}}
          noValidate
          autoComplete="off"          
          >
          <h1>Cadastre-se</h1>
          {erros && erros.map((item) => (
          <Mensagem msg={item} tipo={'error'} />
          ))}
          <Mensagem msg={errorMessage.message} tipo={errorMessage.type} />
          <div>
            <form className={styles.form} onSubmit={handleCadastrar} > 
            <TextField
              required
              id="outlined-required"
              label="Usuário"
              type='text'
              name='nm_usuario'       
              onChange={(e)=>setNmUsuario(e.target.value)}                
            />
            <TextField
              required
              id="outlined-required"
              label="CPF"
              type='text'
              name='cpf'
              onChange={(e)=>setCPF(e.target.value)}              
            />
            <TextField
              required
              id="outlined-required"
              label="E-mail"
              type='email'
              name='email'            
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Senha"
              type="password"
              autoComplete="current-password"
              name='senha'  
              onChange={(e) => setSenha(e.target.value)}          
            />

            <TextField
              required
              id="outlined-password-input"
              label="Confirmar senha"
              type="password"
              autoComplete="current-password"
              name='confirmaSenha'  
              onChange={(e) => setConfirmaSenha(e.target.value)}          
            />
            {/* Fazer condicional para cadastro true seguir rota pra login */}
               <Button variant="contained" type='submit'>Cadastrar</Button>
             </form>   
          </div>
          </Box>       
        </section>
      </>
    );
};

export default Cadastro;
