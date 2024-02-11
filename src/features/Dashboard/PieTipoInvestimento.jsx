import { Card, Title, DonutChart, Legend } from '@tremor/react';
import { useEffect, useState } from 'react';

const DonutTipoInvestimento = ({ dados }) => {
  const [legenda, setLegenda] = useState([]);

  const dataLegend = () => {
    const arrayMap = dados?.map((dado) => {
      return dado.nome;
    });
    return arrayMap;
  };

  useEffect(() => {
    const valores = dataLegend();

    setLegenda(valores);
  }, []);

  const colorsArray = [
    'teal',
    'indigo',
    'cyan',
    'violet',
    'sky',
    'purple',
    'blue',
    'fuchsia',
    'pink',
    'rose',
    'red',
    'orange',
    'yellow',
    'amber',
    'lime',
    'green',
    'emerald',
    'zinc',
    'stone',
    'slate',
    'gray',
    'neutral',
  ];

  const valueFormatter = (number) =>
    `R$ ${Intl.NumberFormat('br').format(number).toString()}`;

  return (
    <Card className="max-w-lg">
      <Title>Tipos de Investimentos</Title>
      <DonutChart
        className="mt-6"
        data={dados}
        category="valor"
        index="nome"
        valueFormatter={valueFormatter}
        colors={colorsArray}
      />
      <Legend className="mt-3" categories={dataLegend()} colors={colorsArray} />
    </Card>
  );
};

export default DonutTipoInvestimento;
