import React from 'react';
import { Space, Button, Table, Tag, Input, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectState } from '@redux';

import OnLoadSpin from 'components/OnLoadSpin';
import locale from 'antd/es/date-picker/locale/pt_BR';

moment.locale('pt-BR');
const { RangePicker } = DatePicker;


const TableBets = () => {
  const { bets, betsRequesting } = useSelector(selectState('bingobets', 'bets'));
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
      if (dataIndex === 'bingoSequency') {
        const sequency = value.replace('#', '');
        return record[dataIndex].toString().toLowerCase().includes(sequency.toLowerCase());
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
      title: 'Cliente',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
      ...getColumnSearchProps('nickname'),
      width: 150,
    },
    {
      title: 'Data da aposta',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      ...getColumnSearchDateProps('createAt'),
      width: 150,
      sorter: {
        compare: (a, b) => moment(a.createAt).format('x') - moment(b.createAt).format('x'),
        multiple: 1,
      },
      showSorterTooltip: false,
    },
    {
      title: 'Dezenas',
      dataIndex: 'numbers',
      key: 'numbers',
      align: 'center',
      width: 400,
      render: tags => (
        <>
          {tags.map((tag, i) => (
            <Tag color="red" key={`${tag}-${i}`} className="bingoStyle">
              {(`00${tag}`).slice(-2)}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Jogo',
      dataIndex: 'bingoSequency',
      key: 'bingoSequency',
      align: 'center',
      ...getColumnSearchProps('bingoSequency'),
      render: (value) => `#${value}`,
      width: 70,
    },
    {
      title: 'Data Fechamento',
      dataIndex: 'bingoExpectedClosingDate',
      key: 'bingoExpectedClosingDate',
      align: 'center',
      ...getColumnSearchDateProps('bingoExpectedClosingDate'),
      width: 180,
      sorter: {
        compare: (a, b) => a.bingoExpectedClosingDate - b.bingoExpectedClosingDate,
        multiple: 2,
      },
      showSorterTooltip: false,
    },
  ];

  return (
    <OnLoadSpin loading={betsRequesting}>
      <Table
        columns={columns}
        loading={betsRequesting}
        dataSource={
          Object.values(bets).map((element) => {
            const { user, bingo, ...rest } = element;
            if (!user) return null;
            rest.nickname = user.nickname;
            rest.userId = user.id;
            rest.bingoId = bingo.id;
            rest.bingoExpectedClosingDate = bingo.expectedClosingDate;
            rest.bingoClosingDate = bingo.closingDate;
            rest.bingoSequency = bingo.sequency;
            rest.bingo = bingo;
            return rest;
          })
        }
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 700 }}
        sticky
      />
    </OnLoadSpin>
  );
};

// TableBets.propTypes = {
//   handleBet: PropTypes.func.isRequired,
// };

// TableBets.defaultProps = {
//   loading: false,
// };

export default TableBets;
