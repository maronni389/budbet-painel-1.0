import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectState } from '@redux';
import OnLoadSpin from 'components/OnLoadSpin';

const FormRule = ({ onSubmit, gameName }) => {
  const [formRuleFields] = Form.useForm();
  const { rule, ruleRequesting } = useSelector(selectState('rules', 'rule'));
  const [rulesQty, setRulesQty] = useState(1);

  useEffect(() => {
    if (gameName !== '') {
      formRuleFields.setFieldsValue({ ...rule });
      if (rule.rule5 !== '') {
        setRulesQty(5);
      } else if (rule.rule4 !== '') {
        setRulesQty(4);
      } else if (rule.rule3 !== '') {
        setRulesQty(3);
      } else if (rule.rule2 !== '') {
        setRulesQty(2);
      }
    }
  }, [gameName]);

  const onAdd = () => {
    setRulesQty((previewState) => (previewState + 1));
  };

  return (
    <OnLoadSpin loading={ruleRequesting}>
      <Form
        layout="vertical"
        name="criar jogo"
        onFinish={onSubmit}
        form={formRuleFields}
      >
        <Form.Item
          name="game"
          label="Jogo:"
          hasFeedback
          initialValue={gameName}
          rules={[
            {
              required: true,
              message: 'Por favor escolha o Jogo',
            },
          ]}
        >
          <Input disabled={gameName === 'BOLÃO 10 DEZENAS'} defaultValue={gameName} />
        </Form.Item>
        <Form.Item
          name="rule1"
          label="Regra (1º Paragrafo):"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor digite alguma Regra',
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="rule2"
          label="Regra (2º Paragrafo):"
          hasFeedback
          hidden={rulesQty < 2 && !rule.rule2}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="rule3"
          label="Regra (3º Paragrafo):"
          hasFeedback
          hidden={rulesQty < 3 && !rule.rule3}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="rule4"
          label="Regra (4º Paragrafo):"
          hasFeedback
          hidden={rulesQty < 4 && !rule.rule4}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="rule5"
          label="Regra (5º Paragrafo):"
          hasFeedback
          hidden={rulesQty < 5 && !rule.rule5}
        >
          <Input.TextArea />
        </Form.Item>
        { (rulesQty >= 5 || rule.rule5 !== '') ? null : (
          <Button
            type="primary"
            icon={(
              <PlusCircleOutlined
                style={{ position: 'absolute', top: '2px', right: '4px', fontSize: 22 }}
              />
            )}
            onClick={() => onAdd()}
            style={{ margin: '10px', justifyContent: 'center', alignItems: 'center' }}
          />
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            { (gameName !== rule.game) ? 'Cadastrar Regra do Jogo' : 'Salvar Regra do Jogo' }
          </Button>
        </Form.Item>
      </Form>
    </OnLoadSpin>
  );
};

FormRule.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  gameName: PropTypes.string,
};

FormRule.defaultProps = {
  gameName: '',
};

export default FormRule;
