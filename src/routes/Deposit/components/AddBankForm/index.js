import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  message,
  Form,
  Input,
  Button,
  Select,
  Typography,
  Row,
} from 'antd';
import MaskedInput from 'antd-mask-input';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { bankAdminCreateAction, bankUpdateAction } from '@redux/banks/actions';
import { brazilianbanksListAction } from '@redux/brasilianbanks/actions';
import OnLoadSpin from 'components/OnLoadSpin';

const { Option } = Select;
const { Text, Link } = Typography;

const AddBank = ({ idBank }) => {

  const formRef = useRef(null);
  const { bankRequesting } = useSelector(selectState('banks', 'bank'));
  const { banksAdmin } = useSelector(selectState('banks', 'banksAdmin'));
  const createAdminBank = useActions(bankAdminCreateAction);
  const updateAdminBank = useActions(bankUpdateAction);
  const history = useHistory();
  const { bankList, bankListRequesting } = useSelector(selectState('brazilianbanks', 'bankList'));
  const getBankList = useActions(brazilianbanksListAction);
  const [accountType, setAccountType] = useState('');

  useEffect(() => {
    getBankList();
  }, []);

  useEffect(() => {
    if (idBank !== '') {
      formRef.current.setFieldsValue(
        Object.values(banksAdmin).filter((e) => e.id === idBank)[0],
      );
    }
  }, [idBank]);

  const onSuccessCreate = () => {
    message.success('Banco cadastrado com sucesso');
    history.push('/startpage');
    history.push('/depositar');
  };
  const onSuccessUpdate = () => {
    message.success('Banco Editado com sucesso');
    history.push('/startpage');
    history.push('/depositar');
  };

  const onFinish = (values) => {

    // if idBank is blank create Admin
    if (idBank === '') {
      createAdminBank({
        ...values,
        onSuccess: () => onSuccessCreate(),
      });
    } else {
      updateAdminBank(idBank, {
        ...values,
        onSuccess: () => onSuccessUpdate(),
      });
    }

  };


  return (
    <Layout>
      <OnLoadSpin loading={bankRequesting}>
        <Form
          layout="vertical"
          name="saque"
          onFinish={onFinish}
          ref={formRef}
        >
          <Form.Item
            name="name"
            label="Nome Completo"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha o Nome completo',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha o CPF',
              },
              () => ({
                validator(_, value) {
                  if (value.indexOf('_') > -1) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Por favor preencha o CPF completo');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <MaskedInput mask="111.111.111-11" name="cpf" size="14" />
          </Form.Item>
          <OnLoadSpin loading={bankListRequesting}>
            <Form.Item
              name="bank"
              label={(
                <Row align="middle">
                  <Text style={{ marginRight: 15 }}>Banco</Text>
                  <Link
                    style={{ fontSize: '0.7em', textDecoration: 'underline' }}
                    onClick={() => history.push('/bancosbrasileiros')}
                  >
                    Lista de bancos
                  </Link>
                </Row>
              )}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Por favor Selecione um banco',
                },
              ]}
            >
              <Select showSearch>
                { (!bankList[0])
                  ? null
                  : (
                    Object.values(bankList).map(d => (
                      <Option key={d.id} value={`${d.value} - ${d.label}`}>
                        {`${d.value} - ${d.label}`}
                      </Option>
                    ))
                  )
                }
              </Select>
            </Form.Item>
          </OnLoadSpin>
          <Form.Item
            name="accountType"
            label="Tipo de Conta"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor Selecione o tipo de conta',
              },
            ]}
          >
            <Select showSearch onChange={setAccountType}>
              <Option key="Conta Corrente">Conta Corrente</Option>
              <Option key="Conta Poupança">Conta Poupança</Option>
              <Option key="PIX">PIX</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="agency"
            label={accountType === 'PIX' ? 'Chave do tipo' : 'Agencia'}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha a agencia',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="accountNumber"
            label={accountType === 'PIX' ? 'Chave' : 'Conta'}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha a conta',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              { (idBank === '') ? 'Cadastrar Banco' : 'Salvar Banco' }
            </Button>
          </Form.Item>

        </Form>
      </OnLoadSpin>
    </Layout>
  );
};

AddBank.propTypes = {
  idBank: PropTypes.string.isRequired,
};

export default AddBank;
