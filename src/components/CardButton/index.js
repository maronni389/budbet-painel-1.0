import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Spin } from 'antd';
import { numberToReais, centsToMoney } from 'utils/formats';
import { Icons } from '../../assets/icons';
import './style.scss';

const CardButton = ({
  value,
  noMoney,
  backgroundColor,
  blackText,
  onClick,
  text,
  icon,
  onLoad,
}) => {
  const fontColor = (blackText) ? 'black' : 'white';

  const choseIcon = (icon, blackText) => {
    switch (icon.toLowerCase()) {
    case '$':
    case 'dollar':
    case 'money':
      return (blackText) ?
        <img src={Icons.money} alt="" height="75" /> :
        <img src={Icons.moneyWhite} alt="" height="75" />;
    case 'bill':
    case 'receipt':
    case 'bets':
      return (blackText) ?
        <img src={Icons.receipt} alt="" height="75" /> :
        <img src={Icons.receiptWhite} alt="" height="75" />;
    case 'schedule':
    case 'clock':
    case 'wait':
    case 'scheduled':
      return (blackText) ?
        <img src={Icons.schedule} alt="" height="75" /> :
        <img src={Icons.scheduleWhite} alt="" height="75" />;
    default:
      return null;
    }
  };

  const showValue = (valueIn, noMoney) => {
    const value = (!valueIn) ? 0 : valueIn;
    if (noMoney) return value;
    return (`R$ ${numberToReais(centsToMoney(value))}`);
  };

  return (
    <Button
      className="cardButton"
      type="primary"
      block
      size="large"
      style={{
        borderRadius: 10,
        backgroundColor,
        borderColor: backgroundColor,
        height: 100,
        boxShadow: 10,
        minWidth: 280,
      }}
      onClick={onClick}
    >
      <Spin spinning={onLoad} tip="Loading...">
        <Row justify="center" wrap="false">
          <Col flex="75px" className="d-none d-sm-flex">
            {choseIcon(icon, blackText)}
          </Col>
          <Col flex="auto">
            <Row style={{ color: fontColor, fontSize: 16 }} justify="center">
              {text}
            </Row>
            <Row style={{ color: fontColor, fontSize: 32 }} justify="center">
              {showValue(value, noMoney)}
            </Row>
          </Col>
        </Row>
      </Spin>
    </Button>
  );
};

CardButton.propTypes = {
  /**
   * value of card.
   */
  value: PropTypes.number.isRequired,
  /**
   * Background card color.
   */
  backgroundColor: PropTypes.string,
  /**
   * font card color.
   */
  blackText: PropTypes.bool,
  /**
   * text before value R$
   */
  text: PropTypes.string,
  /**
   * function on Click
   */
  onClick: PropTypes.func,

  /* icon to side text on list */
  icon: PropTypes.string,

  /* change format to simple number */
  noMoney: PropTypes.bool,

  /* spin on load */
  onLoad: PropTypes.bool,
};

CardButton.defaultProps = {
  onClick: () => {},
  backgroundColor: '#343743',
  blackText: false,
  text: '',
  icon: '',
  noMoney: false,
  onLoad: false,
};

export default CardButton;
