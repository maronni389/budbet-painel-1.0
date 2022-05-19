import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row } from 'antd';
import OnLoadSpin from 'components/OnLoadSpin';
import { numberToReais, centsToMoney } from 'utils/formats';

const { Title } = Typography;

const BingoInfos = ({ bingo }) => {
  const money = (value) => `R$ ${numberToReais(centsToMoney(value))}`;

  const prize = bingo.amoundPrize > bingo.minimumPrize ? bingo.amoundPrize : bingo.minimumPrize;

  const returnTitle = (status, drawnQuantity) => {
    if (status === 'OPENED') {
      return <Title level={3} type="success">Bolão 10 dezenas Aberto para Apostas</Title>;
    }
    if (status === 'FINISHED') {
      return <Title level={3} type="danger">Bolão 10 dezenas Finalizado (Não é possivel sortear mais)</Title>;
    }
    if (drawnQuantity > 0) {
      return <Title level={3} type="warning">Bolão 10 dezenas com sorteio em andamento</Title>;
    }
    return <Title level={3} type="warning">Bolão 10 dezenas à sortear</Title>;
  };

  return (
    <OnLoadSpin loading={!bingo.status}>
      <Row justify="center">
        {returnTitle(bingo.status, bingo.drawnQuantity)}
      </Row>
      <Row justify="start">
        <Title level={4}>
          {`Arrecadação Total ${money(bingo.amoundCollected)}`}
        </Title>
      </Row>
      <Row justify="start">
        {bingo.amoundPrize > bingo.minimumPrize ? (
          <Title level={4}>
            {`Prêmio Total ${money(bingo.amoundPrize)}`}
          </Title>
        ) : (
          <Title level={4} style={{ color: 'red' }}>
            {`Prêmio Mínimo ${money(bingo.minimumPrize)}`}
          </Title>
        )}
      </Row>
      <Row justify="start">
        <Title level={4}>
          {`Prêmio Para 1º Lugar ${money(prize * bingo.percentagePrizeFirst / 100)}`}
        </Title>
      </Row>
      <Row justify="start">
        <Title level={4}>
          {`Prêmio Para 2º Lugar ${money(prize * bingo.percentagePrizeSecond / 100)}`}
        </Title>
      </Row>
      <Row justify="start">
        <Title level={4}>
          {`Prêmio Para 3º Lugar ${money(prize * bingo.percentagePrizeThird / 100)}`}
        </Title>
      </Row>
    </OnLoadSpin>
  );
};

BingoInfos.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bingo: PropTypes.object.isRequired,
};

export default BingoInfos;
