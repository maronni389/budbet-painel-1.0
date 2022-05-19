import React, { useState } from 'react';
import {
  Layout,
  Table,
  Tooltip,
  Popconfirm,
  Typography,
  Button,
  Form,
  Input,
  Modal,
  Space,
} from 'antd';
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useActions, selectState } from '@redux';
import {
  faqCreateAction,
  faqDeleteAction,
  faqUpdateAction,
  faqListAction,
} from '@redux/faq/actions';

moment.locale('pt-BR');

const FAQ = () => {
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
  const { faqs, faqsRequesting } = useSelector(selectState('faq', 'faqs'));
  const getFAQ = useActions(faqListAction);
  const createFAQ = useActions(faqCreateAction);
  const updateFAQ = useActions(faqUpdateAction);
  const deleteFAQ = useActions(faqDeleteAction);

  React.useEffect(() => {
    getFAQ();
  }, []);

  const handleDelete = (id) => {
    deleteFAQ(id, { onSuccess: () => getFAQ() });
  };

  const [formFAQFields] = Form.useForm();
  const [selectedFAQ, setSelectedFAQ] = useState({});

  const handleEdit = (row) => {
    setSelectedFAQ(row);
    formFAQFields.setFieldsValue({ ...row });
  };

  const handleCancel = () => {
    setSelectedFAQ({});
    formFAQFields.setFieldsValue({ question: '', answer: '' });
  };

  const onSuccessSubmit = () => {
    handleCancel();
    getFAQ();
  };

  const onSubmit = (values) => {
    if (selectedFAQ.id === 'new') {
      createFAQ({
        ...values,
        onSuccess: () => onSuccessSubmit(),
      });
    } else {
      updateFAQ(selectedFAQ.id, {
        ...values,
        onSuccess: () => onSuccessSubmit(),
      });
    }
  };

  const columns = [
    {
      title: 'Pergunta',
      dataIndex: 'question',
      key: 'question',
      align: 'center',
      width: 400,
      ...getColumnSearchProps('question'),
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
      title: 'Pergunta',
      dataIndex: 'answer',
      key: 'answer',
      align: 'center',
      width: 400,
      ...getColumnSearchProps('answer'),
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
      title: 'Editar',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      width: 100,
      render: (id, row) => (
        <a>
          <EditOutlined onClick={() => handleEdit(row)} />
        </a>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 100,
      render: id => (
        <Popconfirm
          title="Deseja mesmo apagar essa pergunta e Resposta?"
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
      <Typography.Title>Perguntas Frequentes</Typography.Title>
      <Button
        type="primary"
        onClick={() => setSelectedFAQ({ id: 'new' })}
      >
        Adicionar nova Pergunta e Resposta
      </Button>
      <Table
        columns={columns}
        loading={faqsRequesting}
        dataSource={
          Object.values(faqs).sort((a, b) => moment(b.createAt) - moment(a.createAt))
        }
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 700 }}
        sticky
      />

      <Modal visible={selectedFAQ.id} onCancel={handleCancel} footer={null}>
        <Form
          layout="vertical"
          name="criar jogo"
          onFinish={onSubmit}
          form={formFAQFields}
        >
          <Form.Item
            name="question"
            label="Pergunta:"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha a pergunta',
                maxLength: 240,
              },
            ]}
          >
            <Input.TextArea maxLength={240} rows={4} />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Resposta:"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor preencha a resposta',
                maxLength: 240,
              },
            ]}
          >
            <Input.TextArea maxLength={240} rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Salvar Pergunta e Resposta
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </Layout>
  );
};

export default FAQ;
