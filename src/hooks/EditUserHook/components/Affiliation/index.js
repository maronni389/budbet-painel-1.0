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

const Affiliation = ({ value, setValue, affiliationOptions }) => (
  <Form.Item
    name={['userForm', 'invitation']}
    defaultValue="Nenhum"
    label="Filiação"
    maxLength={100}
  >
    {(value === '') ? (
      <Select defaultValue="Nenhum">
        <Option value="Nenhum">Nenhum</Option>
        {affiliationOptions.map(({ value, label }) => (
          <Option value={value} key={value}>{label}</Option>
        ))}
      </Select>
    ) : (
      <Row>
        <Text style={{ marginRight: 10 }}>
          {affiliationOptions.find((e) => e.value === value)?.label || 'Nenhum' }
        </Text>
        <EditFilled onClick={() => setValue('')} />
      </Row>
    )
    }
  </Form.Item>
);

Affiliation.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
  affiliationOptions: PropTypes.arrayOf({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
};

Affiliation.defaultProps = {
  value: -1,
  setValue: () => {},
  affiliationOptions: [],
};

export default Affiliation;
