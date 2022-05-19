import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox, message, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { useActions } from '@redux';
import { loginAction } from '@redux/auth/actions';


const Login = ({ handdleForgotPassword }) => {
  const login = useActions(loginAction);
  const history = useHistory();

  const onFinish = (values) => {
    login({
      email: values.email,
      password: values.password,
      onSuccess: () => history.push('/dashboard'),
    });
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <Form
      layout="vertical"
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="E-mail:"
        name="email"
        rules={[{ required: true, message: 'Por favor preencha um email válido', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Senha:"
        name="password"
        rules={[{ required: true, message: 'Por favor preencha a senha' }]}
      >
        <Input.Password />
      </Form.Item>

      <Row justify="start">
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Lembre de mim</Checkbox>
        </Form.Item>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Entrar
        </Button>
      </Form.Item>
      <Button type="link" onClick={handdleForgotPassword}>Esqueci a Senha</Button>
    </Form>
  );

};

Login.propTypes = {
  handdleForgotPassword: PropTypes.func.isRequired,
};

export default Login;
