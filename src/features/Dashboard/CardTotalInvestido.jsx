import React from 'react';
import { Card, Metric, Text } from '@tremor/react';

const CardTotalInvestido = ({ dados }) => {
  return (
    <Card className="max-w-xs mx-auto" decoration="top" decorationColor="blue">
      <Text>Total investido</Text>
      <Metric> {dados} </Metric>
    </Card>
  );
};

export default CardTotalInvestido;
