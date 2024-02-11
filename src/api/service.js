import axios from 'axios';
import {
  investimentosConverter,
  tiposInvestimentosConverter,
  aportesConverter,
  proventosConverter,
} from '../../src/helpers/ObjConverter';

export const postTipoInvestimento = async (nmTipo, tpRenda) => {
  const obj = { nome: nmTipo, tipo_renda: tpRenda };
  const resultado = await axios.post(
    'http://localhost:8080/tipoInvestimento',
    obj,
  );
  return resultado.data;
};

export const getOneTipoInvestimento = async (id) => {
  const url = `http://localhost:8080/tipoInvestimento/${id};`;
  const resultado = await axios.get(url);
  
  return resultado.data;
};

export const getAllTiposInvestimentos = async () => {
  const resultado = await axios.get('http://localhost:8080/tiposInvestimentos');

  const conversao = tiposInvestimentosConverter(resultado.data);

  return conversao;
};

export const putTipoInvestimento = async (id, tipo) => {
  let url = `http://localhost:8080/tipoInvestimento/${id}`;
  const resultado = await axios.put(url, tipo);
  return resultado.data;
};

export const deleteTipoInvestimento = async (id) => {
  let url = `http://localhost:8080/tipoInvestimento/${id}`;
  const resultado = await axios.delete(url);
  return resultado.data;
};

export const getAllInvestimentos = async () => {
  let url = 'http://localhost:8080/investimentos';
  const resultado = await axios.get(url);

  const tipos = await getAllTiposInvestimentos();

  return investimentosConverter(resultado.data, tipos);
};
//todo passar o id como parametro e a chamada do delete esta errada
export const deleteInvestimento = async (id) => {
  let url = `http://localhost:8080/investimento/${id}`;
  const resultado = await axios.delete(url);
  return resultado.data;
};

export const postInvestimento = async (investiment) => {
  let url = 'http://localhost:8080/investimento';
  const resultado = await axios.post(url, investiment);
  return resultado.data;
};

export const putInvestimento = async (id, investiment) => {
  let url = `http://localhost:8080/investimento/${id}`;
  const resultado = await axios.put(url, investiment);
  return resultado.data;
};

export const getOneInvestimento = async (id) => {
  let url = `http://localhost:8080/investimento/${id}`;
  const resultado = await axios.get(url);

  return resultado.data;
};

export const getAportesByInvestimentos = async (id_investimento) => {
  let url = `http://localhost:8080/aportes/${id_investimento}`;
  const resultado = await axios.get(url);
  return aportesConverter(resultado.data);
};

export const deleteAporte = async (id) => {
  let url = `http://localhost:8080/aporte/${id}`;
  const resultado = await axios.delete(url);
  return resultado.data;
};

export const postAporte = async (aporte) => {
  let url = `http://localhost:8080/aporte/`;
  const resultado = await axios.post(url, aporte);
  return resultado.data;
};

export const putAporte = async (id, aporte) => {
  let url = `http://localhost:8080/aporte/${id}`;
  const resultado = await axios.put(url, aporte);
  return resultado.data;
};

export const getOneAporte = async (id) => {
  let url = `http://localhost:8080/aporte/${id}`;
  const resultado = await axios.get(url);
  return resultado.data;
};

export const getProventosByInvestimentos = async (id_investimento) => {
  let url = `http://localhost:8080/proventos/${id_investimento}`;
  const resultado = await axios.get(url);
  return proventosConverter(resultado.data);
};

export const getPeriodoProvento = async () => {
  let url = `http://localhost:8080/proventosData/`;
  const resultado = await axios.get(url);
  return resultado.data;
};

export const getProventoByInvet = async (id_investimento) => {
  let url = `http://localhost:8080/proventos/${id_investimento}`;
  const resultado = await axios.get(url);
  return resultado.data;
};

export const deleteProvento = async (id) => {
  let url = `http://localhost:8080/provento/${id}`;
  const resultado = await axios.delete(url);
  return resultado.data;
};

export const postProvento = async (provento) => {
  let url = `http://localhost:8080/provento/`;
  const resultado = await axios.post(url, provento);
  return resultado.data;
};

export const getOneProvento = async (id) => {
  let url = `http://localhost:8080/provento/${id}`;
  const resultado = await axios.get(url);
  return resultado.data;
};

export const putProvento = async (id, provento) => {
  let url = `http://localhost:8080/provento/${id}`;
  const resultado = await axios.put(url, provento);
  return resultado.data;
};

export const getAllAportes = async () => {
  let url = `http://localhost:8080/aportes`;
  const resultado = await axios.get(url);
  return aportesConverter(resultado.data);
};

export const getAllProventos = async () => {
  let url = `http://localhost:8080/proventos/`;
  const resultado = await axios.get(url);
  return resultado.data;
};

export const postLogin = async (user) => {
  let url = `http://localhost:8080/autenticar/`;
  const resultado = await axios.post(url, user);
  return resultado.data;
}

export const getUser = async(token) => {
  let url = `http://localhost:8080/user`;

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  const resultado = await axios.get(url, config);
  return resultado.data;
}

export const checkToken = async(token) => {
  let url = `http://localhost:8080/user/validate`;

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  const resultado = await axios.get(url, config);
  return resultado.data;
}

export const postUser = async(user) => {
  console.log('user', user)
  const newUser = {
    nm_usuario: user.nmUsuario,
    cpf: user.cpf,
    email: user.email,
    senha: user.senha
  }
  let url = `http://localhost:8080/user/`;
  const resultado = await axios.post(url, newUser);
 
  return resultado.data;
}

export const putUser = async({id_usuario}) => {
  let url = `http://localhost:8080/user/${id_usuario}`;
  const resultado = await axios.put(url);
  return resultado.data;
}

export const deleteUser = async({id_usuario}) => {
  let url = `http://localhost:8080/user/delete/${id_usuario}`;
  const resultado = await axios.put(url);
  return resultado.data;
}

export const getOneUser = async({id_usuario}) => {
  let url = `http://localhost:8080/user/${id_usuario}`;
  const resultado = await axios.get(url);
  return resultado.data;
}

export const alterarSenha = async(dado) => {

  let url = `http://localhost:8080/user/changepassword/${dado.id}`;
  const resultado = await axios.put(url, dado);

  return resultado.data;
}

export const getInvestimentosByIdUsuario = async (id_usuario) => {
 
  let url = `http://localhost:8080/investimento_user/${id_usuario}`
  const resultado = await axios.get(url);

  const tipos = await getAllTiposInvestimentos();

  return investimentosConverter(resultado.data, tipos);
};

export const recuperarSenha = async (email) => {
  let url = `http://localhost:8080/recuperarsenha`;
  const resultado = await axios.post(url, {email});
  return resultado.data;
}
