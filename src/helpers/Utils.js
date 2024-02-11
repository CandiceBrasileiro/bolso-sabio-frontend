import dayjs from 'dayjs';

export const formatAsDate = (date, placeholder = '') => {
  const value = dayjs(date ?? '');
  if (!value.isValid()) {
    return placeholder;
  }
  return value.format('DD/MM/YYYY');
};

export const moedaBr = (dado) => {
  let converter = dado.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  return converter;
};

export const desMoedaBr = (dado) => {
  if (!dado) {
    return 0;
  }
  let valor = String(dado)
    .replaceAll('.', '')
    .replaceAll('R$', '')
    .replaceAll(',', '.');

  return valor;
};

export const toUpperStart = (value) => {
  if (value) {
    return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
  }
};

export const toTitleCaseName = (texto, siglas) => {
  if (texto) {
    const prepositions = ['de', 'do', 'da', 'dos', 'das', 'e'];

    return texto
      .toLowerCase()
      .split(' ')
      .map((w) => {
        if (prepositions.includes(w)) {
          return w;
        } else if (siglas?.includes(w.toUpperCase())) {
          return w.toUpperCase();
        }
        return toUpperStart(w);
      })
      .join(' ');
  }
};

export const calendarioInverso = (mes) => {
  switch (mes) {
    case 'JANEIRO':
      return 1;
    case 'FEVEREIRO':
      return 2;
    case 'MARÇO':
      return 3;
    case 'ABRIL':
      return 4;
    case 'MAIO':
      return 5;
    case 'JUNHO':
      return 6;
    case 'JULHO':
      return 7;
    case 'AGOSTO':
      return 8;
    case 'SETEMBRO':
      return 9;
    case 'OUTUBRO':
      return 10;
    case 'NOVEMBRO':
      return 11;
    case 'DEZEMBRO':
      return 12;
  }
};

export const calendario = (mes) => {
  switch (mes) {
    case 1:
      return 'JANEIRO';
    case 2:
      return 'FEVEREIRO';
    case 3:
      return 'MARÇO';
    case 4:
      return 'ABRIL';
    case 5:
      return 'MAIO';
    case 6:
      return 'JUNHO';
    case 7:
      return 'JULHO';
    case 8:
      return 'AGOSTO';
    case 9:
      return 'SETEMBRO';
    case 10:
      return 'OUTUBRO';
    case 11:
      return 'NOVEMBRO';
    case 12:
      return 'DEZEMBRO';
  }
};

export const abreviatura = (mes) => {
  switch (mes) {
    case 1:
      return 'JAN';
    case 2:
      return 'FEV';
    case 3:
      return 'MAR';
    case 4:
      return 'ABR';
    case 5:
      return 'MAI';
    case 6:
      return 'JUN';
    case 7:
      return 'JUL';
    case 8:
      return 'AGO';
    case 9:
      return 'SET';
    case 10:
      return 'OUT';
    case 11:
      return 'NOV';
    case 12:
      return 'DEZ';
  }
};

export const validarString = (valor) => {
    if(typeof valor !== "string") {
      return false;
    }
    if(valor === null || valor === undefined || valor === ""){
      return false;
    }
    return true;
}
