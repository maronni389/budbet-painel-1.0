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

const Password = ({ value, setValue, id }) => (
  <>
    {(id !== '-1') ? (
      <Form.Item
        name={['userForm', 'previousPassword']}
        label="Senha Atual: "
        maxLength={20}
        rules={[
          {
            required: (value === ''),
            message: 'Por favor preencha uma senha de no mínimo 6 caracteres.',
            whitespace: true,
            max: 20,
            min: 6,
          },
        ]}
        hasFeedback
      >
        {(value === '') ?
          <Input.Password maxLength={20} />
          : (
            <Row>
              <Text style={{ marginRight: 10 }}>{value}</Text>
              <EditFilled onClick={() => setValue('')} />
            </Row>
          )
        }
      </Form.Item>
    ) : null }
    <Form.Item
      name={['userForm', 'password']}
      label="Senha"
      maxLength={20}
      rules={[
        {
          required: (value === ''),
          message: 'Por favor preencha uma senha de no mínimo 6 caracteres.',
          whitespace: true,
          max: 20,
          min: 6,
        },
      ]}
      hasFeedback
    >
      {(value === '') ?
        <Input.Password maxLength={20} />
        : (
          <Row>
            <Text style={{ marginRight: 10 }}>{value}</Text>
            <EditFilled onClick={() => setValue('')} />
          </Row>
        )
      }
    </Form.Item>
    {(value === '') ? (
      <Form.Item
        name="confirm"
        label="Confirmação"
        maxLength={20}
        dependencies={['userForm', 'password']}
        hasFeedback
        rules={[
          {
            required: (value === ''),
            message: 'Confirme a senha',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue(['userForm', 'password']) === value) {
                return Promise.resolve();
              }

              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject('Senha de confirmação não corresponde');
            },
          }),
        ]}
      >
        {(value === '') ?
          <Input.Password maxLength={20} />
          : (
            <Row>
              <Text style={{ marginRight: 10 }}>{value}</Text>
              <EditFilled onClick={() => setValue('')} />
            </Row>
          )
        }
      </Form.Item>
    ) : null }
  </>
);
Password.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  id: PropTypes.string,
};

Password.defaultProps = {
  value: '',
  setValue: () => {},
  id: '',
};

export default Password;
