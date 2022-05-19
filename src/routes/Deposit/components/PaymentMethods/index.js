import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { banksAdminListAction } from '@redux/banks/actions';
import {
  Typography,
  Form,
  Tabs,
  Select,
  Button,
} from 'antd';
import OnLoadSpin from 'components/OnLoadSpin';

const { TabPane } = Tabs;
const { Option } = Select;
const { Paragraph, Text } = Typography;

const PaymentMethods = ({ getIdBank }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      xl: { span: 4 },
      lg: { span: 6 },
      md: { span: 6 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xl: { span: 18 },
      lg: { span: 17 },
      md: { span: 18 },
      sm: { span: 16 },
    },
  };
  const tailLayout = {
    wrapperCol: {
      xl: { span: 18, offset: 4 },
      lg: { span: 17, offset: 6 },
      md: { span: 18, offset: 6 },
      sm: { span: 16, offset: 8 },
      xs: { span: 24, offset: 0 },
    },
  };

  const getBanks = useActions(banksAdminListAction);
  const { banksAdmin, banksAdminRequesting } = useSelector(selectState('banks', 'banksAdmin'));
  const [filteredBanks, setFilteredBanks] = useState([]);
  const enumTransactionType = {
    Transferencia: 'Transferencia',
    Deposito: 'Deposito',
    PIX: 'PIX',
  };
  const [transactionType, setTransactionType] = useState();

  useEffect(() => {
    if (form && !!form?.setFields) {
      if (transactionType) {
        form.setFields([{ name: 'transactionType', value: transactionType, touched: true }]);
      }
      if (filteredBanks[0]) {
        form.setFields([{ name: 'bank', value: filteredBanks[0].id, touched: true }]);
      }
    }
  }, [transactionType, filteredBanks]);

  // elements functions
  const isPix = (element) => (
    element.accountType === enumTransactionType.PIX
  );
  const isNotPix = (element) => (
    element.accountType !== enumTransactionType.PIX
  );
  const bankInformationCopy = (element) => {

    if (!isPix(element)) {
      const obs = (element.obs !== '') ? (`Obs: ${element.obs}`) : '';
      return (
        `${element.bank} \nAgência: ${element.agency} \n` +
        `${element.accountType}: ${element.accountNumber} \n` +
        `Titular: ${element.name} \nCPF: ${element.cpf} \n${obs}`
      );
    }
    if (isPix(element)) return `${element.accountNumber}`;
    return null;
  };
  const bankInformationShow = (element) => {
    if (!element.accountType) {
      return (
        <Paragraph strong>
          Desculpe!
          <br />
          Não temos opções no momento para essa forma de Pagamento.
          <br />
          Por favor selecione outra forma de pagamento.
        </Paragraph>
      );
    }
    if (!isPix(element)) {
      return (
        <Paragraph
          strong
          copyable={{
            text: bankInformationCopy(element),
            tooltips: ['Copiar informações', 'Copiado'],
          }}
        >
          {`Agência: ${element.agency} - ${element.accountType}: ${element.accountNumber}`}
          <br />
          {`Titular: ${element.name} - CPF: ${element.cpf}`}
          {(element.obs !== '') ? <br /> : ''}
          {(element.obs !== '') ? (` Obs: ${element.obs}`) : ''}
        </Paragraph>
      );
    }
    return (
      <Paragraph
        strong
        copyable={{
          text: bankInformationCopy(element),
          tooltips: ['Copiar informações', 'Copiado'],
        }}
      >
        {`Chave do tipo ${element.agency} - Chave: ${element.accountNumber}`}
        <br />
        {`Titular: ${element.name}`}
        {(element.obs !== '') ? <br /> : ''}
        {(element.obs !== '') ? (` Obs: ${element.obs}`) : ''}
      </Paragraph>
    );
  };

  // Get Banks parameters from API
  useEffect(() => {
    getBanks();
  }, []);

  const hasBanksToMakeDeposit = (banks) => !!banks?.length && banks.filter(isNotPix).length > 0;
  const hasBanksToMakePix = (banks) => !!banks?.length && banks.filter(isPix).length > 0;

  useEffect(() => {
    if (!Object.values(banksAdmin)?.length) {
      // do nothing
    } else if (hasBanksToMakeDeposit(Object.values(banksAdmin))) {
      setFilteredBanks(Object.values(banksAdmin).filter(isNotPix));
      setTransactionType(enumTransactionType.Transferencia);
    } else if (hasBanksToMakePix(Object.values(banksAdmin))) {
      setFilteredBanks(Object.values(banksAdmin).filter(isPix));
      setTransactionType(enumTransactionType.PIX);
    } else {
      setFilteredBanks([]);
    }
  }, [banksAdmin]);

  // Changing UI
  const handleChangeType = (transactionType) => {

    setTransactionType(transactionType);

    const array = Object.values(banksAdmin);
    if (transactionType === 'PIX') {
      setFilteredBanks(array.filter(isPix));
    } else {
      setFilteredBanks(array.filter(isNotPix));
    }
  };

  const tabsBanks = () => {
    if (filteredBanks.length <= 0) {
      return (bankInformationShow({}));
    }

    const prazo = transactionType === 'Deposito' ? '2 dias úteis' : '1 dia útil';
    return (
      <Tabs
        type="card"
        className="depositmenu"
        defaultActiveKey={!filteredBanks[0] ? undefined : filteredBanks[0].id}
      >
        {filteredBanks.map(element => (
          <TabPane tab={element.bank} key={element.id}>
            {bankInformationShow(element)}
            <Text>
              O valor só será creditado na sua conta ao ser confirmado pelo banco de destino.
              <br />
              {`Estimativa de aprovação em até ${prazo}`}
            </Text>
          </TabPane>
        ))}
      </Tabs>
    );
  };

  const onFinish = (values) => {
    getIdBank(values.bank);
  };


  if (!Object.values(banksAdmin).length) {
    return (
      <Text strong>
        Ops!!
        Não conseguimos carregar as opções de forma de Pagamento.
        Por favor tente mais tarde ou entre em contato conosco.
      </Text>
    );
  }
  return (
    <OnLoadSpin loading={banksAdminRequesting}>
      <Form
        {...layout}
        name="saque"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="transactionType"
          label="Forma de pagamento"
          rules={[{ required: true, message: 'Por favor escolha uma forma de pagamento' }]}
        >
          <Select onChange={handleChangeType} value={transactionType}>
            <Option
              value={enumTransactionType.Transferencia}
              disabled={!hasBanksToMakeDeposit(Object.values(banksAdmin))}
            >
              Transferência
            </Option>
            <Option
              value={enumTransactionType.Deposito}
              disabled={!hasBanksToMakeDeposit(Object.values(banksAdmin))}
            >
              Depósito
            </Option>
            <Option
              value={enumTransactionType.PIX}
              disabled={!hasBanksToMakePix(Object.values(banksAdmin))}
            >
              Pix
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="bank"
          label="Banco"
          rules={[{ required: true, message: 'Por favor escolha um Banco' }]}
        >
          {tabsBanks()}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" block>
            Editar Banco
          </Button>
        </Form.Item>

      </Form>
    </OnLoadSpin>
  );
};

PaymentMethods.propTypes = {
  getIdBank: PropTypes.func.isRequired,
};

export default PaymentMethods;
