import React from 'react';
import { Card, Metric, Text } from '@tremor/react';

const CardProventos = ({ dados }) => {
  return (
    <Card className="max-w-xs mx-auto" decoration="top" decorationColor="blue">
      <Text>Total Proventos</Text>
      <Metric>{dados} </Metric>
    </Card>
  );
};

export default CardProventos;
