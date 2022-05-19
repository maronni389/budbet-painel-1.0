import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
} from 'antd';

import EditUserHook from 'hooks/EditUserHook';

const EditUser = ({ id, onRegister, beforeCancel, affiliationOptions }) => (
  <Modal
    visible={(id !== '')}
    title={(id !== '-1') ? 'Editar Usuário' : 'Criar Novo Usuário'}
    setVisible={beforeCancel}
    onCancel={beforeCancel}
    footer={[
      <Button key="back" onClick={beforeCancel}>
        Cancelar
      </Button>,
    ]}
    zIndex={500}
  >
    {EditUserHook(id, beforeCancel, onRegister, affiliationOptions)}
  </Modal>
);

EditUser.propTypes = {
  id: PropTypes.string.isRequired,
  onRegister: PropTypes.func,
  beforeCancel: PropTypes.func,
  affiliationOptions: PropTypes.arrayOf({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
};

EditUser.defaultProps = {
  onRegister: () => {},
  beforeCancel: PropTypes.func,
  affiliationOptions: [],
};
export default EditUser;
