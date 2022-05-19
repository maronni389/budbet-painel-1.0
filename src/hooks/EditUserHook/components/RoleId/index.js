import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Select,
  Typography,
  Row,
} from 'antd';
import { EditFilled } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

const enumRoleId = {
  1: 'Admin',
  3: 'Usuário',
};

const RoleId = ({ value, setValue }) => (
  <Form.Item
    name={['userForm', 'roleId']}
    defaultValue={3}
    label="Tipo de Usuario"
    maxLength={100}
    rules={[
      {
        required: (value === -1),
        message: 'Por favor escolha o Tipo de usuário',
      },
    ]}
  >
    {(value === -1) ? (
      <Select>
        <Option value={3}>{enumRoleId[3]}</Option>
        <Option value={1}>{enumRoleId[1]}</Option>
      </Select>
    ) : (
      <Row>
        <Text style={{ marginRight: 10 }}>{enumRoleId[value]}</Text>
        <EditFilled onClick={() => setValue(-1)} />
      </Row>
    )
    }
  </Form.Item>
);

RoleId.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
};

RoleId.defaultProps = {
  value: -1,
  setValue: () => {},
};

export default RoleId;
