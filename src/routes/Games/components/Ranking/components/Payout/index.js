import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Typography, Row, Button, List, Popconfirm } from 'antd';
import { numberToReais, centsToMoney } from 'utils/formats';
import OnLoadSpin from 'components/OnLoadSpin';

const { Text, Title, Paragraph } = Typography;

const Payout = ({ winners, requesting, onFinished, bingoFinished }) => {
  const money = (value) => `R$ ${numberToReais(centsToMoney(value))}`;

  const showPrize = () => {
    const { prize } = winners;
    if (prize.value === 0) {
      return (
        <Title level={4} id="dividerText">
          Sem prêmio nesse jogo
        </Title>
      );
    }
    return (
      <Paragraph>
        <Title level={4} id="dividerText">
          {`O prêmio total desse jogo foi de ${money(prize.value)}`}
        </Title>
        {prize.type === 'minimum'
          ? (
            <>
              <Paragraph>
                Prêmio mínimo!
              </Paragraph>
            </>
          ) : null
        }
      </Paragraph>

    );

  };

  const list = (betsQuantity, points, eachPrize, totalPrize, bets, placing) => {
    if (eachPrize === 0) return null;
    if (betsQuantity > 0) {
      return (
        <>
          <Row justify="start" style={{ textAlign: 'justify' }}>
            <Title level={4} id="dividerText">
              {`O ${placing} prêmio foi para quem fez ${points} pontos`}
            </Title>
            <Paragraph>
              Prêmio total de
              {' '}
              <b>
                {money(totalPrize)}
              </b>
              {' '}
              {betsQuantity === 1
                ? 'para um único ganhador!'
                : (`que será dividido para ${betsQuantity} apostas!`)
              }
              <br />
              {betsQuantity === 1 ? null : (
                <>
                  <Text>{'Totalizando '}</Text>
                  <Text strong>{money(eachPrize)}</Text>
                  <Text>{' para cada aposta!'}</Text>
                </>
              )}
            </Paragraph>
          </Row>
          <Row justify="start">
            <Paragraph strong>
              {betsQuantity > 1 ? 'Ganhadores:' : 'Ganhador:'}
            </Paragraph>
          </Row>
          <Row justify="start" style={{ marginBottom: '30px' }}>
            <List
              bordered
              dataSource={bets}
              renderItem={bet => (
                <List.Item>
                  <Text strong>{`   - ${bet.user.nickname}`}</Text>
                </List.Item>
              )}
            />
          </Row>
        </>
      );
    }
    return (
      <Title level={4} id="dividerText">
        {`Sem ganhadores no ${placing} prêmio`}
      </Title>
    );
  };

  const listFirst = () => {
    const { betsQuantity, points, eachPrize, totalPrize, bets } = winners.first;
    return list(betsQuantity, points, eachPrize, totalPrize, bets, 'primeiro');
  };
  const listSecond = () => {
    const { betsQuantity, points, eachPrize, totalPrize, bets } = winners.second;
    return list(betsQuantity, points, eachPrize, totalPrize, bets, 'segundo');
  };
  const listThird = () => {
    const { betsQuantity, points, eachPrize, totalPrize, bets } = winners.third;
    return list(betsQuantity, points, eachPrize, totalPrize, bets, 'terceiro');
  };

  const onFinishedBingo = () => {
    onFinished();
  };

  return (
    <Layout>
      <OnLoadSpin loading={requesting}>
        <Row justify="center">
          <Title style={{ textAlign: 'center' }}>
            {`Sorteio do Jogo #${winners.prize.bingoSequency} ${bingoFinished ? 'finalizado' : ''}`}
          </Title>
        </Row>
        {showPrize()}
        {listFirst()}
        {listSecond()}
        {listThird()}
        <Row justify="space-around">
          <Popconfirm
            title="Deseja mesmo finalizar o Jogo? Não será possivel mais sortear numeros."
            okText="Sim"
            cancelText="Não"
            onConfirm={onFinishedBingo}
          >
            <Button type="primary" disabled={bingoFinished}>
              Finalizar e pagar Ganhadores
            </Button>
          </Popconfirm>
        </Row>
      </OnLoadSpin>
    </Layout>
  );
};

Payout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  winners: PropTypes.object.isRequired,
  requesting: PropTypes.bool.isRequired,
  onFinished: PropTypes.func.isRequired,
  bingoFinished: PropTypes.bool,
};

Payout.defaultProps = {
  bingoFinished: false,
};

export default Payout;
