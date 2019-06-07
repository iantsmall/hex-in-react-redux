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
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  DropdownButton,
  DropdownItem,
  Alert,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import HexBoard from 'components/HexBoard';
import makeSelectHexGame from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
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
  const status = hexGame.winner
    ? `Winner: ${hexGame.winner}`
    : `Next player: ${hexGame.isRedNext ? 'Red' : 'Blue'}`;
  if (boardSize !== hexGame.boardSize) {
    // handle boardSize being different than hexGame.boardSize
    dispatch(changeBoardSizeAction(hexGame.boardSize));
    // return an empty fragment while we let the actions settle out
    return <React.fragment />;
  }
  return (
    <Container className="game">
      <Row>
        <Col xs={12} className="game-controls">
          <ButtonToolbar className="d-flex flex-column">
            <ButtonGroup>
              <Button href="#" onClick={dispatch(jumpToFirstAction())}>
                &lt;&lt;
              </Button>
              <Button href="#" onClick={dispatch(jumpToPreviousAction())}>
                &lt;
              </Button>
              <DropdownButton title="" id="bg-justified-dropdown">
                {hexGame.history.map((turn, move) => (
                  <DropdownItem
                    key={
                      move /* eslint-disable-line react/no-array-index-key */
                    }
                    eventKey={move}
                    onClick={() => jumpToAction({ destination: move })}
                  >
                    {move ? `Move #${move}` : 'Game start'}
                  </DropdownItem>
                ))}
              </DropdownButton>
              <Button href="#" onClick={dispatch(jumpToNextAction())}>
                &gt;
              </Button>
              <Button href="#" onClick={dispatch(jumpToLastAction())}>
                &gt;&gt;
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <Alert variant={hexGame.winner ? 'success' : 'info'}>{status}</Alert>
        </Col>
        <Col sm={6} xs={12} className="game-info" />
      </Row>
      <Row>
        <Col xs={12}>
          <HexBoard
            id="game-board"
            type="pointy-topped"
            size={10}
            width={hexGame.boardSize}
            height={hexGame.boardSize}
            oX={10}
            oY={10}
            hexes={hexGame.current.hexes}
            onClick={hexKey => dispatch(claimHexAction({ hexKey }))}
          />
        </Col>
      </Row>
    </Container>
  );
}

HexGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boardSize: PropTypes.number.isRequired,
  hexGame: PropTypes.shapeOf({
    history: PropTypes.array.isRequired,
    boardSize: PropTypes.number.isRequired,
    current: PropTypes.array.isRequired,
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
