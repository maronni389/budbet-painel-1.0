import React, { useState } from 'react';
import {
  Layout,
  Row,
  Typography,
  Divider,
} from 'antd';
import PaymentMethods from './components/PaymentMethods';
import AddBank from './components/AddBankForm';

const { Title } = Typography;


const Deposit = () => {

  const [idBank, setIdBank] = useState('');

  const getIdBank = (value) => {
    setIdBank(value);
  };

  return (
    <Layout>
      <Row>
        <Title>Bancos para Depositos dos clientes</Title>
      </Row>
      <Divider orientation="left">O que os clientes Vêem</Divider>
      <PaymentMethods getIdBank={getIdBank} />
      <Divider orientation="left">Adicionar Mais banco</Divider>
      <AddBank idBank={idBank} />
    </Layout>
  );
};

export default Deposit;
