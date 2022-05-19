import React from 'react';
import { Table, Tag, Typography, Divider, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import OnLoadSpin from 'components/OnLoadSpin';

const { Text, Title } = Typography;
moment.locale('pt-BR');

const TableBets = ({ dataSource, loading, handleMakeBet, showButtonBet }) => {
  const columns = [
    {
      title: <strong>Cliente</strong>,
      dataIndex: 'user',
      key: 'user',
      align: 'center',
      render: (value) => <Text strong>{value.nickname}</Text>,
      width: 120,
    },
    {
      title: <strong>Data da aposta</strong>,
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      render: (value) => <Text strong>{moment(value).format('DD/MM/YYYY HH:mm')}</Text>,
      width: 135,
    },
    {
      title: <strong>Dezenas</strong>,
      dataIndex: 'numbers',
      key: 'numbers',
      align: 'start',
      width: 350,
      render: (tags, data) => (
        <>
          {tags.map((tag, i) => (
            <Tag
              color={data.sorted[i] ? 'green' : 'grey'}
              key={`${tag}-${i}`}
              className="bingoStyle"
            >
              {(`00${tag}`).slice(-2)}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: <strong>Pontos</strong>,
      align: 'center',
      dataIndex: 'points',
      key: 'points',
      render: (points) => <Text strong>{points}</Text>,
      width: 80,
    },
  ];

  return (
    <OnLoadSpin loading={loading}>
      <Divider orientation="left" id="dividerDepoimento">
        <Title level={4} id="dividerText">
          {`${dataSource.length} Jogo${dataSource.length > 1 ? 's' : ''} Feito${dataSource.length > 1 ? 's' : ''}`}
        </Title>
      </Divider>
      { (!showButtonBet) ? null : (
        <Col sm={24} md={12} style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Button onClick={() => handleMakeBet()} type="primary" block>
            Criar Aposta
          </Button>
        </Col>
      )}
      <Table
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
        scroll={{ x: 700 }}
        sticky
      />
    </OnLoadSpin>
  );
};

TableBets.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  handleMakeBet: PropTypes.func.isRequired,
  showButtonBet: PropTypes.bool,
};

TableBets.defaultProps = {
  showButtonBet: false,
};

export default TableBets;
