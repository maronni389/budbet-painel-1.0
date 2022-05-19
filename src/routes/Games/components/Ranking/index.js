import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Typography, Row, Col, Button, Modal, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { bingodrawnCreateAction } from '@redux/bingodrawns/actions.js';
import { rankingCreateAction, bingobetCreateAction } from '@redux/bingobets/actions.js';
import { bingopayoutRankingAction, bingopayoutCreateAction } from '@redux/bingopayout/actions.js';
import { OnLoadSpin, ModalCreateBet } from 'components';
import TableBets from './components/TableBets';
import TableDrawns from './components/TableDranws';
import Payout from './components/Payout';
import BingoInfos from './components/BingoInfos';
import EnterNumbers from './components/EnterNumbers';
import ModalChooseUser from './components/ModalChooseUser';

const { Title } = Typography;

const Ranking = ({ handleBack }) => {
  const { ranking, rankingRequesting } = useSelector(selectState('bingopayout', 'ranking'));
  const { drawnRequesting } = useSelector(selectState('bingodrawns', 'drawn'));
  const createPayout = useActions(bingopayoutCreateAction);
  const generateRankingAction = useActions(rankingCreateAction);
  const getRankingByBingoId = useActions(bingopayoutRankingAction);
  const createBingoDrawn = useActions(bingodrawnCreateAction);
  const [visibleDranw, setVisibleDranw] = useState(false);
  const [visibleFinish, setVisibleFinish] = useState(false);
  const [loading, setloading] = useState(false);
  const [loadingDrawn, setLoadingDrawn] = useState(false);

  const { bingo } = ranking;

  /* Randon Functions not used any more */
  // const [drawnNumbers, setDrawnNumbers] = useState([]);
  // const getRandomIntInclusive = (minimum, maximum) => {
  //   const min = Math.ceil(minimum);
  //   const max = Math.floor(maximum);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };
  // const drawnOne = () => {
  //   const num = getRandomIntInclusive(0, 99);
  //   setDrawnNumbers((previewState) => ([...previewState, num]));
  // };
  // const showTag = (number, key) => {
  //   if (!number) return null;
  //   return (
  //     <Tag color="red" key={key} className="bingoStyle">
  //       {(`00${number}`).slice(-2)}
  //     </Tag>
  //   );
  // };

  const onSuccessGenerateRanking = (bingoId) => {
    // setDrawnNumbers([]);
    setVisibleDranw(false);
    getRankingByBingoId(
      bingoId,
      {
        onSuccess: () => setLoadingDrawn(false),
        onFailure: () => setLoadingDrawn(false),
      },
    );
  };

  const onSuccessDrawn = (bingoId) => {
    generateRankingAction(
      bingoId,
      {
        onSuccess: () => onSuccessGenerateRanking(bingoId),
        onFailure: () => setLoadingDrawn(false),
      },
    );
  };

  const OnFinishDrawn = (values) => {
    setLoadingDrawn(true);
    const { numbers } = values;
    createBingoDrawn({
      bingo,
      numbers,
      onSuccess: () => onSuccessDrawn(bingo.id),
      onFailure: () => setLoadingDrawn(false),
    });
  };

  const finishedSuccess = () => {
    message.success('Bolão 10 dezenas Finalizado, Ganhadores pagos!');
    setVisibleFinish(false);
    setloading(false);
  };

  const finishGame = () => {
    const { bingo } = ranking;
    setloading(true);
    createPayout({
      bingo,
      onSuccess: () => finishedSuccess(),
    });
  };

  const makeBet = useActions(bingobetCreateAction);
  const [betInfos, setBetInfos] = useState({});
  const [loadingCreateBet, setLoadingCreateBet] = useState(false);
  const handleBet = ({ numbers }) => {
    setLoadingCreateBet(true);
    makeBet({
      numbers,
      ...betInfos,
      onSuccess: () => {
        onSuccessDrawn(betInfos.bingo.id);
        setBetInfos({});
        setLoadingCreateBet(false);
      },
      onFailure: () => {
        setLoadingCreateBet(false);
      },
    });
  };

  return (
    <Layout>
      <Row justify="start">
        <ArrowLeftOutlined onClick={() => handleBack()} style={{ fontSize: 35 }} />
      </Row>
      <OnLoadSpin loading={rankingRequesting || loading}>
        <Row justify="center">
          <Title>
            {(!bingo)
              ? 'Loading...'
              : `Jogo #${bingo.sequency}`
            }
          </Title>
        </Row>
        <BingoInfos bingo={bingo} />
        <Row justify="space-between">
          <Col span={11}>
            <Button
              type="primary"
              onClick={() => setVisibleDranw(true)}
              block
              disabled={bingo.status === 'FINISHED'}
            >
              Gerar sorteio
            </Button>
          </Col>
          <Col span={11}>
            <Button type="primary" onClick={() => setVisibleFinish(true)} block>
              {bingo.status === 'FINISHED' ? 'Ver Ganhadores' : 'Fechar Jogo e Pagar ganhadores'}
            </Button>
          </Col>
        </Row>
        <TableDrawns
          requesting={rankingRequesting}
          drawns={(!ranking.drawns) ? [] : ranking.drawns}
          dateDrawn={bingo.expectedClosingDate}
        />
        <TableBets
          dataSource={(!ranking.bets) ? [] : ranking.bets}
          loading={rankingRequesting}
          handleMakeBet={() => setBetInfos({ bingo })}
          showButtonBet={bingo?.status === 'OPENED' && bingo?.drawnQuantity <= 0}
        />
        <Modal visible={visibleDranw} footer={null} onCancel={() => setVisibleDranw(false)}>
          <OnLoadSpin loading={loadingDrawn || drawnRequesting}>
            {/* Commited button generete randon numbers */}
            {/*
            <Title>{`Sorteio do Jogo #${bingo.sequency}`}</Title>
            <Row style={{ marginBottom: 19 }}>
              {bingo.status !== 'FINISHED' ? null :
                (<Title>Jogo já finalizado</Title>)
              }
              {!drawnNumbers[0] ? null : drawnNumbers.map((e, i) => showTag(e, i))}
            </Row>
            <Row justify="space-around">
              <Button
                type="primary"
                onClick={drawnOne}
                disabled={drawnNumbers.length >= 10 || bingo.status === 'FINISHED'}
              >
                Sortear um Número
              </Button>
              <Button
                type="primary"
                onClick={OnFinishDrawn}
                disabled={drawnNumbers.length === 0 || bingo.status === 'FINISHED'}
              >
                Finalizar sorteio
              </Button>
            </Row>
            */}
            <EnterNumbers
              handleSubmit={OnFinishDrawn}
              gameSequency={bingo.sequency}
              bingoStatus={bingo.status}
              loading={drawnRequesting || rankingRequesting}
            />
          </OnLoadSpin>
        </Modal>
        <ModalChooseUser
          visible={(betInfos.bingo && !betInfos.user)}
          title={(<Title>Escolha o Usuário</Title>)}
          handleSubmit={(user) => setBetInfos({ bingo, user })}
          handleCancel={() => setBetInfos({})}
          betValue={bingo?.betPrice}
        />
        <ModalCreateBet
          visible={!(!betInfos.user)}
          title={(<Title>Apostar</Title>)}
          handleSubmit={handleBet}
          handleCancel={() => setBetInfos({})}
          loading={loadingCreateBet}
        />
        <Modal visible={visibleFinish} footer={null} onCancel={() => setVisibleFinish(false)}>
          {(!ranking.winners) ? null : (
            <Payout
              winners={ranking.winners}
              requesting={rankingRequesting}
              onFinished={finishGame}
              bingoFinished={bingo.status === 'FINISHED'}
            />
          )}
        </Modal>
      </OnLoadSpin>
    </Layout>
  );
};

Ranking.propTypes = {
  handleBack: PropTypes.func.isRequired,
};

export default Ranking;
