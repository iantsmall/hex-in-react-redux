/**
 *
 * HexGame
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import HexGameView from 'components/HexGameView';
import makeSelectHexGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  jumpToAction,
  jumpToNextAction,
  jumpToPreviousAction,
  jumpToFirstAction,
  jumpToLastAction,
  claimHexAction,
  changeBoardSizeAction,
} from './actions';

export function HexGame({ boardSize, dispatch, hexGame }) {
  useInjectReducer({ key: 'hexGame', reducer });
  useInjectSaga({ key: 'hexGame', saga });
  if (boardSize + 2 !== hexGame.boardSize) {
    // handle boardSize being different than hexGame.boardSize
    dispatch(changeBoardSizeAction({ boardSize: boardSize + 2 }));
    // return an empty fragment while we let the actions settle out
    return <div />;
  }
  const viewProps = {
    handlers: {
      jumpToFirst: () => dispatch(jumpToFirstAction()),
      jumpToPrevious: () => dispatch(jumpToPreviousAction()),
      jumpToNext: () => dispatch(jumpToNextAction()),
      jumpToLast: () => dispatch(jumpToLastAction()),
      jumpTo: args => dispatch(jumpToAction(args)),
      claimHex: args => dispatch(claimHexAction(args)),
    },
    ...hexGame,
  };
  return <HexGameView {...viewProps} />;
}

HexGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boardSize: PropTypes.number.isRequired,
  hexGame: PropTypes.shape({
    boardSize: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  hexGame: makeSelectHexGame(),
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
)(HexGame);
