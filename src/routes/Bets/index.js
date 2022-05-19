import React, { useEffect, useState } from 'react';
import { Layout, Divider, Typography, Spin } from 'antd';
import { useActions } from '@redux';
import { bingobetListAction } from '@redux/bingobets/actions.js';
import TableBets from './components/TableBets';


const Bets = () => {
  const getBingoBets = useActions(bingobetListAction);
  const [showbets, setShowBets] = useState(false);

  useEffect(() => {
    getBingoBets({ onSuccess: () => setShowBets(true) });
  }, []);

  return (
    <Layout>
      <Divider orientation="left" id="dividerDepoimento">
        <Typography.Title level={4} id="dividerText">Apostas Feitas</Typography.Title>
      </Divider>
      {showbets ? <TableBets /> : <Spin tip="Loading..." />}
    </Layout>
  );
};

export default Bets;
