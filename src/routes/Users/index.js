import React, { useEffect, useState } from 'react';
import {
  Layout,
  Row,
  Typography,
  Button,
  message,
} from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import {
  usersListAction,
  userDeleteAction,
  sendConfirmEmailAction,
  confirmEmailAction,
  clearUserAction,
} from '@redux/users/actions';
import { NewTransaction } from 'components';
import AddOrEdit from './components/AddOrEdit';
import TableUsers from './components/TableUsers';

moment.locale('pt-BR');
const { Title } = Typography;

const Users = () => {
  const { users, usersRequesting } = useSelector(selectState('users', 'users'));
  const { userRequesting } = useSelector(selectState('users', 'user'));
  const { tokenInfo: { id } } = useSelector(selectState('auth', 'tokenInfo'));
  const history = useHistory();
  const getUsers = useActions(usersListAction);
  const deleteUser = useActions(userDeleteAction);
  const clearUserMemory = useActions(clearUserAction);
  const sendConfirmationEmail = useActions(sendConfirmEmailAction);
  const confirmEmail = useActions(confirmEmailAction);
  const [editUserId, setEditUserId] = useState('');
  const [transaction, setTransaction] = useState({ id: '', transactionType: 'Deposito' });

  const handleDelete = (id) => {
    deleteUser(id, {
      onSuccess: () => {
        message.success('usuário removido com sucesso');
        getUsers();
      },
      onFailure: () => getUsers(),
    });
  };

  const sendConfirmation = (id) => {
    /* Send Email to Confirmation account */
    sendConfirmationEmail(id, { onSuccess: () => { message.success('Email enviado com sucesso!'); } });
  };

  const confirmEmailUser = (token) => {
    /* Confirm e-mail without sent confirmation */
    confirmEmail(token, {
      onSuccess: () => {
        getUsers();
        message.success('Email confirmado com sucesso!');
      },
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const refresh = () => {
    getUsers();
    setEditUserId(''); // hide modal
    setTransaction({ id: '', transactionType: 'Deposito' });
  };

  const handleDeposit = (id) => {
    setTransaction({ id, transactionType: 'Deposito' });
  };
  const handleWithdrawn = (id) => {
    setTransaction({ id, transactionType: 'Saque' });
  };

  const handleCreateUser = () => {
    clearUserMemory();
    setEditUserId('-1');
    /* Show Modal to add user */
  };

  return (
    <Layout>
      <Row justify="space-between">
        <Title>Usuários</Title>
        <Button onClick={() => handleCreateUser()}>
          Adicionar usuário
        </Button>

      </Row>
      <TableUsers
        idSelf={id} // id curent user
        editSelfProfile={() => history.push('/editprofile')} // Go to edit self profile
        handleEditUser={setEditUserId} // Show modal to Edit user
        userRequesting={userRequesting}
        sendConfirmation={sendConfirmation}
        handleDelete={handleDelete}
        loadingTable={usersRequesting}
        dataSource={Object.values(users)}
        confirmUser={confirmEmailUser}
        handleDeposit={handleDeposit} // balance
        handleWithdrawn={handleWithdrawn} // balance
      />
      <AddOrEdit
        id={editUserId}
        onRegister={() => refresh()}
        beforeCancel={() => setEditUserId('')} // hide modal
        affiliationOptions={Object.values(users).map(({ id, nickname }) => (
          { value: id, label: nickname }
        ))}
      />
      <NewTransaction
        userId={transaction.id}
        transactionType={transaction.transactionType}
        closeFunction={() => refresh()}
      />
    </Layout>
  );
};

export default Users;
