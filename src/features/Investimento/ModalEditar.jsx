/* eslint-disable react/prop-types */

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
  } from '@mui/material';
  import Textfield from '../../components/FormUI/Textfield';
  import Button from '../../components/FormUI/Button';
  import Select from '../../components/FormUI/Select';
  import { Formik, Form } from 'formik';
  import * as YUP from 'yup';
  import ButtonCancel from '../../components/FormUI/CancelButton/ButtonCancel';
  import {currencyValidator, quantityValidator, inputStringRequiredValidator} from '../../validators/ComunsValidator';
  
  
  const FORM_VALIDATION = YUP.object().shape({
    id_tipo_investimento: inputStringRequiredValidator,
    ativo: inputStringRequiredValidator,
    valor_uni_ativo: currencyValidator,
    quantidade: quantityValidator,
  });
  
  const ModalEditar = ({
    open,
    onClose,
    onSubmit,
    investimento,
    tpsInvestimentos,
    segmentos,
    tipoRenda
  }) => {
    
    const handleSubmit = (values) => {
      onSubmit(values);
      onClose();
    };
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Editar Investimento</DialogTitle>
        <Formik
          initialValues={{ ...investimento }}
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
                <Select
                  name="id_tipo_investimento"
                  label="Tipo de Investimento"
                  options={tpsInvestimentos}
                />
                <Textfield name="ativo" label="Ativo" />
                {tipoRenda === "RENDA VARIÁVEL" && (
                <Select 
                name="segmento" 
                label="Segmento" 
                options={segmentos} 
                /> )}
                <Textfield name="valor_uni_ativo" label="Valor Unitário" />
                <Textfield name="quantidade" label="Quantidade" />
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
  
  export default ModalEditar;
  