import { Container, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getAllTiposInvestimentos,
  postTipoInvestimento,
  deleteTipoInvestimento,
  getOneTipoInvestimento,
  putTipoInvestimento,
} from '../../api/service';
import {
  tiposInvestimentosConverter,
  tipoInvestimentoConverter,
} from '../../helpers/ObjConverter';
import {
  TIPOS_RENDAS,
  NM_RENDA_FIXA,
  RENDA_FIXA,
  RENDA_VARIAVEL,
  MSG_INICIAL,
} from '../../helpers/Constantes';
import ModalEditarTipoInvestimento from './ModalEditarTipoInvestimento';
import Mensagem from '../../components/Mensagem/Mensagem';

const FormTipoInvestimento = () => {
  const [investmentType, setInvestmentType] = useState('');
  const [tipoRenda, setTipoRenda] = useState('');
  const [errorMessage, setErrorMessage] = useState(MSG_INICIAL);
  const [errorMessageTipoInvestimento, setErrorMessageTipoInvestimento] =
    useState(MSG_INICIAL);
  const [tableData, setTableData] = useState([]);
  const [tipoInvestimentoEditModal, setTipoInvestimentoEditModal] =
    useState(false);
  const [tipoInvestimentoData, setTipoInvestimentoData] = useState(false);
  const [atualizou, setAtualizou] = useState(false);
  const [tipoRendaSelect, setTipoRendaSelect] = useState('');

  useEffect(() => {
    getAllTiposInvestimentos().then((res) => setTableData(res));
  }, [atualizou]);

  const handleChange = (e) => {
    setTipoRenda(e.target.value);
  };

  const handleClearForm = () => {
    setInvestmentType('');
    setTipoRenda('');
  };

  const handleSubmit = () => {
    if (!investmentType || !tipoRenda) {
      setErrorMessage({
        message: `${Date.now()}. Preencha todos os campos do formulário.`,
        type: 'error',
      });
      return;
    }
    postTipoInvestimento(investmentType, tipoRenda)
      .then((data) => {
        if (data) {
          const dadoFormatado = tipoInvestimentoConverter(data);
          tableData.push(dadoFormatado);
          setTableData([...tableData]);
          setAtualizou(!atualizou);
          handleClearForm();
          setErrorMessage({
            message: `${Date.now()}. Registro cadastrado com sucesso.`,
            type: 'sucess',
          });
        }
      })
      .catch((err) => {
        setErrorMessage({
          message: `${Date.now()}. Erro ao cadastrar. ${err.message}.`,
          type: 'error',
        });
      });
  };
  // Abrir um modal de edição
  const handleEditarTipoOpenModal = (row) => {
    const id = row.getValue('id');
    const tipoRenda = {
      1: 'RENDA FIXA',
      2: 'RENDA VARIÁVEL',
    };
    getOneTipoInvestimento(id, tipoRenda).then((data) => {
      if (data) {
        setTipoInvestimentoData(data);
        setTipoInvestimentoEditModal(true);
        setTipoRendaSelect(tipoRenda);
      }
    });
  };

  // Editar Tipo de investimento

  const handleEditarTipo = (values) => {
    const tipoAlterado = {
      nome: values.nome,
      tipo_renda: values.tipo_renda,
    };

    putTipoInvestimento(values.id, tipoAlterado)
      .then((data) => {
        if (data) {
          setAtualizou(!atualizou);
          setErrorMessageTipoInvestimento({
            message: `${Date.now()}. Registro alterado com sucesso.`,
            type: 'sucess',
          });
        }
      })
      .catch((err) => {
        setErrorMessageTipoInvestimento({
          message: `${Date.now()}. Erro ao alterar o registro. ${err.message}.`,
          type: 'error',
        });
      });
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue('nome')}`)) {
        return;
      }
      deleteTipoInvestimento(row.getValue('id'))
        .then(() => {
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
          setErrorMessageTipoInvestimento({
            message: `${Date.now()}. Registro excluído com sucesso.`,
            type: 'sucess',
          });
        })
        .catch((err) => {
          setErrorMessageTipoInvestimento({
            message: `${Date.now()}. Erro ao alterar o registro. ${
              err.message
            }.`,
            type: 'error',
          });
        });
    },
    [tableData],
  );

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Identificador',
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: 'nome',
      header: 'Tipo do Investimento',
      size: 300,
    },
    {
      accessorKey: 'tipo_renda',
      header: 'Tipo de Renda',
    },
    {
      accessorKey: 'create_at',
      header: 'Data de Criação',
      enableEditing: false,
    },
  ]);

  return (
    <Container sx={{ width: '100%', paddingBottom: '100px'}}>
      <Card sx={{ width: 500, minHeight: 290 }} className="cardTI">
        <CardContent>
          <Mensagem msg={errorMessage.message} tipo={errorMessage.type} />
          <Grid
            item
            xs={12}
            container
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" align="center">
              Tipo de investimento
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              value={investmentType}
              onChange={(e) => setInvestmentType(e.target.value)}
              variant="outlined"
            />
            <Grid>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={tipoRenda}
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    onChange={handleChange}
                    value="1"
                    control={<Radio />}
                    label="Fixa"
                  />
                  <FormControlLabel
                    onChange={handleChange}
                    value="2"
                    control={<Radio />}
                    label="Variável"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Stack spacing={2}>
              <Button variant="contained" onClick={() => handleSubmit()}>
                <Typography>Cadastrar</Typography>
              </Button>
            </Stack>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Mensagem
            msg={errorMessageTipoInvestimento.message}
            tipo={errorMessageTipoInvestimento.type}
          />
          <MaterialReactTable
            columns={columns}
            data={tableData}
            enableEditing
            positionActionsColumn="last"
            initialState={{ columnVisibility: { id: false } }}
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex', gap: '1rem', paddingBottom: '2rem' }}>
                <Tooltip arrow placement="right" title="Excluir Aporte">
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Editar aporte">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditarTipoOpenModal(row)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </CardContent>
      </Card>
      <ModalEditarTipoInvestimento
        open={tipoInvestimentoEditModal}
        onClose={() => setTipoInvestimentoEditModal(false)}
        onSubmit={handleEditarTipo}
        tipoInvestimento={tipoInvestimentoData}
        tpRenda={tipoRendaSelect}
      />
    </Container>
  );
};

export default FormTipoInvestimento;
