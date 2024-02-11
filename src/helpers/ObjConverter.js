import { NM_RENDA_FIXA, NM_RENDA_VARIAVEL } from "./Constantes";
import { formatAsDate, moedaBr, toTitleCaseName, calendario } from "./Utils";
import { SEGMENTOS } from "./Constantes";
import { object } from "yup";

export const tiposInvestimentosConverter = (tipos) => {
  const tiposMapeados = tipos?.map((tipo) => {
    return tipoInvestimentoConverter(tipo);
  });
  return tiposMapeados;
};

export const tipoInvestimentoConverter = (tipo) => {
  return {
    id: tipo.id,
    nome: tipo.nome.toUpperCase(),
    tipo_renda: tipo.tipo_renda === 1 ? NM_RENDA_FIXA : NM_RENDA_VARIAVEL,
    create_at: formatAsDate(tipo.create_at),
  };
};

export const investimentosConverter = (investimentos, listaTipos) => {
  const investimentosMapeados = investimentos?.map((investimento) => {
    console.log(investimentos, listaTipos)
    return investimentoConverter(investimento, listaTipos);
  });
  return investimentosMapeados;
};

const getKeyByValue = (object, ident) =>{
  for (const [key, value] of Object.entries(object)) {

    if(key === ident){
      return value;
    }
  }
}

export const investimentoConverter = (investimento, listaTipos) => {

 return {
    id: investimento.id,
    id_tipo_investimento: mapearTipoInvestimento(
      investimento.id_tipo_investimento,
      listaTipos
    ).toUpperCase(),
    ativo: investimento.ativo.toUpperCase(),
    valor_uni_ativo: moedaBr(investimento.valor_uni_ativo),
    segmento: getKeyByValue(SEGMENTOS, investimento.segmento) ?? " - ",
    quantidade: investimento.quantidade,
    valor_investido: moedaBr(investimento.valor_investido),
    create_at: formatAsDate(investimento.create_at),
    update_at: formatAsDate(investimento.update_at),
  };
};

const mapearTipoInvestimento = (tipo, listaTipos) => {
  const tpInvestimento = parseInt(tipo);

  const found = listaTipos.find((element) => element.id === tpInvestimento);

  if (found) {
    return found.nome;
  }
  return "-";
};

// Transforma um array de objetos em um objeto com chaves para usar no Select
export const mapearTipoInvestimentoParaSelect = (tiposInvestimentos) => {

  const object = tiposInvestimentos.reduce(
    (obj, item) => 
      
      Object.assign(obj, { [item.id]: toTitleCaseName(item.nome) }),
    {}
    );

  return object;
};

export const aportesConverter = (aportes) => {
  const aportesMapeados = aportes?.map((aporte) => {
    return aporteConverter(aporte);
  });
  return aportesMapeados;
};

export const aporteConverter = (aporte) => {
  return {
    id: aporte.id,
    id_investimento: aporte.id_investimento,
    valor_aportado: moedaBr(aporte.valor_aportado),
    valor_ativo: moedaBr(aporte.valor_ativo),
    quantidade: aporte.quantidade,
    mes: calendario(aporte.mes),
    ano: aporte.ano,
    create_at: formatAsDate(aporte.create_at),
    update_at: formatAsDate(aporte.update_at),
  };
};

export const proventosConverter = (proventos) => {
  const proventosMapeados = proventos?.map((provento) => {
    return proventoConverter(provento);
  });
  return proventosMapeados;
};

export const proventoConverter = (provento) => {
  return {
    id: provento.id,
    id_investimento: provento.id_investimento,
    provento: moedaBr(provento.provento),
    mes: calendario(provento.mes),
    ano: provento.ano,
    create_at: formatAsDate(provento.create_at),
    update_at: formatAsDate(provento.update_at),
  };
};

export const validCurrency = new RegExp("^(?!0.00)d{1,3}(,d{3})*(.dd)?$");

