import React, { useEffect, useState } from 'react';
import {
  Layout,
  Popconfirm,
  message,
  Space,
  Form,
  Input,
  Button,
  Table,
  Row,
  Tooltip,
} from 'antd';
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  EditFilled,
  SearchOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import {
  brazilianbanksListAction,
  brazilianbanksCreateAction,
  brazilianbanksDeleteAction,
  brazilianbanksUpdateAction,
} from '@redux/brasilianbanks/actions';

const Listbanks = () => {
  const history = useHistory();
  const { bankList, bankListRequesting } = useSelector(selectState('brazilianbanks', 'bankList'));
  const getBankList = useActions(brazilianbanksListAction);

  useEffect(() => {
    getBankList();
  }, []);

  /* Search props */
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
  /* End Search props */

  /* handle create, edit and delete */
  const [form] = Form.useForm();
  const [idBank, setIdBank] = useState('');
  const createNewBank = useActions(brazilianbanksCreateAction);
  const deleteBank = useActions(brazilianbanksDeleteAction);
  const updateBank = useActions(brazilianbanksUpdateAction);

  const onSuccess = (text) => {
    message.success(text);
    form.resetFields();
    setIdBank('');
  };
  const handleEdit = (id, data) => {
    setIdBank(id);
    form.setFieldsValue({ value: data.value, label: data.label });
  };
  const handleDelete = (id) => {
    deleteBank(id, {
      onSuccess: () => onSuccess('Banco deletado com sucesso.'),
    });
  };
  const onFinish = (values) => {
    if (idBank === '') {
      createNewBank({
        ...values,
        onSuccess: () => onSuccess('Banco adicionado a lista com sucesso.'),
      });
    } else {
      updateBank(idBank, {
        ...values,
        onSuccess: () => onSuccess('Banco editado com sucesso.'),
      });
    }
  };

  const columns = [
    {
      title: 'Editar',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80,
      render: (id, data) => <EditFilled onClick={() => handleEdit(id, data)} />,
    },
    {
      title: 'Codigo',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      width: 80,
      ...getColumnSearchProps('value'),
    },
    {
      title: 'Banco',
      dataIndex: 'label',
      key: 'label',
      align: 'center',
      width: 300,
      ...getColumnSearchProps('label'),
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80,
      render: (id) => (
        <Popconfirm
          title="Deseja mesmo apagar esse banco?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okButtonProps={{
            type: 'primary',
            danger: true,
            loading: bankListRequesting,
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
      <Row justify="start" style={{ marginBottom: '1em' }}>
        <LeftOutlined onClick={() => history.push('/depositar')} style={{ fontSize: '1.5em' }} />
      </Row>
      <Row justify="start">
        <Form layout="inline" form={form} onFinish={onFinish}>
          <Form.Item
            label="Código"
            name="value"
            rules={[
              {
                required: true,
                message: 'Por favor preencha o código',
                whitespace: true,
                max: 3,
              },
            ]}
          >
            <Input maxLength="3" />
          </Form.Item>
          <Form.Item
            label="Banco"
            name="label"
            rules={[
              {
                required: true,
                message: 'Por favor preencha o banco',
                whitespace: true,
                max: 255,
              },
            ]}
          >
            <Input maxLength="255" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              { (idBank === '') ? 'Cadastrar Banco' : 'Salvar Banco' }
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <Table
        columns={columns}
        loading={bankListRequesting}
        dataSource={Object.values(bankList)}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 700 }}
        sticky
      />
    </Layout>
  );
};

export default Listbanks;
