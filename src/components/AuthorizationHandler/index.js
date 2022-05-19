/**
 * This wraps all routes, and is mounted anytime a user is viewing the application.
 * It verifies that a user is authroized to view the application and spawns a token refresh process.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { get } from 'lodash';
import { selectState } from '@redux';


const AuthorizationHandler = ({ children }) => {
  const { tokenInfo } = useSelector(selectState('auth', 'tokenInfo'));
  const accessToken = get(tokenInfo, 'accessToken');
  const roleId = get(tokenInfo, 'roleId');

  if (!accessToken || roleId > 2) return <Redirect to="/" />;

  return children;
};

AuthorizationHandler.propTypes = {
  children: PropTypes.node.isRequired,
  tokenInfo: PropTypes.shape({}),
};

AuthorizationHandler.defaultProps = {
  tokenInfo: {},
};

export default AuthorizationHandler;
