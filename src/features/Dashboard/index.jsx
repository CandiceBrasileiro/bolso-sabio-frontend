import { useEffect, useState, useCallback, useContext } from 'react';
import {
  getAllTiposInvestimentos,
  getAllInvestimentos,
  getAllAportes,
  getAllProventos,
  getPeriodoProvento,
  getInvestimentosByIdUsuario
} from '../../api/service';
import { NM_RENDA_FIXA, NM_RENDA_VARIAVEL } from '../../helpers/Constantes';
import DonutTipoRenda from './PieTipoRenda';
import DonutTipoInvestimento from './PieTipoInvestimento';
import BarChartProventos from './BarChartProventos';
import CardInvestimentos from './CardInvestimentos';
import CardProventos from './CardProventos';
import { moedaBr } from '../../helpers/Utils';
import CardTotalInvestido from './CardTotalInvestido';
import { abreviatura } from '../../helpers/Utils';
import { UserContext }  from '../../Contexts/UserContext'

const Dashboard = () => {
  const [tiposInvestimentos, setTiposInvestimentos] = useState([]);
  const [investimentos, setInvestimentos] = useState([]);
  const [aportes, setAportes] = useState([]);
  const [proventos, setProventos] = useState([]);
  const [proventosData, setProventosData] = useState([]);

  const { id } = useContext(UserContext);

  const fetchDados = useCallback(async () => {
    const [
      tiposInvestimentos,
      investimentos,
      aportes,
      proventos,
      proventosData,
    ] = await Promise.all([
      getAllTiposInvestimentos(),
      getInvestimentosByIdUsuario(id),
      getAllAportes(),
      getAllProventos(),
      getPeriodoProvento(),
    ]);
    setTiposInvestimentos(tiposInvestimentos);
    setInvestimentos(investimentos);
    setAportes(aportes);
    setProventos(proventos);
    setProventosData(proventosData);
  }, []);

  useEffect(() => {
    fetchDados();
  }, [fetchDados]);

  const obterPorTipoRenda = (nomeRenda) => {
    let investimentosPorRenda = {};
    let totalRenda = 0.0;

    const tipoRenda = tiposInvestimentos?.filter(
      (tipo) => tipo.tipo_renda === nomeRenda,
    );

    tipoRenda?.forEach((item) => {

      investimentos.forEach((inv) => {

        if (item.nome === inv.id_tipo_investimento) {
          let qtdInv = inv.quantidade;
          let qtdApt = 0;
          let maiorAporte = { id: 0, valor_aportado: '' };

          aportes.forEach((apt) => {
            if (inv.id === apt.id_investimento) {
              if (apt.id > maiorAporte.id) {
                maiorAporte = apt;
              }
              qtdApt = qtdApt + apt.quantidade;
            }
          });
          let qtdTotalInv = qtdInv + qtdApt;
          let valorUnitarioAtual =
            maiorAporte && maiorAporte.id > 0
              ? parseFloat(maiorAporte.valor_aportado.replaceAll('R$', ''))
              : parseFloat(inv.valor_uni_ativo.replaceAll('R$', ''));
          let totalInvestimento = qtdTotalInv * valorUnitarioAtual;
          totalRenda = totalRenda + totalInvestimento;
        }
      });
    });

    if (totalRenda > 0) {
      investimentosPorRenda = {
        nome: nomeRenda,
        valor: totalRenda,
      };
    }   
    return investimentosPorRenda;
  };

  const dadosDonutPorRenda = () => {
    const dadosParaGraficoTpRenda = [];

    dadosParaGraficoTpRenda.push(obterPorTipoRenda(NM_RENDA_FIXA));
    dadosParaGraficoTpRenda.push(obterPorTipoRenda(NM_RENDA_VARIAVEL));
    
    return dadosParaGraficoTpRenda;
  };

  const obterPorTipoInvestimento = () => {
    let valoresPorTipo = [];

    tiposInvestimentos?.forEach((item) => {
      const nome = item.nome;
      let totalPorTipo = 0.0;

      investimentos?.forEach((inv) => {
        let totalInv = 0.0;

        if (item.nome === inv.id_tipo_investimento) {
          totalInv = inv.quantidade * parseFloat(inv.valor_uni_ativo.replaceAll('R$', ''));
          totalPorTipo = totalPorTipo + totalInv;
          let maiorAporte = { id: 0, valor_aportado: '' };
          let qtdAportes = 0;

          aportes.forEach((apt) => {
            if (inv.id === apt.id_investimento) {
              if (apt.id > maiorAporte.id) {
                maiorAporte = apt;
              }
              qtdAportes = qtdAportes + apt.quantidade;
            }
          });

          if (maiorAporte.id !== 0) {
            let totalAportes =
              qtdAportes *
              parseFloat(maiorAporte.valor_aportado.replaceAll('R$', ''));
            totalPorTipo = totalPorTipo + totalAportes;
          }
        }
      });

      if (totalPorTipo !== 0.0) {
        const obj = {
          nome,
          valor: totalPorTipo,
        };
        valoresPorTipo.push(obj);
      }
    });
    return valoresPorTipo;
  };

  const obterProventos = () => {
    let filtroProventos = [];

    proventosData?.forEach((item) => {
      const mes = abreviatura(item.mes);

      let periodo = `${mes} - ${item.ano}`;
      let ordena = String(item.ano) + String(item.mes).padStart(2, '0');
      ordena = parseInt(ordena);

      const lista = filtroProventos.filter((prov) => prov.periodo === periodo);

      if (!lista || lista.length === 0) {
        const obj = {
          periodo: `${mes} - ${item.ano}`,
          valor: item.provento,
          ordena,
        };

        filtroProventos.push(obj);
      } else {
        let elemento = lista.pop();
        const index = filtroProventos.indexOf(elemento);

        if (index !== -1) {
          filtroProventos.splice(index, 1);
        }
        let novoElemento = {
          periodo: elemento.periodo,
          valor: elemento.valor + item.provento,
          ordena: ordena,
        };
        filtroProventos.push(novoElemento);
      }
    });
    const lista = filtroProventos.sort((a, b) => a.ordena - b.ordena);
    return lista;
  };

  // total de investimento

  const totalInvestimento = () => {
    let totalRenda = 0.0;

    investimentos.forEach((inv) => {
      let investimento = inv.valor_investido.replaceAll('R$', '');
      totalRenda = totalRenda + parseFloat(investimento.replaceAll('.', ''));
    });
    return moedaBr(totalRenda).toString();
  };

  const totalProventos = () => {
    let totalRenda = 0.0;

    proventos.forEach((prov) => {
      let valor = prov.provento;
      totalRenda += valor;
    });
    return moedaBr(totalRenda).toString();
  };

  const valorInvestido = () => {
    let totalI = 0.0;
    let totalA = 0.0;

    investimentos.forEach((inv) => {
      let investimento = inv.valor_investido.replaceAll('R$', '');
      totalI += +parseFloat(investimento.replaceAll('.', ''));
      aportes.forEach((apt) => {
        let aporte = apt.valor_aportado.replaceAll('R$', '');
        totalA += parseFloat(aporte.replaceAll('.', ''));
      });
    });
    let soma = moedaBr(totalA + totalI);
    return soma.toString();
  };

  return (
    <div>
      <div className="flex-row flex divcard mt-6 ">
        <CardInvestimentos dados={totalInvestimento()} />
        <CardTotalInvestido dados={valorInvestido()} />
        <CardProventos dados={totalProventos()} />
      </div>
      <div className="flex-row flex divcard gap-12">
        <DonutTipoRenda dados={dadosDonutPorRenda()} />
        <DonutTipoInvestimento dados={obterPorTipoInvestimento()} />
      </div>
      <BarChartProventos dados={obterProventos()} />
    </div>
  );
};

export default Dashboard;
