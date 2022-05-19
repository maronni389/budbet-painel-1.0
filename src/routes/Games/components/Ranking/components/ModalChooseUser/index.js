import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Select,
  Button,
} from 'antd';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { usersListAction } from '@redux/users/actions';
import { OnLoadSpin } from 'components';

const ModalChooseUser = ({
  visible,
  title,
  handleSubmit,
  handleCancel,
  betValue,
}) => {
  const { users, usersRequesting } = useSelector(selectState('users', 'users'));
  const getUsers = useActions(usersListAction);

  useEffect(() => { getUsers(); }, []);

  const onFinish = ({ id }) => {
    const { nickname } = Object.values(users).find((u) => (u.id === id));
    handleSubmit({ id, nickname });
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      {title}
      <Form
        layout="vertical"
        name="users"
        onFinish={onFinish}
      >
        <OnLoadSpin loading={usersRequesting}>
          <Form.Item
            name="id"
            label="Usuário"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor Selecione um usuário',
              },
              () => ({
                validator(_, id) {
                  const { balance } = Object.values(users).find((u) => (u.id === id));
                  if (balance.actual < betValue || balance.actual === 0) {
                    return Promise.reject(new Error('Saldo insuficiente para apostar'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={
                (!users)
                  ? null
                  : (
                    Object.values(users).map((e) => ({
                      label: e.nickname,
                      value: e.id,
                    }))
                  )
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Escolher
            </Button>
          </Form.Item>
        </OnLoadSpin>
      </Form>
    </Modal>
  );
};


ModalChooseUser.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  betValue: PropTypes.number,
};

ModalChooseUser.defaultProps = {
  title: null,
  visible: false,
  betValue: 0,
};

export default ModalChooseUser;
