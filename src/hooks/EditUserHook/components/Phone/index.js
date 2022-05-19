import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Typography,
  Row,
} from 'antd';
import { EditFilled } from '@ant-design/icons';
import MaskedInput from 'antd-mask-input';

const { Text } = Typography;

const Phone = ({ value, setValue }) => (
  <Form.Item
    name={['userForm', 'phone']}
    label="Telefone"
    maxLength={15}
    rules={[
      {
        required: (value === ''),
        message: 'Por favor preencha o telefone',
      },
      () => ({
        validator(_, valuefield) {
          if (value !== '') return Promise.resolve();
          if (valuefield.indexOf('_') > -1 && valuefield.indexOf('_') < 14) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('Por favor preencha o telefone');
          }
          return Promise.resolve();
        },
      }),
    ]}
  >
    {(value === '') ? (
      <MaskedInput
        mask="(11) 1111-11111"
        placeholder="(__) ____-____"
      />
    ) : (
      <Row>
        <Text style={{ marginRight: 10 }}>{value}</Text>
        <EditFilled onClick={() => setValue('')} />
      </Row>
    )}
  </Form.Item>
);

Phone.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

Phone.defaultProps = {
  value: '',
  setValue: () => {},
};

export default Phone;
