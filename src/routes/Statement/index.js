import React, { useEffect, useState } from 'react';
import {
  Layout,
  Row,
  Typography,
  Modal,
  Button,
  Input,
  Form,
  Select,
  message,
} from 'antd';
import CurrencyInput from 'react-currency-input';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { transactionListAction, transactionUpdateAction } from '@redux/transactions/actions';
import TableStatement from './components/TableStatement';

const { Title, Text } = Typography;

const Statement = () => {
  const { transactionRequesting } = useSelector(selectState('transactions', 'transaction'));
  const getTransactions = useActions(transactionListAction);
  const updateTransaction = useActions(transactionUpdateAction);
  const [value, setValue] = useState(0);
  const [approval, setApproval] = useState(false);

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();


  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);


  const handleApprovalPop = (row) => {
    setApproval(true);
    form.setFieldsValue({
      id: row.id,
      transactionType: row.transactionType,
      value: (row.value / 100),
      description: row.description,
      status: 'approved',
    });
    setValue(row.value);
    setVisible(true);
  };
  const handleDeniedPop = (row) => {
    setApproval(false);
    form.setFieldsValue({
      id: row.id,
      transactionType: row.transactionType,
      value: 0,
      description: row.description,
      status: 'denied',
    });
    setVisible(true);
  };

  const onSuccessUpdate = () => {
    setVisible(false);
    message.success('Transação atualizada com sucesso');
    setValue(0);
    getTransactions();
  };

  const onFinishForm = (values) => {
    const {
      id,
      transactionType,
      description,
      status,
    } = values;
    let valueField = value;
    if (transactionType === 'Saque' || transactionType === 'Aposta') {
      valueField = (value <= 0) ? parseInt(value) : parseInt(-1 * value); // in cents
    } else {
      valueField = (value >= 0) ? parseInt(value) : parseInt(-1 * value); // in cents
    }
    updateTransaction(id, {
      value: valueField,
      transactionType,
      description,
      status,
      balance: true,
      onSuccess: () => onSuccessUpdate(),
    });
  };

  return (
    <Layout>
      <Row>
        <Title>Extrato</Title>
      </Row>
      <TableStatement handleApproval={handleApprovalPop} handleDenied={handleDeniedPop} />
      <Modal
        title={(approval) ? 'Aprovar valor' : 'Editar Descrição sobre negar'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          name="aprovacao"
          onFinish={onFinishForm}
          form={form}
        >
          <Form.Item name="id" hidden rules={[{ required: true }]} />
          <Form.Item name="transactionType" hidden rules={[{ required: true }]} />
          <Form.Item
            name="value"
            label="Valor Real"
            initialValue={0}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha o Valor',
              },
            ]}
            extra={!approval ? (
              <>
                <Text strong> Caso valor diferente de Zero, altere aqui</Text>
                <br />
                O valor descrito aqui será corrigido na transação.
              </>
            ) : ''}
          >
            <CurrencyInput
              onChangeEvent={(a, b, floatvalue) => setValue(Math.round(floatvalue * 100))}
              className="ant-input"
              prefix="R$ "
              decimalSeparator=","
              thousandSeparator="."
              disabled={approval}
              allowNegative
            />
          </Form.Item>
          {/* CurrencyInput On change because value must be integer and number (in cents) */}
          <Form.Item
            name="description"
            label="Descrição"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha a descrição',
              },
            ]}
            extra={!approval ? <Text strong> Descreva o motivo de negar o valor!</Text> : null}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            maxLength={100}
            hidden={approval}
            rules={[
              {
                required: true,
                message: 'Por favor escolha aprovar ou negar',
              },
            ]}
          >
            <Select>
              <Select.Option value="approved">Aprovado</Select.Option>
              <Select.Option value="denied">Negado</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={transactionRequesting} block>
              {approval ? 'APROVAR' : 'Confirmar Edição da transação'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Statement;
