/* eslint-disable react/prop-types */

import {
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    DialogActions,
  } from '@mui/material';
  import { Formik, Form } from 'formik';
  import Textfield from '../../components/FormUI/Textfield';
  import Button from '../../components/FormUI/Button';
  import ButtonCancel from '../../components/FormUI/CancelButton/ButtonCancel';
  import Select from '../../components/FormUI/Select';
  import * as YUP from 'yup';
  import { MESES } from '../../helpers/Constantes';
  import {
    currencyValidator,
    quantityValidator,
    yearValidator,
    inputStringRequiredValidator,
  } from '../../validators/ComunsValidator';
  
  const INITIAL_VALUES = {
    valor_aportado: '',
    valor_ativo: '',
    quantidade: '',
    mes: '',
    ano: '',
  };

  const FORM_VALIDATION = YUP.object().shape({
    valor_aportado: currencyValidator,
    quantidade: quantityValidator,
    mes: inputStringRequiredValidator,
    ano: yearValidator,
  });
  
  const ModalAdicionarAporte = ({ open, onSubmit, onClose }) => {
    const handleSubmit = (values) => {
      onSubmit(values);
      onClose();
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Cadastrar Aporte</DialogTitle>
        <Formik
          initialValues={{ ...INITIAL_VALUES }}
          onSubmit={handleSubmit}
          validationSchema={FORM_VALIDATION}
          enableReinitialize
        >
          <Form>
            <DialogContent>
              <Stack
                sx={{
                  width: '100%',
                  minWidth: { xs: '300px', sm: '360px', md: '400px' },
                  gap: '1.5rem',
                }}
              >
                <Textfield name="valor_aportado" label="Valor unitário" />
                <Textfield name="quantidade" label="Quantidade" />
                <Select name="mes" label="Mês" options={MESES} />
                <Textfield name="ano" label="Ano" />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
              <ButtonCancel
                onClick={() => {
                  onClose();
                }}
              >
                CANCELAR
              </ButtonCancel>
              <Button>Adicionar</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    );
  };
  
  export default ModalAdicionarAporte;
  