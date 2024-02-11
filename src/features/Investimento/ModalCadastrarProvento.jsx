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
  import * as YUP from 'yup';
  import { MESES } from '../../helpers/Constantes';
  import Select from '../../components/FormUI/Select';
  import {
    currencyValidator,
    inputStringRequiredValidator,
    yearValidator,
  } from '../../validators/ComunsValidator';
  import ButtonCancel from '../../components/CancelButton/ButtonCancel';
  
  const INITIAL_VALUES = {
    provento: '',
    mes: '',
    ano: '',
  };
  
  const FORM_VALIDATION = YUP.object().shape({
    provento: currencyValidator,
    mes: inputStringRequiredValidator,
    ano: yearValidator,
  });
  
  const ModalAdicionarProvento = ({ open, onSubmit, onClose }) => {
    const handleSubmit = (values) => {
      onSubmit(values);
      onClose();
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Cadastrar Provento</DialogTitle>
        <Formik
          initialValues={{ ...INITIAL_VALUES }}
          onSubmit={handleSubmit}
          enableReinitialize
          validationSchema={FORM_VALIDATION}
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
                <Textfield name="provento" label="Provento" />
                <Select name="mes" label="Mês" options={MESES} />
                <Textfield name="ano" label="Ano" />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
              <ButtonCancel color="secondary" onClick={onClose}>
                Cancelar
              </ButtonCancel>
              <Button>Adicionar</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    );
  };
  
  export default ModalAdicionarProvento;
  