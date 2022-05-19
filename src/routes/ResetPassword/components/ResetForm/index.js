import React from 'react';
import {
  Form,
  Input,
  message,
  Button,
} from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useActions } from '@redux';
import { resetPasswordAction } from '@redux/auth/actions';

const ResetForm = () => {
  const location = useLocation();
  const history = useHistory();

  const resetPasswort = useActions(resetPasswordAction);

  const onSuccessFinish = () => {
    message.success('Senha Alterada com Sucesso. Faça Login agora!');
    history.push('/');
  };

  const onFinish = (values) => {
    const parsed = queryString.parse(location.search);
    resetPasswort({
      ...values,
      ...parsed,
      onSuccess: () => onSuccessFinish(),
    });
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };


  return (
    <Form
      layout="vertical"
      id="formDark"
      name="resetform"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="password"
        label="Senha"
        maxLength={20}
        rules={[
          {
            required: true,
            message: 'Por favor preencha uma senha de no mínimo 6 caracteres.',
            whitespace: true,
            max: 20,
            min: 6,
          },
        ]}
        hasFeedback
      >
        <Input.Password maxLength={20} />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Repita a Senha"
        maxLength={20}
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Confirme a senha',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject('Senha de confirmação não corresponde');
            },
          }),
        ]}
      >
        <Input.Password maxLength={20} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Salvar Senha
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetForm;
