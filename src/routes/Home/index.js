import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { useActions, selectState } from '@redux';
import { logoutAction } from '@redux/auth/actions';
import { useSelector } from 'react-redux';
import background from 'assets/image/fundo.jpg';
import { LoadingOutlined } from '@ant-design/icons';
import Login from './components/Login';
import Forgot from './components/Forgot';


const Home = () => {
  const [key, setState] = useState('login');
  const { tokenInfo: { accessToken, roleId }, tokenInfoRequesting } = useSelector(selectState('auth', 'tokenInfo'));

  const logout = useActions(logoutAction);

  const handleSignOut = () => {
    logout();
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  const tabList = [
    {
      key: 'login',
      tab: key === 'login' ? 'Login' : 'Voltar para login',
    },
  ];

  const contentList = {
    login: <Login handdleForgotPassword={() => setState('forgot')} />,
    forgot: <Forgot backToLogin={() => setState('login')} />,
  };

  const onTabChange = (key) => {
    setState(key);
  };


  if (accessToken && (roleId < 2)) return <Redirect to="/dashboard" />;

  return (
    <div id="home">
      <img
        alt="https://pt.vecteezy.com/vetor-gratis/tecnologia"
        className="background"
        src={background}
        width="1600px" />
      { (tokenInfoRequesting) ?
        <Spin indicator={antIcon} />
        : (
          <Card
            style={{ width: '500px' }}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={key => {
              onTabChange(key);
            }}
          >
            {roleId > 1 ?
              (
                <Alert
                  className="alert"
                  message="Acesso não autorizado"
                  description="O email que está tentando fazer login, não tem acesso de administrador."
                  type="error"
                  closable
                  onClose={handleSignOut}
                  banner
                />
              ) :
              contentList[key]
            }
          </Card>
        )}
      {/* <a href="https://pt.vecteezy.com/vetor-gratis/tecnologia">Tecnologia Vetores por Vecteezy</a> */}
    </div>
  );

};

export default Home;
