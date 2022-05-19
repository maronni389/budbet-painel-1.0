import React, { useEffect, useState } from 'react';
import { Layout, message, Spin, Typography } from 'antd';
// import { PlusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import {
  ruleCreateAction,
  ruleReadByGameAction,
  ruleUpdateAction,
  ruleListAction,
} from '@redux/rules/actions';
import SelectRule from './components/SelectRule';
import FormRule from './components/FormRule';
import UpdateGlobalPercentageIndication from './components/UpdateGlobalPercentageIndication';
// import UploadButton from './components/UploadButton';


const Rules = () => {
  const { rule, ruleRequesting } = useSelector(selectState('rules', 'rule'));
  const createRule = useActions(ruleCreateAction);
  const readRule = useActions(ruleReadByGameAction);
  const updateRule = useActions(ruleUpdateAction);
  const listRule = useActions(ruleListAction);
  const [selectedGame, setSelectedGame] = useState('BOLÃO 10 DEZENAS');

  useEffect(() => {
    listRule();
  }, []);

  const changeRule = (value) => {
    readRule(value);
  };

  useEffect(() => {
    changeRule(selectedGame);
  }, [selectedGame]);

  const onSuccess = (gameName) => {
    message.success('Sucesso!!');
    listRule();
    setSelectedGame(gameName);
  };

  const addRule = (values) => {
    if (selectedGame !== rule.game) {
      createRule({
        ...values,
        onSuccess: () => onSuccess(values.game),
      });
      // never is gona do that
      // button is commited for the future
    } else {
      updateRule(rule.id, {
        ...values,
        onSuccess: () => onSuccess(values.game),
      });
    }
  };

  return (
    <Layout>
      {/* <Typography.Title style={{ textAlign: 'left' }}>
        Regras e termos de Uso
      </Typography.Title>
      <UploadButton />
      <Layout style={{ height: '50px' }} /> */}
      {/* Endpoint de upload de termos removido devido a cloudinary nao aceitar PDF */}

      {selectedGame === 'BOLÃO 10 DEZENAS' && (
        <div>
          <Typography.Title className="text-left">
            Editar Porcentagem Afiliados
          </Typography.Title>
          <UpdateGlobalPercentageIndication />
          <Layout style={{ height: '50px' }} />
        </div>
      )}


      <SelectRule handleChange={changeRule} defaultGame={selectedGame} />
      {/*
      <Button
        type="primary"
        text="Adicionar nova Regra"
        icon={<PlusCircleOutlined />}
        onClick={() => setSelectedGame('')}
      />
      */}
      {ruleRequesting ? <Spin tip="Loading..." /> : <FormRule onSubmit={addRule} gameName={selectedGame} />}
    </Layout>
  );
};

export default Rules;
