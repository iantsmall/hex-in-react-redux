/**
 *
 * PageWrapper
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Background from 'images/bg.jpg';
import ErrorBoundary from 'containers/ErrorBoundary';
import Menu from 'containers/Menu/Loadable';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0px;
  background-image: url(${Background});
  background-repeat: repeat-y;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow-x: hidden;
  @media (min-width: 100px) and (max-width: 728px) and (orientation: portrait) {
    margin: 0px;
    background: url(${Background}) fixed no;
    overflow-x: hidden;
  }
`;

const bootstrapCssLinkProps = {
  rel: 'stylesheet',
  href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
  integrity:
    'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T',
  crossorigin: 'anonymous',
};

// const bootstrapCssLinkProps = {
// 	rel: "stylesheet",
// 	href: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css",
// 	integrity: "sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4",
// 	crossorigin: "anonymous",
// };

const PageWrapper = props => (
  <Wrapper>
    <Helmet>
      <link {...bootstrapCssLinkProps} />
    </Helmet>
    <ErrorBoundary {...props}>
      <Menu />
    </ErrorBoundary>
    <ErrorBoundary {...props} />
  </Wrapper>
);
PageWrapper.propTypes = {};

export default memo(PageWrapper);
