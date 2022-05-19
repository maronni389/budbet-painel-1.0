import React from 'react';
import { Layout, Button, Modal, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { refreshTokenAction } from '@redux/auth/actions';
import { useHistory } from 'react-router-dom';
import EditUserHook from 'hooks/EditUserHook';

const { Title } = Typography;

const EditProfile = () => {
  const { tokenInfo: { id, nickname } } = useSelector(selectState('auth', 'tokenInfo'));
  const history = useHistory();
  const refreshToken = useActions(refreshTokenAction);

  const onCancel = () => {
    history.push('/dashboard');
  };

  const onSuccess = (changeSensitive) => {
    if (changeSensitive) refreshToken();
  };

  return (
    <Layout>
      <Title>Perfil</Title>
      <Modal
        visible
        title={`Editar Perfil de ${nickname}`}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancelar
          </Button>,
        ]}
      >
        {EditUserHook(id, onCancel, onSuccess)}
      </Modal>
    </Layout>
  );
};

export default EditProfile;
