import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Typography,
  Row,
} from 'antd';
import { EditFilled } from '@ant-design/icons';

const { Text } = Typography;

const Email = ({ value, setValue }) => (
  <Form.Item
    name={['userForm', 'email']}
    label="E-mail"
    maxLength={100}
    rules={[
      {
        required: (value === ''),
        message: 'Por favor preencha um email válido',
        type: 'email',
        whitespace: true,
      },
    ]}
  >
    {(value === '') ?
      <Input maxLength={100} />
      : (
        <Row>
          <Text style={{ marginRight: 10 }}>{value}</Text>
          <EditFilled onClick={() => setValue('')} />
        </Row>
      )
    }
  </Form.Item>
);
Email.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

Email.defaultProps = {
  value: '',
  setValue: () => {},
};

export default Email;
