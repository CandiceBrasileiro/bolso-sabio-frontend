import { 
  useCallback, 
  useContext, 
  useEffect, 
  useMemo, 
  useState 
} from 'react';
import Mensagem from '../../components/Mensagem/Mensagem';
import { MSG_INICIAL } from '../../helpers/Constantes';
import {
  
  deleteInvestimento,
  getAllTiposInvestimentos,
  postInvestimento,
  getOneInvestimento,
  putInvestimento,
  getInvestimentosByIdUsuario
} from '../../api/service';
import { mapearTipoInvestimentoParaSelect } from '../../helpers/ObjConverter';
import {
  currencyValidator,
  quantityValidator,
  inputStringRequiredValidator,
} from '../../validators/ComunsValidator';
import { MaterialReactTable } from 'material-react-table';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Box,
  IconButton,
  Tooltip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Delete, 
  Edit, 
  Visibility 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as YUP from 'yup';
import Textfield from '../../components/FormUI/Textfield';
import Select from '../../components/FormUI/Select';
import Button from '../../components/FormUI/Button';
import ModalEditar from './ModalEditar';
import { SEGMENTOS } from '../../helpers/Constantes';
import { UserContext } from '../../Contexts/UserContext';

const INITIAL_VALUES = {
  id_tipo_investimento: '',
  ativo: '',
  valor_uni_ativo: '',
  segmento: '',
  quantidade: '',
};

const FORM_VALIDATION = YUP.object().shape({
  id_tipo_investimento: inputStringRequiredValidator,
  ativo: inputStringRequiredValidator,
  valor_uni_ativo: currencyValidator,
  quantidade: quantityValidator,
});

const FormInvestimento = () => {
  
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(MSG_INICIAL);
  const [tiposInvestimentos, setTiposInvestimentos] = useState([]);
  const [tiposInvestimentosObject, setTiposInvestimentosObject] = useState({});
  const [atualizou, setAtualizou] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectInvestiment, setSelectInvestiment] = useState(false);
  const [tipoRenda, setTipoRenda] = useState("");

  const { id} = useContext(UserContext);

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: 'id_tipo_investimento',
        header: ' ',
        size: 100,
      },
      {
        accessorKey: 'ativo',
        header: 'Ativo',
        enableEditing: true,
        size: 150,
      },
      {
        accessorKey: 'segmento',
        header: 'Segmentos',
        size: 50,
      },
      {
        accessorKey: 'valor_uni_ativo',
        header: 'Valor Unitário',
        size: 30,
      },
      {
        accessorKey: 'quantidade',
        header: 'Quantidade',
        size: 30,
      },
      
      {
        accessorKey: 'valor_investido',
        header: 'Valor investido',
        enableEditing: true,
        size: 30,
      },

    ],
    [],
  );

  useEffect(() => {
    getInvestimentosByIdUsuario(id).then((res) => {
      setTableData(res)});
  }, [atualizou]);

