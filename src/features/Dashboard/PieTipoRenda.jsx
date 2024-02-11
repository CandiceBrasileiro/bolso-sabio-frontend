import { Card, Title, DonutChart, Legend } from '@tremor/react';

const DonutTipoRenda = ({ dados }) => {
  const valueFormatter = (number) =>
    `R$ ${Intl.NumberFormat('br').format(number).toString()}`;

  return (
    <Card className="max-w-lg">
      <Title>Tipo de renda</Title>
      <DonutChart
        className="mt-6"
        data={dados}
        category="valor"
        index="nome"
        valueFormatter={valueFormatter}
        colors={['teal', 'cyan']}
      />
      <Legend
        className="mt-3"
        categories={['Renda Fixa', 'Renda Variável']}
        colors={['teal', 'cyan']}
      />
    </Card>
  );
};

export default DonutTipoRenda;
