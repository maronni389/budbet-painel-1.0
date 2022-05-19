import React from 'react';
import {
  Table,
  Tag,
  Popconfirm,
  Tooltip,
  Button,
  Input,
  Space,
  DatePicker,
} from 'antd';
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  TrophyOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';

import moment from 'moment';
import { numberToReais, centsToMoney } from 'utils/formats';
import locale from 'antd/es/date-picker/locale/pt_BR';

moment.locale('pt-BR');
const { RangePicker } = DatePicker;

const TableGames = ({
  loading,
  dataSource,
  handleEdit,
  handleChangeStatus,
  handleDelete,
  openRanking,
}) => {

  let searchInput = React.useRef(null);
  const [state, setStateSearch] = React.useState({
    searchText: '',
    searchedColumn: '',
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setStateSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setStateSearch({ searchText: '' });
  };

  const getColumnSearchProps = dataIndex => ({
    // eslint-disable-next-line react/prop-types
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder="Pesquisar"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            Pesquisar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Resetar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      if (dataIndex === 'betPrice' || dataIndex === 'minimumPrize' || dataIndex === 'amoundPrize') {
        const moneyValue = value
          .replaceAll(',', '')
          .replaceAll('.', '')
          .replaceAll(' ', '')
          .replaceAll('R', '')
          .replaceAll('$', '');
        return record[dataIndex].toString().toLowerCase().includes(moneyValue.toLowerCase());
      }
      if (dataIndex === 'percentagePrize') {
        const percentageValue = value.replace('%', '');
        return record[dataIndex].toString().toLowerCase().includes(percentageValue.toLowerCase());
      }
      return (
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : ''
      );
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text => (
      (state.searchedColumn === dataIndex) ? (
        <b>{text ? text.toString() : ''}</b>
      ) : (
        text
      )),
  });

  const getColumnSearchDateProps = dataIndex => ({
    // eslint-disable-next-line react/prop-types
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <RangePicker
          locale={locale}
          format={['DD/MM/YYYY', 'DD/MM/YYYY']}
          ref={node => {
            searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={value => setSelectedKeys(value ? [value] : [])}
          style={{ marginBottom: 8 }}
        />
        <br />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            Pesquisar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Resetar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      if (!record[dataIndex]) return '';
      const start = +value[0].startOf('day').format('x');
      const end = +value[1].endOf('day').format('x');
      const recordDate = record[dataIndex].includes('-') ? +moment(record[dataIndex]).format('x') : +record[dataIndex];
      return (recordDate >= start && recordDate <= end);
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (valuerender) => {
      const value = valuerender.includes('-') ? valuerender : +valuerender;
      return (
        (state.searchedColumn === dataIndex) ? (
          <b>{moment(value).format('DD/MM/YYYY HH:mm')}</b>
        ) : (
          moment(value).format('DD/MM/YYYY HH:mm')
        )
      );
    },
  });

  const columns = [
    {
      title: '#',
      dataIndex: 'sequency',
      key: 'sequency',
      width: 50,
      align: 'center',
      ...getColumnSearchProps('sequency'),
      render: (value, row) => {
        if (row.betQuantity > 0) {
          return (
            <Tooltip
              title="Jogos Com aposta não podem ser editados!!"
            >
              <a>{`#${value}`}</a>
            </Tooltip>
          );
        }
        return (
          <Popconfirm
            placement="topLeft"
            title="Deseja Editar Esse jogo?"
            onConfirm={() => handleEdit(row.id)}
            okText="Sim"
            cancelText="Não"
          >
            <a>{`#${value}`}</a>
          </Popconfirm>
        );
      },
    },
    {
      title: 'Data encerramento',
      dataIndex: 'expectedClosingDate',
      key: 'expectedClosingDate',
      width: 135,
      align: 'center',
      render: (value) => moment(+value).format('DD/MM/YYYY HH:mm'),
      ...getColumnSearchDateProps('expectedClosingDate'),
    },
    {
      title: 'Preço do Bilhete',
      dataIndex: 'betPrice',
      key: 'betPrice',
      width: 120,
      align: 'center',
      ...getColumnSearchProps('betPrice'),
      render: value => `R$ ${numberToReais(centsToMoney(value))}`,
    },
    {
      title: 'Data que abriu apostas',
      dataIndex: 'openingDate',
      key: 'openingDate',
      width: 135,
      align: 'center',
      render: (value) => moment(+value).format('DD/MM/YYYY HH:mm'),
      ...getColumnSearchDateProps('openingDate'),
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      align: 'center',
      render: (status, array) => {
        const agora = moment().format('x');
        let color = 'black';
        let text = '';

        if (status === 'OPENED') {
          text = 'ABERTO';
          color = 'green';
        }

        if (+array.closingDate < agora
          || +array.expectedClosingDate < agora
          || status === 'CLOSED'
        ) {
          if (array.drawnQuantity <= 0) {
            text = 'SORTEAR';
            color = 'red';
          } else {
            text = 'SORTEANDO';
            color = 'gold';
          }
        }

        if (+array.openingDate > agora) {
          text = 'FECHADO';
          color = 'gold';
        }

        if (status === 'FINISHED') return <Tag color="gray" key={status}>FINALIZADO</Tag>;

        return (
          <Popconfirm
            placement="topLeft"
            title="Deseja Mudar o status desse jogo?"
            onConfirm={() => handleChangeStatus(array)}
            okText="Sim"
            cancelText="Não"
          >
            <Tag
              color={color}
              key={status}
            >
              <a>{text}</a>
            </Tag>
          </Popconfirm>
        );
      },
      filters: [
        { text: 'ABERTO', value: 'opened' },
        { text: 'SORTEANDO', value: 'sorteando' },
        { text: 'SORTEAR', value: 'sortear' },
        { text: 'FINALIZADO', value: 'finished' },
        { text: 'FECHADO', value: 'closed' },
      ],
      onFilter: (value, record) => {
        if (value === 'finished' || value === 'opened') {
          return record.status.toLowerCase().includes(value);
        }
        if (value === 'sortear') {
          return (
            record.status.toLowerCase().includes('closed') &&
            record.drawnQuantity <= 0
          );
        }
        if (value === 'closed') {
          return (
            record.openingDate > moment().format('x')
          );
        }
        return (
          record.status.toLowerCase().includes('closed') &&
          record.drawnQuantity > 0
        );
      },
    },
    {
      title: 'Ranking',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 50,
      render: id => (
        <Button
          type="primary"
          shape="circle"
          icon={<TrophyOutlined />}
          onClick={() => openRanking(id)}
        />
      ),
    },
    {
      title: 'Porcentagem Para Premio',
      dataIndex: 'percentagePrize',
      key: 'percentagePrize',
      align: 'center',
      ...getColumnSearchProps('percentagePrize'),
      render: value => `${value}%`,
      width: 80,
    },
    {
      title: 'Prêmio Mínimo',
      dataIndex: 'minimumPrize',
      key: 'minimumPrize',
      width: 120,
      align: 'center',
      ...getColumnSearchProps('minimumPrize'),
      render: value => `R$ ${numberToReais(centsToMoney(value))}`,
    },
    {
      title: 'Apostas Feitas',
      dataIndex: 'betQuantity',
      key: 'betQuantity',
      align: 'center',
      width: 100,
      ...getColumnSearchProps('betQuantity'),
    },
    {
      title: 'Prêmio Acumulado',
      dataIndex: 'amoundPrize',
      key: 'amoundPrize',
      width: 120,
      align: 'center',
      ...getColumnSearchProps('amoundPrize'),
      render: value => `R$ ${numberToReais(centsToMoney(value))}`,
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      align: 'center',
      render: (id, row) => {
        if (row.betQuantity > 0) {
          return (
            <Tooltip
              title="Jogos Com aposta não podem ser excluidos!!"
            >
              <a><DeleteOutlined /></a>
            </Tooltip>
          );
        }
        return (
          <Popconfirm
            title="Deseja mesmo apagar esse jogo?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            okButtonProps={{
              type: 'primary',
              danger: true,
            }}
            onConfirm={() => handleDelete(id)}
            placement="topRight"
            okText="Deletar"
            cancelText="Não"
          >
            <a><DeleteOutlined /></a>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={dataSource}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 700 }}
      sticky
    />
  );
};

TableGames.propTypes = {
  loading: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  openRanking: PropTypes.func,

  /* Array of content in table */
  // eslint-disable-next-line react/forbid-prop-types
  dataSource: PropTypes.array.isRequired,
};

TableGames.defaultProps = {
  loading: false,
  openRanking: () => {},
};

export default TableGames;
