import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Typography,
  Row,
  Tooltip,
} from 'antd';
import { EditFilled, QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Nickname = ({ value, setValue }) => (
  <Form.Item
    name={['userForm', 'nickname']}
    label={(
      <span>
        {'Apelido '}
        <Tooltip title="Como você deseja que os outros te chamem?">
          <QuestionCircleOutlined />
        </Tooltip>
      </span>
    )}
    rules={[
      {
        required: (value === ''),
        message: 'Por favor preencha o apelido',
        whitespace: true,
        max: 20,
      },
    ]}
  >
    {(value === '') ?
      <Input maxLength={20} />
      : (
        <Row>
          <Text style={{ marginRight: 10 }}>{value}</Text>
          <EditFilled onClick={() => setValue('')} />
        </Row>
      )
    }
  </Form.Item>
);
Nickname.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

Nickname.defaultProps = {
  value: '',
  setValue: () => {},
};

export default Nickname;
