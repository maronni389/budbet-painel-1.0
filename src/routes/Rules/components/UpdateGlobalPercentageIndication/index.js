import React, { useEffect, useCallback } from 'react';
import { Button, Form, InputNumber, Row, message } from 'antd';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { PERCENTUAL_INDICACAO, globalsReadAction, globalsUpdateAction } from '@redux/globals/actions';
import OnLoadSpin from 'components/OnLoadSpin';

const UpdateGlobalPercentageIndication = () => {
  const readGlobal = useActions(globalsReadAction);
  useEffect(() => {
    readGlobal(PERCENTUAL_INDICACAO);
  }, [readGlobal]);

  const { global, globalRequesting } = useSelector(selectState('globals', 'global'));
  const updateGlobal = useActions(globalsUpdateAction);

  const onSubmit = useCallback(async ({ value }) => {
    try {
      await updateGlobal(PERCENTUAL_INDICACAO, { value });
      readGlobal(PERCENTUAL_INDICACAO);
    } catch (error) {
      message.error(error.toString());
    }
  }, [updateGlobal, readGlobal]);


  return (
    <OnLoadSpin loading={globalRequesting}>
      <Form
        layout="vertical"
        name="criar jogo"
        onFinish={onSubmit}
      >
        <Row justify="start" align="bottom">
          <Form.Item
            name="value"
            label="Porcentagem de Indicação"
            hasFeedback
            initialValue={Number(global?.value || 0)}
            rules={[
              {
                required: true,
                message: 'Por favor defina uma porcentagem para indicação',
              },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar Porcentagem
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </OnLoadSpin>
  );
};

export default UpdateGlobalPercentageIndication;