// aqui ele pega os tipos de investimentos cadastrados
  useEffect(() => {
    getAllTiposInvestimentos().then((res) => {
      
      setTiposInvestimentos(res);
      
    });
  }, []);
  
  // aqui ele faz o mapeamento de tipos para o objeto
  useEffect(() => {
    setTiposInvestimentosObject(
      mapearTipoInvestimentoParaSelect(tiposInvestimentos),

    );
  }, [tiposInvestimentos]);



  const handlerTipoRenda = (e) => {
    
    const nomeTpInvestimento = e.target.textContent ? e.target.textContent.toUpperCase() : e.target.textContent;
    const tipoInvestimento = tiposInvestimentos?.find((element) => nomeTpInvestimento === element.nome);

    if(tipoInvestimento){
      
      setTipoRenda(tipoInvestimento.tipo_renda)

    }
    
  }

  const handleDeleteRow = useCallback(
    (row) => {
      if (!confirm(`Você tem certeza que deseja excluir?`)) {
        return;
      }
      deleteInvestimento(row.getValue('id'))
        .then(() => {
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
          setErrorMessage({
            message: `${Date.now()}. Registro excluído com sucesso.`,
            type: 'sucess',
          });
        })
        .catch((err) => {
          setErrorMessage({
            message: `${Date.now()}. Erro ao deletar o registro. ${
              err.response.data.erroMsg
            }.`,
            type: 'error',
          });
        });
    },
    [tableData],
  );

  /*
   * Abrir nova página com os detalhes de  um investimento.
   */
  const handleOpenDetalheInvestimento = (row) => {
    const id = row.getValue('id');
    navigate(`/investimento/${id}`);
  };

  /*
   * Cadastrar um novo investimento.
   */

  const handleCadastrarInvestimento = (values, actions) => {
    const qtd = parseInt(values.quantidade);
    const vlUnitario = parseFloat(values.valor_uni_ativo.replaceAll(',', '.'));
    let segValues = values.segmento === null || values.segmento === "" ? 0 : parseInt(values.segmento);

    const formatedJson = {
      ...values,
      id_usuario: id,
      id_tipo_investimento: parseInt(values.id_tipo_investimento),
      segmento: segValues,
      quantidade: qtd,
      valor_uni_ativo: vlUnitario,
      valor_investido: (qtd * vlUnitario).toFixed(2),
    }; 

    postInvestimento(formatedJson).then((data) => {

      if (data) {
        setAtualizou(!atualizou);
        setErrorMessage({
          message: `${Date.now()}. Registro cadastrado com sucesso.`,
          type: 'sucess',
        });
        actions.resetForm({
          values: { ...INITIAL_VALUES },
        });
      }
    });
  };

  /*
   * Editar um investimento já existente.
   */

  const handleEditInvestment = (values) => {
    const qtd = parseInt(values.quantidade);
    const vlUnitario = parseFloat(values.valor_uni_ativo.replaceAll(',', '.'));
    let segValues = values.segmento === null || values.segmento === "" ? 0 : parseInt(values.segmento);

    const formatedJson = {
      ...values,
      id_tipo_investimento: parseInt(values.id_tipo_investimento),
      quantidade: qtd,
      segmento: segValues,
      valor_uni_ativo: vlUnitario,
      valor_investido: (qtd * vlUnitario).toFixed(2),
    };

    putInvestimento(values.id, formatedJson)
      .then((data) => {
        if (data) {
          setAtualizou(!atualizou);
          setErrorMessage({
            message: `${Date.now()}. Registro alterado com sucesso.`,
            type: 'sucess',
          });
        }
      })
      .catch((err) => {
        setErrorMessage({
          message: `${Date.now()}. Erro ao alterar o registro. ${
            err.response.data.erroMsg
          }.`,
          type: 'error',
        });
      });
  };

  /*
   * Abrir um modal de edição do investimento escolhido.
   */

  const handleOpenModal = (row) => {

    const nomeTpInvestimento = row.getValue('id_tipo_investimento');
    const tipoInvestimento = tiposInvestimentos?.find((item) => nomeTpInvestimento === item.nome);
    if(tipoInvestimento){
      
      setTipoRenda(tipoInvestimento.tipo_renda)

    }

    const id = row.getValue('id');
    getOneInvestimento(id).then((data) => {
      if (data) {
        let vlAtivo = String(data.valor_uni_ativo);
        vlAtivo = vlAtivo.replaceAll('.', ',');
        const tiposMapeados =
          mapearTipoInvestimentoParaSelect(tiposInvestimentos);
          setTiposInvestimentosObject(tiposMapeados);
          setSelectInvestiment({ ...data, valor_uni_ativo: vlAtivo });
          setEditModalOpen(true);
      }
    });
  };
  return (
    <Container sx={{ width: '100%', paddingBottom: '100px' }}>
      <Card sx={{ width: 500 }} className="cardTI">
        <CardContent>
          <Mensagem msg={errorMessage.message} tipo={errorMessage.type} />
          <Typography variant="h5" align="center">
            Cadastrar investimento
          </Typography>
          <Formik
            initialValues={{ ...INITIAL_VALUES }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values, actions) =>
              handleCadastrarInvestimento(values, actions)
            }
            enableReinitialize
          >
            <Form>
              <Grid
                item
                xs={12}
                container
                sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                padding={3}
              >
                <Select
                  name="id_tipo_investimento"
                  label="Tipo de Investimento"
                  options={tiposInvestimentosObject}
                  onClick={handlerTipoRenda}
                />
                <Textfield name="ativo" label="Ativo" />
                {tipoRenda === "RENDA VARIÁVEL" && ( 
                <Select name="segmento" 
                label="Segmento" 
                options={SEGMENTOS} 
                /> )}

                <Textfield name="valor_uni_ativo" label="Valor Unitário" />
                <Textfield name="quantidade" label="Quantidade" />

                <Button color="primary">Cadastrar</Button>
              </Grid>
            </Form>
          </Formik>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          {tableData && (
            <MaterialReactTable
              columns={columns}
              data={tableData}
              enableEditing
              positionActionsColumn="last"
              initialState={{ columnVisibility: { id: false } }}
              renderRowActions={({ row }) => (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <Tooltip
                    arrow
                    placement="right"
                    title="Visualizar Investimento"
                  >
                    <IconButton
                      color="info"
                      onClick={() => handleOpenDetalheInvestimento(row)}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    arrow
                    placement="right"
                    title="Editar meu Investimento"
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenModal(row)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Excluir Investimento">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteRow(row)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            />
          )}
          <ModalEditar
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleEditInvestment}
            investimento={selectInvestiment}
            tpsInvestimentos={tiposInvestimentosObject}
            segmentos={SEGMENTOS}
            tipoRenda={tipoRenda}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default FormInvestimento;
