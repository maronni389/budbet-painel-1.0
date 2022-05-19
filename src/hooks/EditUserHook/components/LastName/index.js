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

const LastName = ({ value, setValue }) => (
  <Form.Item
    name={['userForm', 'lastName']}
    label="Sobrenome"
    rules={[
      {
        required: (value === ''),
        message: 'Por favor preencha o Sobrenome',
        whitespace: true,
      },
    ]}
  >
    {(value === '') ?
      <Input maxLength={50} />
      : (
        <Row>
          <Text style={{ marginRight: 10 }}>{value}</Text>
          <EditFilled onClick={() => setValue('')} />
        </Row>
      )
    }
  </Form.Item>
);
LastName.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

LastName.defaultProps = {
  value: '',
  setValue: () => {},
};

export default LastName;
