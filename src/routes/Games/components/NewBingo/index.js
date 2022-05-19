import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Typography, Form, InputNumber, DatePicker, Modal, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { PERCENTUAL_INDICACAO, globalsReadAction } from '@redux/globals/actions';
import { bingoCreateAction, bingoUpdateAction } from '@redux/bingo/actions';

moment.locale('pt-BR');
const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const NewBingo = ({ bingoId, onSuccess }) => {
  const history = useHistory();
  const { bingoRequesting } = useSelector(selectState('bingo', 'bingo'));
  const { global, globalRequesting } = useSelector(selectState('globals', 'global'));
  const readGlobal = useActions(globalsReadAction);
  const { bingos } = useSelector(selectState('bingo', 'bingos'));
  const createBingoAction = useActions(bingoCreateAction);
  const updateBingoAction = useActions(bingoUpdateAction);
  const [createBingoForm] = Form.useForm();

  React.useEffect(() => {
    readGlobal(PERCENTUAL_INDICACAO);
  }, [readGlobal]);

  React.useEffect(() => {
    if (bingoId !== '') {
      const data = Object.values(bingos).find(e => e.id === bingoId);
      createBingoForm.setFieldsValue({
        period: [moment(+data.openingDate), moment(+data.expectedClosingDate)],
        betPrice: data.betPrice / 100,
        percentagePrize: data.percentagePrize,
        minimumPrize: data.minimumPrize / 100,
        percentagePrizeFirst: data.percentagePrizeFirst,
        percentagePrizeSecond: data.percentagePrizeSecond,
        percentagePrizeThird: data.percentagePrizeThird,
      });
    }
  }, [bingoId]);


  const handleSuccess = () => {
    onSuccess();
    history.replace('/jogos');
  };

  const createBingo = (values) => {
    createBingoAction({
      ...values,
      onSuccess: () => handleSuccess(),
    });
  };

  const updateBingo = (id, values) => {
    updateBingoAction(id, {
      ...values,
      onSuccess: () => handleSuccess(),
    });
  };

  const createOrUpdateBingo = (values) => {
    if (bingoId === '') {
      createBingo(values);
    } else {
      updateBingo(bingoId, values);
    }
  };

  const [warningPercentagePrize, setWarningPercentagePrize] = React.useState('');

  const onFinish = (values) => {
    const response = {
      openingDate: moment(values.period[0]).valueOf(),
      expectedClosingDate: moment(values.period[1]).valueOf(),
      betPrice: (typeof values.betPrice === 'string')
        ? values.betPrice.replace('R$ ', '').replace(',', '').replaceAll('.', '')
        : values.betPrice * 100,
      minimumPrize: (typeof values.minimumPrize === 'string')
        ? values.minimumPrize.replace('R$ ', '').replace(',', '').replaceAll('.', '')
        : values.minimumPrize * 100,
      percentagePrize: values.percentagePrize,
      percentagePrizeFirst: values.percentagePrizeFirst,
      percentagePrizeSecond: values.percentagePrizeSecond,
      percentagePrizeThird: values.percentagePrizeThird,
    };

    if (
      Number(response.percentagePrize) + Number(global?.value || 0) === 100 ||
      Number(response.percentagePrize) === 0
    ) {

      Modal.confirm({
        title: Number(response.percentagePrize) === 0
          ? 'Com 0% para Porcentagem para o prêmio, o premio será o valor mínimo'
          : `Com o premio sendo ${Number(response.percentagePrize)}% da arrecadação. Não dobrará nada para lucro da casa.`,
        content: 'Deseja criar o jogo mesmo',
        okText: 'Sim, Criar jogo',
        onOk: () => createOrUpdateBingo(response),
        okType: 'danger',
        cancelText: 'Não',
      });
    } else {
      createOrUpdateBingo(response);
    }
  };

  const dateLayout = {
    wrapperCol: {
      xs: { span: 24 },
      md: { span: 12 },
      xxl: { span: 6 },
    },
  };

  const formLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
      md: { span: 12 },
    },
  };

  const tooltipTitle = (
    <div>
      <Paragraph className="color-white">
        Para cada aposta esta porcentagem acumulará para o prêmio.
        Além disso será retirado a porcentagem destinado ao afiliado.
        Só então o restante será lucro da casa.
      </Paragraph>
      <Paragraph className="color-white">
        Exemplo:
        A aposta sendo R$ 10,00 e a porcentagem para o afiliado sendo 10%.
        <br />
        Se colocar 75% aqui, para cada aposta:
        <br />
        - 7,50 acumula para o premio.
        <br />
        - 1,00 vai para quem indicou o apostador e
        <br />
        - 1,50 será para a casa.
      </Paragraph>
    </div>
  );

  if (globalRequesting) return ('loading...');
  return (
    <Layout>
      <Title>{bingoId === '' ? 'Criar Jogo' : 'Editar Jogo'}</Title>
      <Form
        layout="vertical"
        {...formLayout}
        name="criar jogo"
        onFinish={onFinish}
        form={createBingoForm}
      >
        <Form.Item
          name="period"
          label="Período de aposta"
          {...dateLayout}
          initialValue={[moment(), moment().add(7, 'days').endOf('day')]}
          rules={[
            {
              required: true,
              message: 'Por favor preencha o Valor',
            },
          ]}
          className="form-item-responsive"
        >
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            locale={locale}
            format="DD/MM/YYYY HH:mm"
            disabledDate={(current) => current < moment().startOf('day')}
          />
        </Form.Item>
        <Form.Item
          name="betPrice"
          label="Valor da Aposta:"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor preencha o Valor',
            },
            () => ({
              validator: async (rule, value) => {
                const num = (typeof value === 'string')
                  ? value.replace('R$ ', '').replace(',', '').replaceAll('.', '')
                  : value;
                if (num <= 0) throw new Error('O valor deve ser maior que zero.');
                return Promise.resolve();
              },
            }),
          ]}
        >
          <CurrencyInput
            className="ant-input"
            prefix="R$ "
            decimalSeparator=","
            thousandSeparator="."
          />
        </Form.Item>
        <Form.Item
          name="percentagePrize"
          label={(
            <Text>
              {`Porcentagem para o prêmio da Arecadação total (${Number(global?.value || 0)}% destinado ao afiliado)`}
              <Tooltip title={tooltipTitle} overlayStyle={{ maxWidth: '400px' }}>
                <QuestionCircleOutlined className="px-2" />
              </Tooltip>
            </Text>
          )}
          hasFeedback
          initialValue={75 - Number(global?.value || 0)}
          validateStatus={!warningPercentagePrize ? undefined : 'warning'}
          help={!warningPercentagePrize ? undefined : warningPercentagePrize}
          tooltip="para cada"
          {...dateLayout}
          rules={[
            {
              required: true,
              message: 'Por favor preencha o Valor',
            },
            () => ({
              validator: async (rule, value) => {
                if (value + Number(global?.value || 0) > 100) {
                  throw new Error('A porcentagem para prêmio somada a porcentagem de indicação deve ser no maximo 100%');
                }
                if (value + Number(global?.value || 0) === 100) {
                  setWarningPercentagePrize(`Com o premio sendo ${value}% da arrecadação. Não sobrará nada para lucro da casa.`);
                } else if (value === 0) {
                  setWarningPercentagePrize('Com 0% para premio o premio será o valor mínimo');
                } else {
                  setWarningPercentagePrize('');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputNumber
            min={0}
            max={100 - Number(global?.value || 0)}
            formatter={value => `${value}%`}
            className="ant-input"
          />
        </Form.Item>
        <Form.Item
          name="minimumPrize"
          label="Prêmio Minímo:"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor preencha o Valor',
            },
            () => ({
              validator: async (rule, value) => {
                const num = (typeof value === 'string')
                  ? value.replace('R$ ', '').replace(',', '').replaceAll('.', '')
                  : value;
                if (num <= 0) throw new Error('O valor deve ser maior que zero.');
                return Promise.resolve();
              },
            }),
          ]}
        >
          <CurrencyInput
            className="ant-input"
            prefix="R$ "
            decimalSeparator=","
            thousandSeparator="."
          />
        </Form.Item>

        <Form.Item
          name="percentagePrizeFirst"
          label="Porcentagem do Premio para o Primeiro Lugar:"
          hasFeedback
          dependencies={['percentagePrizeThird', 'percentagePrizeSecond']}
          initialValue={100}
          {...dateLayout}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const total = value + getFieldValue('percentagePrizeSecond') + getFieldValue('percentagePrizeThird');
                if (total === 100) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('Total para 1º, 2º e 3º Lugar deve ser 100% do prêmio! dif= ', total - 100);
              },
            }),
          ]}
        >
          <InputNumber
            min={0}
            max={100}
            formatter={value => `${value}%`}
          />
        </Form.Item>

        <Form.Item
          name="percentagePrizeSecond"
          label="Porcentagem do Premio para o Segundo Lugar:"
          dependencies={['percentagePrizeThird', 'percentagePrizeFirst']}
          hasFeedback
          initialValue={0}
          {...dateLayout}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const total = getFieldValue('percentagePrizeFirst') + value + getFieldValue('percentagePrizeThird');
                if (total === 100) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('Total para 1º, 2º e 3º Lugar deve ser 100% do prêmio! dif= ', total - 100);
              },
            }),
          ]}
        >
          <InputNumber
            min={0}
            max={100}
            formatter={value => `${value}%`}
          />
        </Form.Item>

        <Form.Item
          name="percentagePrizeThird"
          label="Porcentagem do Premio para o Terceiro Lugar:"
          dependencies={['percentagePrizeSecond', 'percentagePrizeFirst']}
          hasFeedback
          initialValue={0}
          {...dateLayout}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const total = getFieldValue('percentagePrizeFirst') + getFieldValue('percentagePrizeSecond') + value;
                if (total === 100) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('Total para 1º, 2º e 3º Lugar deve ser 100% do prêmio! dif= ', total - 100);
              },
            }),
          ]}
        >
          <InputNumber
            min={0}
            max={100}
            formatter={value => `${value}%`}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={bingoRequesting}>
            {bingoId === '' ? 'Criar Jogo' : 'Editar Jogo'}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};
NewBingo.propTypes = {
  bingoId: PropTypes.string,

  onSuccess: PropTypes.func,
};

NewBingo.defaultProps = {
  bingoId: '',
  onSuccess: () => { },
};

export default NewBingo;
