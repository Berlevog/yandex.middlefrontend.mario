/* eslint @typescript-eslint/no-non-null-assertion: 0 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { configureStore } from './store/configureStore';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
// @ts-ignore
const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
const { store } = configureStore(initialData);

const render = async () => {
  const { Router } = await import(/* webpackMode: "eager" */ './router');
  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      </Provider>,
  document.getElementById('root')
);
};

loadableReady(() => {
  render();
});

if (module.hot) {
  module.hot.accept('./router', () => {
    render();
  });
}
