import * as YUP from 'yup';

export const validateRequired = (value) => !!value.length;

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email)
}

export const validateSizeField = (field, minSize, maxSize) =>
  field.length >= minSize && field.length <= maxSize;

export const inputStringRequiredValidator =
  YUP.string().required('Campo obrigatório');


let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

export const currencyValidator = YUP.number()
  .transform((_, value) => {
    let valor = String(value);
    if (valor.includes('.')) {
      return null;
    }
    return +valor.replace(/,/, '.');
  })
  .positive()
  .test(
    'is-decimal',
    'O valor deve ter apenas duas casas decimais separadas por ponto',
    (val) => {
      if (val != undefined) {
        return patternTwoDigisAfterComma.test(val);
      }
      return true;
    },
  )
  .required(
    'Campo obrigatório ou com formato inválido, use virgula pra separar as casas decimais. Ex: 1000,98',
  );

export const quantityValidator = YUP.number()
  .typeError('Deve ser um número!')
  .positive()
  .min(1, 'Mínimo de 1!')
  .max(10000, 'Máximo de 10.000!')
  .required('Campo obrigatório!');

export const yearValidator = YUP.number()
  .typeError('Deve ser um número!')
  .positive()
  .min(2000, 'Mínimo de 2000!')
  .max(2050, 'Máximo de 2050!')
  .required('Campo obrigatório!');

  export const validarCPF = (cpf)  => {

    const cpfRegex = /^(?:(\d{11}))$/;
    if (!cpfRegex.test(cpf)) {

      return false;
    }
    const numeros = cpf.match(/\d/g).map(Number);
    let soma = numeros.reduce((acc, cur, idx) => {

      if (idx < 9) {
        return acc + cur * (10 - idx);
      }
      return acc;
    }, 0);

    let resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    if (resto !== numeros[9]) {
      return false;
    }
  
    soma = numeros.reduce((acc, cur, idx) => {
      if (idx < 10) {
        return acc + cur * (11 - idx);
      }
      return acc;
    }, 0);
  
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== numeros[10]) {
      return false;
    }
  
    return true;
  }


