import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Space, Modal, message, Row } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { bingoListAction, bingoUpdateAction, bingoDeleteAction } from '@redux/bingo/actions';
import { bingopayoutRankingAction, bingoRankingClearAction } from '@redux/bingopayout/actions.js';

import TableGames from './components/TableGames';
import NewBingo from './components/NewBingo';
import Ranking from './components/Ranking';

moment.locale('pt-BR');
const { Title } = Typography;

const Games = () => {
  const history = useHistory();
  const { bingos, bingosRequesting } = useSelector(selectState('bingo', 'bingos'));
  const getBingoList = useActions(bingoListAction);
  const updateBingoAction = useActions(bingoUpdateAction);
  const deleteBingoAction = useActions(bingoDeleteAction);
  const [bingoId, setBingoId] = useState('');
  const [showRanking, setShowRanking] = useState(false);
  const getRankingByBingoId = useActions(bingopayoutRankingAction);
  const clearRanking = useActions(bingoRankingClearAction);

  useEffect(() => {
    getBingoList();
  }, []);

  const onFinishEdit = () => {
    getBingoList();
    setBingoId('');
  };

  const editGame = (id) => setBingoId(id);

  const changeStatus = (values) => {
    const now = moment().format('x');
    let { status, closingDate } = values;

    if (+values.expectedClosingDate < +now) {
      message.error('Data prevista para fechamento já aconteceu. Edite o jogo para mudar a data');
    }
    if (+values.openingDate > +now) {
      message.error('Data prevista para abertura do jogo Ainda não chegou. Edite o jogo para mudar a data');
    }

    if (status === 'FINISHED') {
      message.error('Não é possivel alterar o status de um Jogo Finalizado');
    } else if (status === 'OPENED') {
      status = 'CLOSED';
      closingDate = now;
      message.success('Fechando Apostas!');
    } else {
      status = 'OPENED';
      closingDate = values.expectedClosingDate;
      message.success('Abrindo Apostas!');
    }

    updateBingoAction(values.id, {
      closingDate,
      status,
      onSuccess: () => getBingoList(),
    });
  };

  const deleteGame = (id) => deleteBingoAction(id, { onSuccess: () => getBingoList() });

  const getRanking = (bingoId) => {
    getRankingByBingoId(
      bingoId,
      { onSuccess: () => setShowRanking(true) },
    );
  };
  const hideRanking = () => {
    clearRanking();
    getBingoList();
    setShowRanking(false);
  };

  if (showRanking) return <Ranking handleBack={hideRanking} />;

  return (
    <Layout>
      <Title>Jogos</Title>
      <Row>
        <Space>
          <Button type="primary" onClick={() => history.push('/bolao')}>Novo Jogo Bolão 10 Dezenas</Button>
          <Button type="primary" onClick={() => history.push('/regras')}>Editar Regras Bolão 10 Dezenas</Button>
        </Space>
      </Row>
      <TableGames
        loading={bingosRequesting}
        dataSource={Object.values(bingos)}
        handleEdit={editGame}
        handleChangeStatus={changeStatus}
        handleDelete={deleteGame}
        openRanking={getRanking}
      />
      <Modal
        footer={null}
        visible={bingoId !== ''}
        onCancel={() => setBingoId('')}
      >
        <NewBingo
          bingoId={bingoId}
          onSuccess={onFinishEdit}
        />
      </Modal>
    </Layout>
  );
};

export default Games;
