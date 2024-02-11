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
  import Select from '../../components/FormUI/Select';
  import { MESES } from '../../helpers/Constantes';
  import ButtonCancel from '../../components/FormUI/CancelButton/ButtonCancel';
  import {currencyValidator, quantityValidator, inputStringRequiredValidator, yearValidator} from '../../validators/ComunsValidator';
  
  
  const FORM_VALIDATION = YUP.object().shape({
    valor_aportado: currencyValidator,
    quantidade: quantityValidator,
    mes:inputStringRequiredValidator,
    ano: yearValidator,
  });
  
  export const ModalEditarAporte = ({ open, onClose, onSubmit, aporte }) => {
    const handleSubmit = (values) => {
      onSubmit(values);
      onClose();
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Editar Aporte</DialogTitle>
        <Formik
          initialValues={{ ...aporte }}
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
                <Textfield name="valor_aportado" label="Valor aportado" />
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
              <Button>Salvar</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    );
  };
  