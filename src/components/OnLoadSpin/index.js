import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

const OnLoadSpin = ({ children, loading }) => {
  if (!loading) return children;
  return (
    <Spin tip="Loading...">
      {children}
    </Spin>
  );
};

OnLoadSpin.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

OnLoadSpin.defaultProps = {
  loading: false,
};

export default OnLoadSpin;
