import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Table,
  Button,
  Tag,
  Input,
  Space,
  Popconfirm,
  Tooltip,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectState } from '@redux';
import { numberToReais, centsToMoney } from 'utils/formats';

moment.locale('pt-BR');
const { Text } = Typography;

const TableStatement = ({ handleApproval, handleDenied }) => {
  const { transactions, transactionsRequesting } = useSelector(selectState('transactions', 'transactions'));

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
    onFilter: (value, record) => (
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : ''
    ),
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


  const columns = [
    {
      title: 'Usuário',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 120,
      align: 'center',
      ...getColumnSearchProps('nickname'),
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      render: date => moment(date).format('DD/MM/YYYY'),
      width: 120,
      sorter: {
        compare: (a, b) => moment(a.date.split(' ')[0]) - moment(b.date.split(' ')[0]),
        multiple: 2,
      },
      showSorterTooltip: false,
    },
    {
      title: 'Tipo',
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: 110,
      align: 'center',
      filters: [
        { text: 'Deposito', value: 'deposito' },
        { text: 'Saque', value: 'saque' },
        { text: 'Aposta', value: 'aposta' },
        { text: 'Premio', value: 'premio' },
      ],
      onFilter: (value, record) => record.transactionType.toLowerCase().includes(value),
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      width: 110,
      align: 'center',
      render: value => `R$ ${numberToReais(centsToMoney(value))}`,
      sorter: {
        compare: (a, b) => parseInt(a.value) - parseInt(b.value),
        multiple: 1,
      },
      showSorterTooltip: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      align: 'center',
      render: (status, row) => {
        if (status.toUpperCase() === 'PENDING') {
          return (
            <Popconfirm
              title={(
                <>
                  <Text strong>
                    Deseja Aprovar esta transação?
                  </Text>
                </>
              )}
              onConfirm={() => handleApproval(row)}
              onCancel={() => handleDenied(row)}
              okText="Aprovar"
              cancelText="Negar"
            >
              <Tag color="orange" key={status}>
                <a>PENDENTE</a>
              </Tag>
            </Popconfirm>
          );
        }
        if (status.toUpperCase() === 'DENIED') {
          return (
            <Tag color="red" key={status}>
              NEGADO
            </Tag>
          );
        }
        if (status.toUpperCase() === 'APPROVED') {
          return (
            <Tag color="green" key={status}>
              APROVADO
            </Tag>
          );
        }
        return (
          <Tag color="green" key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'Pendente', value: 'pending' },
        { text: 'Aprovado', value: 'approved' },
        { text: 'Negado', value: 'denied' },
      ],
      onFilter: (value, record) => record.status.toLowerCase().includes(value),
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      width: 110,
      align: 'center',
      ...getColumnSearchProps('description'),
      ellipsis: {
        showTitle: false,
      },
      render: value => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: 'Recibo',
      dataIndex: 'receipt',
      key: 'receipt',
      width: 110,
      align: 'center',
      render: (data) => {
        if (data && data !== '') {
          return (
            <Button type="primary" href={data} target={data}>Recibo</Button>
          );
        }
        return '';
      },
    },
  ];
  return (
    <Table
      columns={columns}
      loading={transactionsRequesting}
      dataSource={
        Object.values(transactions).map((e) => {
          e.nickname = e.user.nickname;
          return e;
        }).sort((a, b) => moment(b.createAt) - moment(a.createAt))
      }
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 700 }}
      sticky
    />
  );
};

TableStatement.propTypes = {
  handleApproval: PropTypes.func.isRequired,
  handleDenied: PropTypes.func.isRequired,
};

export default TableStatement;
