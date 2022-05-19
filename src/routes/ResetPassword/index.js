import React from 'react';
import { Card, Spin, Typography } from 'antd';
import { selectState } from '@redux';
import { useSelector } from 'react-redux';
import background from 'assets/image/fundo.jpg';
import { LoadingOutlined } from '@ant-design/icons';
import ResetForm from './components/ResetForm';

const ResetPassword = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  const { tokenInfoRequesting } = useSelector(selectState('auth', 'tokenInfo'));

  return (
    <div id="home">
      <img alt="fundo" className="background" src={background} width="1600px" />
      { (tokenInfoRequesting) ?
        <Spin indicator={antIcon} />
        : (
          <Card
            style={{ width: '500px' }}
          >
            <Typography.Title>Recuperação de Senha</Typography.Title>
            <ResetForm />
          </Card>
        )}
      {/* <a href="https://br.freepik.com/vetores/fundo">Fundo vetor criado por pch.vector - br.freepik.com</a> */}
    </div>
  );

};

export default ResetPassword;
