import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Form,
  Select,
  Button,
  Typography,
  Tag,
  message,
  Row,
} from 'antd';

const { Title } = Typography;

const EnterNumbers = ({
  handleSubmit,
  gameSequency,
  bingoStatus,
  loading,
}) => {
  const limitNumbers = 7;
  const [betNumbers, setBetNumbers] = useState([]);

  const onChange = (value) => {
    setBetNumbers(value);
  };

  const onClick = (num) => {
    const value = ((betNumbers.length + 1) * 100) + num;
    setBetNumbers((previewState) => ([...previewState, value]));
  };

  const buttons = [];
  for (let i = 0; i < 100; i++) {
    buttons.push(
      <Button
        shape="circle"
        className="ant-tag-green
        bingoStyle"
        onClick={() => onClick(i)}
        key={i}
        disabled={betNumbers.length >= limitNumbers || loading}
        loading={loading}
      >
        {(`00${i}`).slice(-2)}
      </Button>,
    );
  }

  const tagRender = (props) => {
    // eslint-disable-next-line react/prop-types
    const { value, closable, onClose } = props;
    const value2 = (`${value}`).slice(-2);
    return (
      <Tag color="green" closable={closable} onClose={onClose} className="bingoStyle">
        {(`00${value2}`).slice(-2)}
      </Tag>
    );
  };

  const onFinish = () => {
    if (betNumbers.length < 1) {
      message.error('Você precisa escolher 1 dezena pelo menos');
    } else {
      const numbers = betNumbers.map((value, i) => (value - ((i + 1) * 100)));
      handleSubmit({ numbers });
      setBetNumbers([]);
    }
  };

  const rows = (array, start, end) => {
    const line = [];
    for (let i = start; i < end; i++) {
      line.push(array[i]);
    }
    return (
      <Row key={`${start}-${end}`} justify="center">
        {line}
      </Row>
    );
  };

  return (
    <Layout>
      <Title style={{ textAlign: 'center' }}>
        {`Sorteio do Jogo #${gameSequency}`}
      </Title>
      {bingoStatus !== 'FINISHED' ? null : (<Title>Jogo já finalizado</Title>) }
      <Form
        layout="vertical"
        name="saque"
        onFinish={onFinish}
      >
        <Form.Item
          label="Números sorteados:"
        >
          <Select
            mode="multiple"
            size="large"
            tagRender={tagRender}
            style={{ width: '100%' }}
            maxTagCount={limitNumbers}
            onChange={onChange}
            value={betNumbers}
            dropdownRender={() => null}
          >
            <Select.Option />
          </Select>
          {rows(buttons, 0, 10)}
          {rows(buttons, 10, 20)}
          {rows(buttons, 20, 30)}
          {rows(buttons, 30, 40)}
          {rows(buttons, 40, 50)}
          {rows(buttons, 50, 60)}
          {rows(buttons, 60, 70)}
          {rows(buttons, 70, 80)}
          {rows(buttons, 80, 90)}
          {rows(buttons, 90, 100)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={betNumbers.length === 0 || bingoStatus === 'FINISHED'}
          >
            Finalizar sorteio
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );

};

EnterNumbers.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  gameSequency: PropTypes.number,
  bingoStatus: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

EnterNumbers.defaultProps = {
  gameSequency: -1,
  loading: false,
};

export default EnterNumbers;
