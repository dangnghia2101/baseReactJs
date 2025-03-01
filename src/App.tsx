import React from 'react';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import 'App.css';
import AppRoutes from 'routes';
import { history, store } from 'reduxs/store';

const App = () => {
  console.log('[history] ', history);
  console.log('[store] ', store);
  return (
    <>
      <Provider store={store}>
        <Router history={history}>
          <AppRoutes />
        </Router>
      </Provider>
    </>
  );
};

export default App;
