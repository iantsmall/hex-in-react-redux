// import third party library things
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import LanguageProvider from 'containers/LanguageProvider';

// import internal config and utils
import defaultHistory from 'utils/history';
import { translationMessages } from './i18n';
import configureStore from './configureStore';

export default (
  ui,
  {
    initialState = {},
    history = defaultHistory,
    store = configureStore(initialState, history),
    messages = translationMessages,
  },
) => ({
  node: (
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>{ui}</ConnectedRouter>
      </LanguageProvider>
    </Provider>
  ),
  store,
  messages,
  history,
  initialState,
});
