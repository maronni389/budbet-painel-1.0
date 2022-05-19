import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'router';
import { Provider } from 'react-redux';
import moment from 'moment';
import { ErrorBoundary } from 'components';
import '@redux/localStorage';
import { configureStore, history } from '@redux/store';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import 'styles/app.scss';
import { ConnectedRouter } from 'connected-react-router';


moment.locale('pt-BR');

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
