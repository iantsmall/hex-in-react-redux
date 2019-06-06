/**
 *
 * ModalContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectModalContainer from './selectors';
import reducer from './reducer';

export function ModalContainer(/* {dispatch} */) {
  useInjectReducer({ key: 'modalContainer', reducer });

  return (
    <div>
      <Helmet>
        <title>ModalContainer</title>
        <meta name="description" content="Description of ModalContainer" />
      </Helmet>
    </div>
  );
}

ModalContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modalContainer: makeSelectModalContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ModalContainer);
