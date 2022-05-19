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

const FirstName = ({ value, setValue }) => (
  <Form.Item
    name={['userForm', 'firstName']}
    label="Nome"
    getValueFromEvent={value}
    rules={[
      {
        required: (value === ''),
        message: 'Por favor preencha o Nome',
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
FirstName.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

FirstName.defaultProps = {
  value: '',
  setValue: () => {},
};

export default FirstName;
