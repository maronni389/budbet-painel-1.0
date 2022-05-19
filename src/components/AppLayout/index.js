import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

// import components
import HeaderPage from './Header';
import SiderMenu from './SiderMenu';

const { Content } = Layout;

const AppLayout = ({ children }) => (
  <Layout>
    <HeaderPage appName={process.env.APP_NAME} />
    <Layout>
      <SiderMenu />
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
