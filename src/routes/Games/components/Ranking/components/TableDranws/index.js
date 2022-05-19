import React from 'react';
import { Table, Divider, Typography, Tag, Row } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import OnLoadSpin from 'components/OnLoadSpin';

const { Text, Title } = Typography;

moment.locale('pt-BR');

const TableDrawns = ({ drawns, requesting, dateDrawn }) => {

  const columns = [
    {
      title: <strong>Data do sorteio</strong>,
      dataIndex: 'createAt',
      align: 'center',
      key: 'createAt',
      render: (value) => <Text strong>{moment(value).format('DD/MM/YYYY HH:mm')}</Text>,
      width: 150,
    },
    {
      title: <strong>Dezenas</strong>,
      dataIndex: 'numbers',
      key: 'numbers',
      width: 350,
      align: 'start',
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
  ];

  return (
    <OnLoadSpin loading={requesting}>
      <Divider orientation="left" id="dividerDepoimento">
        <Title level={4} id="dividerText">Sorteios Realizados</Title>
      </Divider>
      {
        !drawns[0]
          ? (
            <Row>
              <Text>
                {'Nenhum sorteio feito, Sorteio será '}
                {moment(dateDrawn, 'x').format('DD/MM/YYYY HH:mm')}
              </Text>
            </Row>
          )
          : (
            <Table
              columns={columns}
              loading={requesting}
              dataSource={drawns}
              rowKey="id"
              pagination={false}
              scroll={{ x: 700 }}
              sticky
            />
          )
      }
    </OnLoadSpin>
  );
};

TableDrawns.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  drawns: PropTypes.array.isRequired,
  requesting: PropTypes.bool.isRequired,
  dateDrawn: PropTypes.string.isRequired,
};

// TableDrawns.defaultProps = {
//   loading: false,
// };

export default TableDrawns;
