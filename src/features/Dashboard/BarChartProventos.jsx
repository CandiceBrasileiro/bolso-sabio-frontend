import { Card, Title, BarChart, Legend } from '@tremor/react';

const BarChartProventos = ({ dados }) => {
  const valueFormatter = (number) =>
    `R$ ${Intl.NumberFormat('br').format(number).toString()}`;

  return (
    <Card className="w-5/6 mx-auto mb-24">
      <Title>Proventos dos últimos 12 meses</Title>
      <BarChart
        className="mt-3"
        data={dados}
        index="periodo"
        categories={['valor']}
        colors={['blue']}
        valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};
export default BarChartProventos;
