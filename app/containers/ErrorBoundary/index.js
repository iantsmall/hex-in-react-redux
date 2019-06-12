/**
 *
 * ErrorBoundary
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';

import messages from './messages';

const Error = styled.div`
  width: 90%;
  height: 80%;
  max-height: 80%;
  margin: 5%;
  padding: 15px;
  border-radius: 10px;
  background: steelblue;
`;

const ErrorContent = styled.div`
  height: 100%;
  padding: 15px;
  border-radius: 5px;
  background: aliceblue;
`;

const Scroll = styled.div`
  height: 100%;
  overflow: auto;
`;

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <Error>
          <Helmet>
            <title>Something Unexpected Happened</title>
            <meta
              name="description"
              content="An Unexpected Error Has Occured"
            />
          </Helmet>
          <ErrorContent>
            <Scroll>
              <h2>
                <FormattedMessage {...messages.header} />
              </h2>
              <details style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details>
            </Scroll>
          </ErrorContent>
        </Error>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.any,
  errorInfo: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.element.isRequired,
  ]),
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ErrorBoundary);
