import React from 'react';
import { Card, Metric, Text } from '@tremor/react';

const CardInvestimentos = ({ dados }) => {
  return (
    <Card
      className="max-w-xs mx-auto"
      decoration="top"
      decorationColor="blue"
    >
      <Text>Total de investimento inicial</Text>
      <Metric> {dados} </Metric>
    </Card>
  );
};

export default CardInvestimentos;
