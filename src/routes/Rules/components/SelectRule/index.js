import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Select, Row } from 'antd';
import { useSelector } from 'react-redux';
import { selectState } from '@redux';
import OnLoadSpin from 'components/OnLoadSpin';

const SelectRule = ({ handleChange, defaultGame }) => {
  const { rules, rulesRequesting } = useSelector(selectState('rules', 'rules'));

  return (
    <OnLoadSpin loading={rulesRequesting}>
      <Row justify="start">
        <Typography.Title>Regras</Typography.Title>
        <Select
          size="large"
          onChange={handleChange}
          style={{ width: 360, height: 80, textAlign: 'left' }}
          bordered={false}
          defaultValue={defaultGame}
        >
          {Object.values(rules).map((e) => (
            <Select.Option value={e.game} key={e.id}>
              <Typography.Title>{e.game.toLowerCase()}</Typography.Title>
            </Select.Option>
          ))}
        </Select>
      </Row>
    </OnLoadSpin>
  );
};

SelectRule.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultGame: PropTypes.string,
};

SelectRule.defaultProps = {
  defaultGame: '',
};

export default SelectRule;
