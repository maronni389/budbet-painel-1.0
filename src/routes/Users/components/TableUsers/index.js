import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Tooltip,
  Popconfirm,
  DatePicker,
  Input,
  Space,
  Table,
  Popover,
  Row,
  Col,
} from 'antd';
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  EditFilled,
  UserOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';
import { numberToReais, centsToMoney } from 'utils/formats';

moment.locale('pt-BR');
const { RangePicker } = DatePicker;
const { Text } = Typography;

const TableUsers = ({
  idSelf,
  editSelfProfile,
  handleEditUser,
  userRequesting,
  sendConfirmation,
  handleDelete,
  loadingTable,
  dataSource,
  confirmUser,
  handleDeposit,
  handleWithdrawn,
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
      title: 'Editar',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80,
      render: userId => {
        if (userId === idSelf) return <UserOutlined onClick={() => editSelfProfile()} />;
        return <EditFilled onClick={() => handleEditUser(userId)} />;
      },
    },
    {
      title: 'Apelido',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
      width: 200,
      ...getColumnSearchProps('nickname'),
    },
    {
      title: 'Nome',
      dataIndex: 'firstName',
      key: 'firstName',
      align: 'center',
      width: 150,
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Sobrenome',
      dataIndex: 'lastName',
      key: 'lastName',
      align: 'center',
      width: 150,
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Saldo',
      dataIndex: 'balance',
      key: 'balance.actual',
      align: 'center',
      width: 100,
      render: (balance, user) => (
        <Popover
          content={(
            <Col>
              <Row style={{ padding: '5px' }}>
                <Button
                  type="primary"
                  onClick={() => handleDeposit(user.id)}
                  block
                >
                  Depositar Dinheiro
                </Button>
              </Row>
              <Row style={{ padding: '5px' }}>
                <Button
                  onClick={() => handleWithdrawn(user.id)}
                  block
                >
                  Sacar Dinheiro
                </Button>
              </Row>
            </Col>
          )}
          title={(
            <Col style={{ padding: '5px' }}>
              <Row>
                {`Depositos Pendentes: R$ ${numberToReais(centsToMoney(balance.depositPending))}`}
              </Row>
              <Row>
                {`Saques Pendentes: R$ ${numberToReais(centsToMoney(balance.withdrawPending))}`}
              </Row>
            </Col>
          )}
          trigger="hover"
        >
          {`R$ ${numberToReais(centsToMoney(balance.actual))}`}
        </Popover>
      ),
      sorter: {
        compare: (a, b) => parseInt(a.balance.actual) - parseInt(b.balance.actual),
        multiple: 2,
      },
      showSorterTooltip: false,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: 200,
      ...getColumnSearchProps('email'),
    },
    {
      title: '',
      dataIndex: 'confirmationToken',
      key: 'confirmationToken',
      align: 'center',
      width: 50,
      render: (confirmationToken, data) => {
        if (!confirmationToken) {
          return (
            <Tooltip placement="topLeft" title="E-mail confirmado!">
              <CheckCircleOutlined style={{ color: 'green' }} />
            </Tooltip>
          );
        }
        return (
          <Tooltip title="E-mail não confirmado ainda!">
            <Popover
              content={(
                <Col>
                  <Row style={{ padding: '5px' }}>
                    <Button
                      type="primary"
                      loading={userRequesting}
                      onClick={() => sendConfirmation(data.id)}
                      block
                    >
                      Enviar Confirmação Novamente
                    </Button>
                  </Row>
                  <Row style={{ padding: '5px' }}>
                    <Button
                      loading={userRequesting}
                      onClick={() => confirmUser(confirmationToken)}
                      block
                    >
                      Confirmar Email
                    </Button>
                  </Row>
                </Col>
              )}
              title={(
                <>
                  <QuestionCircleOutlined style={{ padding: '10px' }} />
                  Deseja Reenviar o e-mail de confirmação?
                </>
              )}
              trigger="click"
            >
              <ExclamationCircleOutlined style={{ color: 'orange' }} />
            </Popover>
          </Tooltip>
        );
      },
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: 150,
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Criado em',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      width: 150,
      render: date => moment(date).format('DD/MM/YYYY'),
      sorter: {
        compare: (a, b) => moment(a.createAt) - moment(b.createAt),
        multiple: 3,
      },
      showSorterTooltip: false,
      ...getColumnSearchDateProps('createAt'),
    },
    {
      title: 'Tipo de usuário',
      dataIndex: 'roleId',
      key: 'roleId',
      align: 'center',
      width: 150,
      render: roleId => (
        <Text style={{ color: (roleId === 1) ? 'green' : '' }}>
          {(roleId === 1) ? 'Admin' : 'Usuário'}
        </Text>
      ),
      filters: [
        { text: 'Admin', value: 1 },
        { text: 'Usuário', value: 2 },
      ],
      onFilter: (value, record) => record.roleId === value,
    },
    {
      title: 'Depositos Pendentes',
      dataIndex: 'balance',
      key: 'balance.depositPending',
      align: 'center',
      width: 100,
      render: balance => `R$ ${numberToReais(centsToMoney(balance.depositPending))}`,
      sorter: {
        compare: (a, b) => parseInt(a.depositPending) - parseInt(b.depositPending),
        multiple: 4,
      },
      showSorterTooltip: false,
    },
    {
      title: 'Saques Pendentes',
      dataIndex: 'balance',
      key: 'balance.withdrawPending',
      align: 'center',
      width: 100,
      render: balance => `R$ ${numberToReais(centsToMoney(balance.withdrawPending))}`,
      sorter: {
        compare: (a, b) => parseInt(a.withdrawPending) - parseInt(b.withdrawPending),
        multiple: 5,
      },
      showSorterTooltip: false,
    },
    {
      title: 'Afiliação',
      dataIndex: ['affiliation', 'nickname'],
      key: 'affiliation',
      align: 'center',
      width: 200,
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80,
      render: (id) => (
        <Popconfirm
          title="Deseja mesmo apagar esse usuário?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okButtonProps={{
            type: 'primary',
            danger: true,
            loading: userRequesting,
          }}
          onConfirm={() => handleDelete(id)}
          placement="topRight"
          okText="Deletar"
          cancelText="Não"
        >
          <a><DeleteOutlined /></a>
        </Popconfirm>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      loading={loadingTable}
      dataSource={dataSource}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 700 }}
      sticky
    />
  );
};

TableUsers.propTypes = {
  idSelf: PropTypes.string.isRequired,
  editSelfProfile: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  userRequesting: PropTypes.bool.isRequired,
  sendConfirmation: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loadingTable: PropTypes.bool.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.any).isRequired,
  confirmUser: PropTypes.func.isRequired,
  handleDeposit: PropTypes.func.isRequired,
  handleWithdrawn: PropTypes.func.isRequired,
};

// TableUsers.defaultProps = {
//   onRegister: () => {},
//   beforeCancel: PropTypes.func,
// };
export default TableUsers;
