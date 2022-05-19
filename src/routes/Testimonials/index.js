import React, { useEffect } from 'react';
import {
  Layout,
  Table,
  Tooltip,
  Popconfirm,
  Typography,
  Tag,
  Button,
  Input,
  Space,
} from 'antd';
import {
  QuestionCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import {
  testimonyDeleteAction,
  testimonyUpdateAction,
  testimonialsListAction,
} from '@redux/testimonials/actions';

const Testimonials = () => {
  const { testimonials, testimonialsRequesting } = useSelector(selectState('testimonials', 'testimonials'));
  const getTestimonials = useActions(testimonialsListAction);
  const updateTestimony = useActions(testimonyUpdateAction);
  const deleteTestimony = useActions(testimonyDeleteAction);

  useEffect(() => {
    getTestimonials();
  }, []);

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

  const handleYes = (row) => {
    const status = (row.status === 'VISIBLE') ? 'HIDDEN' : 'VISIBLE';
    const { id } = row;
    updateTestimony(id, {
      status,
      onSuccess: () => getTestimonials(),
    });
  };

  const handleDelete = (id) => {
    deleteTestimony(id, { onSuccess: () => getTestimonials() });
  };

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
      title: 'Aprovado?',
      dataIndex: 'status',
      key: 'status',
      width: 128,
      align: 'center',
      render: (status, row) => {
        if (status === 'PENDING') {
          return (
            <Tag color="blue" key={status}>
              Pendente usuário
            </Tag>
          );
        }

        return (
          <Popconfirm
            title={(
              <Typography.Text strong>
                {(status === 'VISIBLE') ?
                  'Recusar o depoimento?' :
                  'Deseja aprovar o Depoimento?'
                }
              </Typography.Text>
            )}
            icon={(status === 'VISIBLE') ?
              <CloseCircleOutlined style={{ color: 'orange' }} /> :
              <CheckOutlined style={{ color: 'green' }} />}
            onConfirm={() => handleYes(row)}
            okText="Sim"
            cancelText="Não"
            okButtonProps={{
              type: 'primary',
              style: {
                backgroundColor: (status === 'VISIBLE') ? 'orange' : 'green',
                borderColor: (status === 'VISIBLE') ? 'orange' : 'green',
              },
            }}
          >
            <Tag color={(status === 'VISIBLE') ? 'green' : 'orange'} key={status}>
              <a>{(status === 'VISIBLE') ? 'Aprovado' : 'Recusado'}</a>
            </Tag>
          </Popconfirm>
        );
      },
      filters: [
        { text: 'Aprovado', value: 'VISIBLE' },
        { text: 'Pendente', value: 'PENDING' },
        { text: 'Recusado', value: 'HIDDEN' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Descrição',
      dataIndex: 'testimony',
      key: 'testimony',
      width: 400,
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: testimony => (
        <Tooltip placement="topLeft" title={testimony}>
          {testimony}
        </Tooltip>
      ),
      ...getColumnSearchProps('testimony'),
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'testimoidny',
      width: 100,
      align: 'center',
      render: id => (
        <Popconfirm
          title="Deseja mesmo apagar esse depoimento?"
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
      ),
    },
  ];

  return (
    <Layout>
      <Table
        columns={columns}
        loading={testimonialsRequesting}
        dataSource={
          Object.values(testimonials).map((element) => {
            const { user, ...rest } = element;
            if (!user) return null;
            rest.nickname = user.nickname;
            rest.userId = user.userId;
            return rest;
          })
        }
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 700 }}
        sticky
      />
    </Layout>
  );
};

export default Testimonials;
