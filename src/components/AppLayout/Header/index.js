/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { Layout, Button, Row, Col, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { DownloadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import { logoutAction } from '@redux/auth/actions';
import logo from 'assets/image/logo.png';

const { Header } = Layout;

const HeaderPage = ({ appName }) => {
  const { tokenInfo: { nickname } } = useSelector(selectState('auth', 'tokenInfo'));
  const history = useHistory();

  const logout = useActions(logoutAction);

  const handleSignOut = () => {
    logout();
  };
  const handleEditProfile = () => {
    history.push('/editprofile');
  };
  const goHome = () => {
    history.push('/');
  };

  const [noImage, setNoImage] = React.useState(false);

  return (
    <Header className=".header-externo">
      <Row justify="space-between" align="middle" wrap="false" className="h-100">
        <Col xs={8} sm={6} md={8}>
          <Row align="middle" justify="start" wrap="false" className="h-100">
            <a className="logo primaryColor" onClick={() => goHome()}>
              {!!noImage ? (
                <p>{appName}</p>
              ) : (
                <img
                  src={logo}
                  alt={appName}
                  height="100%"
                  width="100%"
                  preview="false"
                  onError={() => setNoImage(true)}
                  objectFit="contain"
                  style={{
                    maxHeight: '64px',
                    maxWidth: 'fill-available',
                  }}
                />
              )}
            </a>
          </Row>
        </Col>
        <Col xs={0} sm={12} md={8}>
          <Row align="middle" justify="center" wrap="false" className="h-100">
            <div className="logo d-none d-sm-flex">
              Painel Administrativo
            </div>
          </Row>
        </Col>
        <Col xs={16} sm={6} md={8}>
          <Row align="middle" justify="end" wrap="false" className="h-100">
            <Tooltip placement="bottomRight" title="Editar Prefil">
              <Button type="link" onClick={() => handleEditProfile()} id="primarycolor">
                {nickname}
              </Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title="Sair">
              <DownloadOutlined rotate={90} onClick={() => handleSignOut()} style={{ color: 'white' }} className="primarycolor" />
            </Tooltip>
          </Row>
        </Col>
      </Row>
    </Header>
  );

};
HeaderPage.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default HeaderPage;
