import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import { useActions } from '@redux';
import { sendRecoverEmailAction } from '@redux/auth/actions';


const Forgot = ({ backToLogin }) => {
  const sendRecoverEmail = useActions(sendRecoverEmailAction);
  const onSuccessFinish = () => {
    message.success('Email enviado com sucesso!');
    backToLogin();
  };

  const onFinish = (values) => {
    sendRecoverEmail({
      email: values.email,
      onSuccess: () => onSuccessFinish(),
    });
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <Form
      layout="vertical"
      name="Forgot"
      id="formDark"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: 'Por favor preencha um email válido', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Enviar Email
        </Button>
      </Form.Item>
    </Form>
  );

};


Forgot.propTypes = {
  backToLogin: PropTypes.func.isRequired,
};

// Forgot.defaultProps = {
//   visible: false,
// };

export default Forgot;
