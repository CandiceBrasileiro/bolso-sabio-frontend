import { useEffect, useState, useMemo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import styles from './Investimento.module.css';
import {
  Card,
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Paper,
  Button
} from '@mui/material';
import {
  getAllTiposInvestimentos,
  getOneInvestimento,
  getAportesByInvestimentos,
  deleteAporte,
  postAporte,
  putAporte,
  getOneAporte,
  getProventosByInvestimentos,
  deleteProvento,
  postProvento,
  getOneProvento,
  putProvento,
  getProventoByInvet,
} from '../../api/service';
import { useParams } from 'react-router-dom';
import { investimentoConverter } from '../../helpers/ObjConverter';
import { MaterialReactTable } from 'material-react-table';
import CardContent from '@mui/material/CardContent';
import { Delete, Edit } from '@mui/icons-material';
import { MSG_INICIAL, NM_RENDA_FIXA } from '../../helpers/Constantes';
import Stack from '@mui/material/Stack';
import ModalAdicionarAporte from './ModalCadastrarAporte';
import { ModalEditarAporte } from './ModalEditarAporte';
import ModalAdicionarProvento from './ModalCadastrarProvento';
import { ModalEditarProvento } from './ModalEditarProvento';
import { desMoedaBr, moedaBr, calendarioInverso } from '../../helpers/Utils';
import Mensagem from '../../components/Mensagem/Mensagem';

const INIT_INVESTIMENTO_ATUAL = {
  dtUltimaAcao: '',
  qtdUnidades: 0,
  valorUnitarioAtual: 0,
  valorAtual: 0,
};

const Detalhe = () => {
  const [investiment, setInvestiment] = useState({});
  const [investimentoAtual, setInvestimentoAtual] = useState(
    INIT_INVESTIMENTO_ATUAL,
  );
  const [tpsInvestimentos, setTpsInvestimentos] = useState([]);
  const [tipoRenda, setTipoRenda] = useState('');
  const { id } = useParams();
  const [tableAporte, setTableAporte] = useState([]);
  const [errorMessage, setErrorMessage] = useState(MSG_INICIAL);
  const [errorProventoMessage, setErrorProventoMessage] = useState(MSG_INICIAL);
  const [aporteModalOpen, setAporteModalOpen] = useState(false);
  const [aporteEditModal, setAporteEditModal] = useState(false);
  const [atualizou, setAtualizou] = useState(false);
  const [aporteData, setAporteData] = useState(false);
  const [tableProvento, setTableProvento] = useState([]);
  const [proventoModalOpen, setProventoModalOpen] = useState(false);
  const [proventoEditModal, setProventoEditModal] = useState(false);
  const [proventoData, setProventoData] = useState(false);
  const [resData, setResData] = useState([]);

  const columnsAporte = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: 'valor_aportado',
        header: 'Valor Unitário',
        enableEditing: true,
        size: 100,
      },
      {
        accessorKey: 'quantidade',
        header: 'Quantidade',
        enableEditing: true,
        size: 30,
      },
      {
        accessorKey: 'valor_ativo',
        header: 'Valor Aportado',
        enableEditing: true,
        size: 100,
      },
      {
        accessorKey: 'mes',
        header: 'Mês',
        enableEditing: true,
        size: 50,
      },
      {
        accessorKey: 'ano',
        header: 'Ano',
        enableEditing: true,
        size: 50,
      },
    ],
    [],
  );

  const columnsProventos = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: 'provento',
        header: 'Provento mensal',
        enableEditing: true,
        size: 50,
      },
      {
        accessorKey: 'mes',
        header: 'Mês',
        enableEditing: true,
        size: 50,
      },
      {
        accessorKey: 'ano',
        header: 'Ano',
        enableEditing: true,
        size: 50,
      },
    ],
    [],
  );

  useEffect(() => {
    getProventoByInvet(id)?.then((res) => setResData(res));
  }, [id]);

  useEffect(() => {
    getOneInvestimento(id).then((res) =>
      getAllTiposInvestimentos().then((tipos) => {
        setInvestiment(investimentoConverter(res, tipos));
        setTpsInvestimentos(tipos);
      }),
    );
  }, [id]);

  useEffect(() => {
    getAportesByInvestimentos(id).then((res) => setTableAporte(res));
    getProventosByInvestimentos(id).then((res) => setTableProvento(res));
  }, [id, atualizou]);

  useEffect(() => {
    if (investiment && tpsInvestimentos.length > 0) {
      const obterAporteMaisRecente = () => {
        let maisAtual = { ano: 0, mes: 0 };
        tableAporte.forEach((item) => {
          const mesNumerico = calendarioInverso(item.mes);
          if (item.ano >= maisAtual.ano && mesNumerico >= maisAtual.mes) {
            maisAtual = { ...item };
          }
        });
        return maisAtual;
      };

      const valorAtualRendaVariavel = () => {
        // Soma de valores de proventos
        const valorTotalProventos = tableProvento.reduce(function (
          sum,
          current,
        ) {
          let valorProvento = parseFloat(desMoedaBr(current.provento));
          return sum + valorProvento;
        },
        0);

        if (tableAporte.length === 0) {
          return {
            dtUltimaAcao: investiment.update_at,
            qtdUnidades: investiment.quantidade,
            valorUnitarioAtual: investiment.valor_uni_ativo,
            valorAtual: investiment.valor_investido,
            proventos: moedaBr(valorTotalProventos) ?? moedaBr(0),
          };
        }
        // Soma de Quantidade de aportes
        const overall = tableAporte.reduce(function (sum, current) {
          return sum + current.quantidade;
        }, investiment.quantidade);

        // Obtendo o aporte mais atual
        const lastIndexAporte = obterAporteMaisRecente();

        // Obtendo a data de atualização do aporte mais atual.
        const lastUpdate = lastIndexAporte?.update_at;

        // Obtendo valor unitário investido do aporte mais atual.
        const lastValue = String(lastIndexAporte?.valor_aportado);

        const replaceValue = parseFloat(desMoedaBr(lastValue));

        const valorAtualFinal = replaceValue * overall;

        const resultado = {
          dtUltimaAcao: lastUpdate,
          qtdUnidades: overall,
          valorUnitarioAtual: lastValue,
          valorAtual: moedaBr(valorAtualFinal),
          proventos: moedaBr(valorTotalProventos) ?? moedaBr(0),
        };
        return resultado;
      };

      const valorAtualRendaFixa = () => {
        // Soma de valores de proventos
        const valorTotalProventos = tableProvento.reduce(function (
          sum,
          current,
        ) {
          let valorProvento = parseFloat(desMoedaBr(current.provento));
          return sum + valorProvento;
        },
        0);

        if (tableAporte.length === 0) {
          return {
            dtUltimaAcao: investiment.update_at,
            qtdUnidades: investiment.quantidade,
            valorUnitarioAtual: investiment.valor_uni_ativo,
            valorAtual: investiment.valor_investido,
            proventos: moedaBr(valorTotalProventos) ?? moedaBr(0),
          };
        }
        // Soma de valores de aportes mais o valor do investimento inicial
        const valorTotalInvestimento = tableAporte.reduce(function (
          sum,
          current,
        ) {
          let valorAporte = parseFloat(desMoedaBr(current.valor_ativo));
          return sum + valorAporte;
        },
        parseFloat(desMoedaBr(investiment.valor_investido)));

        // Soma de Quantidade de aportes mais a quantidade do investimento inicial
        const qtdAportes = tableAporte.reduce(function (sum, current) {
          return sum + current.quantidade;
        }, investiment.quantidade);

        // Obtendo o aporte mais atual
        const lastIndexAporte = obterAporteMaisRecente();

        // Obtendo a data de atualização do aporte mais atual.
        const lastUpdate = lastIndexAporte?.update_at;

        // Obtendo valor unitário investido do aporte mais atual.
        const lastValue = String(lastIndexAporte?.valor_aportado);

        const resultado = {
          dtUltimaAcao: lastUpdate,
          qtdUnidades: qtdAportes,
          valorUnitarioAtual: lastValue,
          valorAtual: moedaBr(valorTotalInvestimento),
          proventos: moedaBr(valorTotalProventos) ?? moedaBr(0),
        };
        return resultado;
      };

      const valorAtualPorRenda = () => {
        if (tipoRenda === NM_RENDA_FIXA) {
          return valorAtualRendaFixa();
        } else {
          return valorAtualRendaVariavel();
        }
      };

      const tpInvestimento = tpsInvestimentos.find(
        (item) => item.nome === investiment.id_tipo_investimento,
      );

      if (tpInvestimento) {
        setTipoRenda(tpInvestimento.tipo_renda);
        setInvestimentoAtual(valorAtualPorRenda());
      }
    }
  }, [
    atualizou,
    investiment,
    tpsInvestimentos,
    tipoRenda,
    tableAporte,
    tableProvento,
  ]);

  /*
   * Excluir um aporte.
   */
  const handleDeleteRow = useCallback(
    (row) => {
      if (!confirm(`Você tem certeza que deseja excluir este registro?`)) {
        return;
      }
      deleteAporte(row.getValue('id'))
        .then(() => {
          setAtualizou(!atualizou);
          setErrorMessage({
            message: `${Date.now()}. Registro excluído com sucesso.`,
            type: 'sucess',
          });
        })
        .catch((err) => {
          setErrorMessage({
            message: `${Date.now()}. Error ao deletar o registro. ${
              err.response.data.erroMsg
            }.`,
            type: 'error',
          });
        });
    },
    [atualizou],
  );

  /*
   * Excluir um Provento.
   */

  const handleDeleteProventoRow = useCallback(
    (row) => {
      if (!confirm(`Você tem certeza que deseja excluir este registro?`)) {
        return;
      }
      deleteProvento(row.getValue('id'))
        .then(() => {
          setAtualizou(!atualizou);
          setErrorProventoMessage({
            message: `${Date.now()}. Registro excluído com sucesso.`,
            type: 'sucess',
          });
        })
        .catch((err) => {
          setErrorProventoMessage({
            message: `${Date.now()}. Error ao deletar o registro. ${
              err.response.data.erroMsg
            }.`,
            type: 'error',
          });
        });
    },
    [atualizou],
  );

  //  Abrir modal Adicionar aporte
  const handleOpenModal = () => {
    setAporteModalOpen(true);
  };

  //  Abrir modal Adicionar Provento
  const handleOpenModalProvento = () => {
    setProventoModalOpen(true);
  };

  // Abrir modal editar aporte
  const handleAporteEditOpenModal = (row) => {
    const id = row.getValue('id');
    getOneAporte(id).then((data) => {
      if (data) {
        setAporteData({
          ...data,
          valor_aportado: String(data.valor_aportado).replaceAll('.', ','),
        });
        setAporteEditModal(true);
      }
    });
  };

  // Abrir um modal de edição provento
  const handleProventoEditOpenModal = (row) => {
    const id = row.getValue('id');

    getOneProvento(id).then((data) => {
      if (data) {
        setProventoData({
          ...data,
          provento: String(data.provento).replaceAll('.', ','),
        });
        setProventoEditModal(true);
      }
    });
  };

  // Cadastrar aporte
  const handleCadastrarAporte = (values) => {
    postAporte({
      ...values,
      id_investimento: id,
      valor_aportado: desMoedaBr(values.valor_aportado),
    })
      .then((data) => {
        if (data) {
          setAtualizou(!atualizou);
          setErrorMessage({
            message: `${Date.now()}. Registro cadastrado com sucesso.`,
            type: 'sucess',
          });
        }
      })
      .catch((err) => {
        setErrorMessage({
          message: `${err.response.data.message}`,
          type: 'error',
        });
      });
  };

  // Cadastrar Provento
  const handleCadastrarProvento = (values) => {
    postProvento({
      ...values,
      id_investimento: id,
      provento: desMoedaBr(values.provento),
    })
      .then((data) => {
        if (data) {
          setAtualizou(!atualizou);
          setErrorProventoMessage({
            message: `${Date.now()}. Registro cadastrado com sucesso.`,
            type: 'sucess',
          });
        }
      })
      .catch((err) => {
        setErrorProventoMessage({
          message: `${err.response.data.message}`,
          type: 'error',
        });
      });
  };

  // Editar aporte
  const handleEditAporte = (values) => {
    const qtd = parseInt(values.quantidade);
    const formatedJson = {
      ...values,
      quantidade: qtd,
      valor_aportado: desMoedaBr(values.valor_aportado),
    };
    putAporte(values.id, formatedJson)
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
          message: `${Date.now()}. Erro ao alterar o registro. ${err.message}.`,
          type: 'error',
        });
      });
  };

  // Editar provento

  const handleEditProvento = (values) => {
    const formatedJson = { ...values, provento: desMoedaBr(values.provento) };
    putProvento(values.id, formatedJson)
      .then((data) => {
        if (data) {
          setAtualizou(!atualizou);
          setErrorProventoMessage({
            message: `${Date.now()}. Registro alterado com sucesso.`,
            type: 'sucess',
          });
        }
      })
      .catch((err) => {

        setErrorProventoMessage({
          message: `${Date.now()}. Erro ao alterar o registro. ${err.message}.`,
          type: 'error',
        });
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container
      sx={{ width: '100%', padding: '50px' }}
      className={styles.detalharContainer}
    >
      <Box sx={{ flexGrow: 1, marginBottom: '50px' }}>
        <Card sx={{ padding: '30px', marginBottom: '50px' }}>
          <Typography variant="h4" sx={{ color: '#1976D2' }} className={styles.detalharContainer}>
            {/* Campo para investimento ativo */} {investiment.ativo}
          </Typography>
          <hr
            style={{
              borderColor: '#99ccff',
              width: '100%'
            }}
          />
          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '12px', color: '#949494' }}
              >
                Tipo de investimento
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                {/* Campo para idTipo */}
                {investiment.id_tipo_investimento}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '12px', color: '#949494' }}
              >
                Data inicial
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '12px', color: '#949494' }}
              >
                Quantidade inicial
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '12px', color: '#949494' }}
              >
                Valor unitário inicial
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>{investiment.create_at}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle2">
                {investiment.quantidade}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle2">
                {investiment.valor_uni_ativo}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '12px', color: '#949494' }}
              >
                Última atualização
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '12px', color: '#949494' }}
              >
                Quantidade atual
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '12px', color: '#949494' }}
              >
                Valor unitário atual
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>{investimentoAtual.dtUltimaAcao}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle2">
                {investimentoAtual.qtdUnidades}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle2">
                {investimentoAtual.valorUnitarioAtual}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* card de valor*/}

      <Box sx={{ flexGrow: 1, marginBottom: '50px' }}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Item>
              Investimento inicial
              <Typography sx={{ fontSize: '2rem', color: '#1976D2' }}>
                {investiment?.valor_investido}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              Investimento atual
              <Typography sx={{ fontSize: '2rem', color: '#006666' }}>
                {tableAporte.length > 0
                  ? investimentoAtual.valorAtual
                  : investiment?.valor_investido}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              Proventos
              <Typography sx={{ fontSize: '2rem', color: '#990099' }}>
                {investimentoAtual.proventos}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
      {/* Aportes */}

      <Card>
        <CardContent>
          <Mensagem msg={errorMessage.message} tipo={errorMessage.type} />
          <Typography
          className={styles.detalharContainer}
            variant="h4"
            sx={{ marginBottom: '20px', color: '#1976D2', paddingLeft: '10px' }}
          >
            Aportes
          </Typography>
          <MaterialReactTable
            columns={columnsAporte}
            data={tableAporte}
            enableEditing
            positionActionsColumn="last"
            initialState={{ columnVisibility: { id: false } }}
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
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
                    onClick={() => handleAporteEditOpenModal(row)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </CardContent>
        <Stack sx={{ alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{ width: '200px', margin: '20px' }}
            onClick={() => handleOpenModal()}
          >
            Adicionar
          </Button>
          <ModalAdicionarAporte
            open={aporteModalOpen}
            onClose={() => setAporteModalOpen(false)}
            onSubmit={handleCadastrarAporte}
          />
          <ModalEditarAporte
            open={aporteEditModal}
            onClose={() => setAporteEditModal(false)}
            onSubmit={handleEditAporte}
            aporte={aporteData}
          />
        </Stack>
      </Card>

      {/* Proventos */}

      <Card sx={{ marginTop: '40px' }}>
        <CardContent>
          <Mensagem
            msg={errorProventoMessage.message}
            tipo={errorProventoMessage.type}
          />
          <Typography
            variant="h4"
            sx={{
              marginBottom: '20px',
              marginTop: '20px',
              color: '#1976D2',
              paddingLeft: '10px',
            }}
          >
            Proventos
          </Typography>
          <MaterialReactTable
            columns={columnsProventos}
            data={tableProvento}
            enableEditing
            positionActionsColumn="last"
            initialState={{ columnVisibility: { id: false } }}
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="right" title="Excluir Provento">
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteProventoRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Editar provento">
                  <IconButton
                    color="primary"
                    onClick={() => handleProventoEditOpenModal(row)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </CardContent>
        <Stack sx={{ alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{ width: '200px', margin: '20px' }}
            onClick={() => handleOpenModalProvento()}
          >
            Adicionar
          </Button>
          <ModalAdicionarProvento
            open={proventoModalOpen}
            onClose={() => setProventoModalOpen(false)}
            onSubmit={handleCadastrarProvento}
          />
          <ModalEditarProvento
            open={proventoEditModal}
            onClose={() => setProventoEditModal(false)}
            onSubmit={handleEditProvento}
            provento={proventoData}
          />
        </Stack>
      </Card>
    </Container>
  );
};

export default Detalhe;
