import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  message,
  Spin,
} from 'antd';
import CurrencyInput from 'react-currency-input';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { userReadAction } from '@redux/users/actions';
import { transactionCreateAction } from '@redux/transactions/actions';

const NewTransaction = ({ userId, transactionType, closeFunction }) => {

  const { user } = useSelector(selectState('users', 'user'));
  const getUser = useActions(userReadAction);
  const [value, setValue] = useState(0);
  const sendTransaction = useActions(transactionCreateAction);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId && userId !== '') {
      getUser(userId);
    }
  }, [userId]);


  const onClose = () => {
    setValue(0);
    setLoading(false);
    closeFunction();
  };

  const createTransaction = ({ description }) => {
    if (!user.id && (transactionType !== 'Deposito' || transactionType !== 'Saque')) {
      message.error('Erro! usuário ou transação inválida!');
    } else {
      setLoading(true);
      sendTransaction({
        transactionType,
        user: { id: userId },
        value,
        description,
        status: 'approved',
        balance: true,
        onSuccess: () => {
          message.success('Transação realizada com sucesso');
          onClose();
        },
        onFailure: () => {
          message.success('Erro na transação!');
          setLoading(false);
        },
      });
    }
  };

  return (
    <Modal
      visible={(userId !== '')}
      title={`Criar ${transactionType.toLowerCase()} para ${user?.nickname}`}
      onCancel={onClose}
      closable
      footer={null}
      zIndex={500}
    >
      <Spin tip="Loading..." spinning={loading}>
        <Form onFinish={createTransaction} layout="vertical">
          <Form.Item
            name="value"
            label={`Valor que deseja ${transactionType.toLowerCase()}`}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha o valor',
              },
              () => ({
                validator() {
                  if (value <= 0) {
                    return Promise.reject(new Error('Valor deve ser maior que zero'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <CurrencyInput
              onChangeEvent={(a, b, floatvalue) => setValue(Math.round(floatvalue * 100))}
              className="ant-input"
              prefix="R$ "
              decimalSeparator=","
              thousandSeparator="."
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha uma descrição',
              },
            ]}
          >
            <Input.TextArea
              placeholder={`${transactionType} feito no sistema pelo administrador`}
              autoSize={{ maxRows: 5 }}
              maxLength={200}
            />
          </Form.Item>
          <Form.Item>
            <Row gutter={[12, 12]}>
              <Col sm={24} md={12}>
                <Button block onClick={() => onClose()}>
                  Cancelar
                </Button>
              </Col>
              <Col sm={24} md={12}>
                <Button type="primary" htmlType="submit" block>
                  Criar
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

NewTransaction.propTypes = {
  userId: PropTypes.string.isRequired,
  transactionType: PropTypes.oneOf(['Deposito', 'Saque']).isRequired,
  closeFunction: PropTypes.func.isRequired,
};

// NewTransaction.defaultProps = {
//   closeFunction: () => {},
// };

export default NewTransaction;
