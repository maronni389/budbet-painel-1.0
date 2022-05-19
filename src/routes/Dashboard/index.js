import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import CardButton from 'components/CardButton';
import {
  balanceAction,
  listBingoOpenedAction,
  listBingoClosedAction,
} from '@redux/balance/actions';

const Dashboard = () => {
  const { balance, balanceRequesting } = useSelector(selectState('balance', 'balance'));
  const getbalance = useActions(balanceAction);
  const { bingoOpened, bingoOpenedRequesting } = useSelector(selectState('balance', 'bingoOpened'));
  const listBingoOpened = useActions(listBingoOpenedAction);
  const { bingoClosed, bingoClosedRequesting } = useSelector(selectState('balance', 'bingoClosed'));
  const listBingoClosed = useActions(listBingoClosedAction);
  const history = useHistory();

  useEffect(() => {
    getbalance();
    listBingoOpened();
    listBingoClosed();
  }, []);

  return (
    <Layout>
      <Row gutter={[12, 12]}>
        <Col className="gutter-row" xs={24} sm={12} lg={12}>
          <CardButton
            value={(!balance.withdrawPending) ? 0 : -balance.withdrawPending.sumValues}
            onLoad={balanceRequesting}
            text="Total de Saques Pendentes:"
            icon="clock"
            onClick={() => history.push('/extrato')}
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={12} lg={12}>
          <CardButton
            value={(!balance.withdrawPending) ? 0 : balance.withdrawPending.qtyValues}
            onLoad={balanceRequesting}
            text="Quantidade Saques Pendentes:"
            icon="clock"
            noMoney
            onClick={() => history.push('/extrato')}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col className="gutter-row" xs={24} sm={12} lg={12}>
          <CardButton
            value={(!balance.depositPending) ? 0 : balance.depositPending.sumValues}
            onLoad={balanceRequesting}
            text="Total de Depositos Pendentes:"
            icon="clock"
            onClick={() => history.push('/extrato')}
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={12} lg={12}>
          <CardButton
            value={(!balance.depositPending) ? 0 : balance.depositPending.qtyValues}
            onLoad={balanceRequesting}
            text="Quantidade Depositos Pendentes:"
            icon="clock"
            noMoney
            onClick={() => history.push('/extrato')}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col className="gutter-row" xs={24} sm={12} lg={12}>
          <CardButton
            value={(!bingoOpened) ? 0 : bingoOpened.total}
            onLoad={bingoOpenedRequesting}
            text="Bolões Abertos para apostas:"
            icon="bets"
            noMoney
            onClick={() => history.push('/jogos')}
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={12} lg={12}>
          <CardButton
            value={(!bingoClosed) ? 0 : bingoClosed.total}
            onLoad={bingoClosedRequesting}
            text="Bolões fechados à Sortear:"
            icon="bets"
            noMoney
            onClick={() => history.push('/jogos')}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Dashboard;
