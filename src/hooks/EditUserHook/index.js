import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  message,
  Spin,
  Form,
} from 'antd';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { userCreateAction, userUpdateAction, clearUserAction, userReadAction } from '@redux/users/actions';
import FirstName from './components/FirstName';
import LastName from './components/LastName';
import Nickname from './components/Nickname';
import Email from './components/Email';
import Phone from './components/Phone';
import Password from './components/Password';
import RoleId from './components/RoleId';
import Affiliation from './components/Affiliation';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { xs: { span: 19, offset: 0 }, sm: { span: 19, offset: 5 } },
};

const EditUserHook = (id, onCancel, onSuccess, affiliationOptions) => {
  const [form] = Form.useForm();
  const { user, userRequesting } = useSelector(selectState('users', 'user'));
  const readUser = useActions(userReadAction);
  const createUser = useActions(userCreateAction);
  const updateUser = useActions(userUpdateAction);
  const clearUser = useActions(clearUserAction);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [nickname, setnickname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [roleId, setroleId] = useState(-1);
  const [affiliation, setaffiliation] = useState('Nenhum');

  useEffect(() => {
    if (id !== '-1' && id !== '') readUser(id);
    if (id === '-1') form.resetFields();
  }, [id]);

  useEffect(() => {
    setfirstName(user.firstName);
    setlastName(user.lastName);
    setnickname(user.nickname);
    setemail(user.email);
    setphone(user.phone);
    setroleId(user.roleId);
    setpassword((user.id) ? '******' : '');
    setaffiliation(user.affiliation?.id || 'Nenhum');
  }, [user]);

  const nothingChange = () => (
    (firstName === user.firstName &&
    lastName === user.lastName &&
    nickname === user.nickname &&
    email === user.email &&
    phone === user.phone &&
    roleId === user.roleId &&
    password === '******' &&
    affiliation === (user.affiliation?.id || 'Nenhum'))
  );

  const handleCancel = () => {
    if (user.id) {
      clearUser();
      setfirstName('');
      setlastName('');
      setnickname('');
      setemail('');
      setphone('');
      setroleId(-1);
      setpassword('');
      setaffiliation('Nenhum');
    }
    form.resetFields();
    onCancel();
  };

  const onSuccessSave = (changeSensitive) => {
    message.success('Usuario Alterado com sucesso');
    onSuccess(changeSensitive);
    handleCancel();
  };

  const onSuccessCreate = () => {
    message.success('Usuario cadastrado');
    onSuccess();
    handleCancel();
  };

  const editUser = (userForm) => {
    if (nothingChange()) {
      handleCancel();
    } else {

      let changeSensitive = false;
      // if change somethink
      const userEdit = {};
      if (userForm.firstName && (firstName === '')) {
        userEdit.firstName = userForm.firstName;
      }
      if (userForm.lastName && (lastName === '')) {
        userEdit.lastName = userForm.lastName;
      }
      if (userForm.nickname && (nickname === '')) {
        userEdit.nickname = userForm.nickname;
        changeSensitive = true;
      }
      if (userForm.email && (email === '')) {
        userEdit.email = userForm.email;
        changeSensitive = true;
      }
      if (userForm.phone && (phone === '')) {
        userEdit.phone = userForm.phone;
      }
      if (userForm.roleId && (roleId === -1)) {
        userEdit.roleId = userForm.roleId;
        changeSensitive = true;
      }
      if (userForm.password && (password === '')) {
        userEdit.password = userForm.password;
        userEdit.previousPassword = userForm.previousPassword;
        changeSensitive = true;
      }
      if (affiliationOptions.length && userForm.invitation && (affiliation === '')) {
        userEdit.invitation = userForm.invitation;
      }

      updateUser(id, { ...userEdit, onSuccess: () => onSuccessSave(changeSensitive) });
    }
  };

  const createNewUser = (userForm) => {
    const newUser = {
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      nickname: userForm.nickname,
      email: userForm.email,
      phone: userForm.phone,
      roleId: userForm.roleId,
      password: userForm.password,
    };

    // create new user
    createUser({
      ...newUser,
      onSuccess: () => onSuccessCreate(),
    });
  };

  const onFinish = (values) => {
    const { userForm } = values;

    if (id === '-1') {
      createNewUser(userForm);
    } else {
      editUser(userForm);
    }
  };

  const buttonSubmit = () => {
    if (nothingChange()) return null;

    // onUpdate or save
    return (
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" block>
          {(id === '-1') ? 'Registrar' : 'Salvar'}
        </Button>
      </Form.Item>
    );
  };

  return (
    <Spin spinning={userRequesting} tip="Loading...">
      <Form {...layout} name="signup" onFinish={onFinish} form={form}>
        <FirstName value={firstName} setValue={setfirstName} />
        <LastName value={lastName} setValue={setlastName} />
        <Nickname value={nickname} setValue={setnickname} />
        <Email value={email} setValue={setemail} />
        <Phone value={phone} setValue={setphone} />
        <Password value={password} id={id} setValue={setpassword} />
        <RoleId value={roleId} setValue={setroleId} />
        {!!affiliationOptions?.length && (
          <Affiliation
            value={affiliation}
            setValue={setaffiliation}
            affiliationOptions={affiliationOptions}
          />
        )}

        {buttonSubmit()}
      </Form>
    </Spin>
  );
};

EditUserHook.propTypes = {
  id: PropTypes.string,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  affiliationOptions: PropTypes.arrayOf({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
};

EditUserHook.defaultProps = {
  id: '-1',
  onCancel: () => {},
  onSuccess: () => {},
  affiliationOptions: [],
};

export default EditUserHook;
