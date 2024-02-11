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
  import ButtonCancel from '../../components/FormUI/CancelButton/ButtonCancel';
  
  const FORM_VALIDATION = YUP.object().shape({
    nome: YUP.string().required('Campo obrigatório'),
    tipo_renda: YUP.string().required('Campo obrigatório'),
  });
  
  const ModalEditarTipoInvestimento = ({
    open,
    onClose,
    onSubmit,
    tipoInvestimento,
    tpRenda,
  }) => {
    const handleSubmit = (values) => {
      onSubmit(values);
      onClose();
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Editar</DialogTitle>
        <Formik
          initialValues={{ ...tipoInvestimento }}
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
                <Textfield name="nome" label="Tipo de investimento" />
                <Select
                  name="tipo_renda"
                  label="Tipo de renda"
                  options={tpRenda}
                />
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
  
  export default ModalEditarTipoInvestimento;
  