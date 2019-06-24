/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'components/HomePage/Loadable';
import NotFoundPage from 'components/NotFoundPage/Loadable';
import PageWrapper from 'components/PageWrapper';
import GlobalStyle from 'global-styles';

export default function App() {
  return (
    <PageWrapper>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </PageWrapper>
  );
}
