import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
  } from '@mui/material';
  import { Formik, Form } from 'formik';
  import Textfield from '../../components/FormUI/Textfield';
  import * as YUP from 'yup';
  import Button from '../../components/FormUI/Button';
  import { MESES } from '../../helpers/Constantes';
  import Select from '../../components/FormUI/Select';
  import ButtonCancel from '../../components/FormUI/CancelButton/ButtonCancel';
  import {
    currencyValidator,
    quantityValidator,
    inputStringRequiredValidator,
    yearValidator,
  } from '../../validators/ComunsValidator';
  
  const FORM_VALIDATION = YUP.object().shape({
    provento: YUP.string().required('Campo obrigatório'),
    mes: inputStringRequiredValidator,
    ano: yearValidator,
  });
  
  export const ModalEditarProvento = ({ open, onClose, onSubmit, provento }) => {
    const handleSubmit = (values) => {
    
      onSubmit(values);
      onClose();
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Editar Provento</DialogTitle>
        <Formik
          initialValues={{ ...provento }}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmit}
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
                <Textfield name="provento" label="Valor do provento" />
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
              <Button>Salvar</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    );
  };
  