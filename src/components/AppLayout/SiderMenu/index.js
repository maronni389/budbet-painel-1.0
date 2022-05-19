import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';

const { Sider } = Layout;

const contents = [
  { key: '/dashboard', title: 'Home' },
  { key: '/jogos', title: 'Jogos' },
  { key: '/apostas', title: 'Apostas' },
  { key: '/usuarios', title: 'Usuários' },
  { key: '/extrato', title: 'Extrato Financeiro' },
  { key: '/depositar', title: 'Bancos' },
  { key: '/depoimentos', title: 'Depoimentos' },
  { key: '/regras', title: 'Regras' },
  { key: '/faq', title: 'FAQ' },
];

const SiderMenu = () => {
  const location = useLocation();
  const history = useHistory();
  const [selected, changeSelected] = useState('/dashboard');

  useEffect(() => {
    const element = contents.find(element => element.key === location.pathname);
    if (element) {
      changeSelected(element.key);
    } else {
      changeSelected('-1');
    }
  }, [location]);

  const changeKey = ({ key }) => {
    history.push(key);
  };

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        onSelect={changeKey}
        selectedKeys={selected}
      >
        {contents.map((item) => (
          <Menu.Item key={item.key}>{item.title}</Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
