/**
 *
 * HexGameView
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
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
// import messages from './messages';

function HexGameView({
  winner,
  isRedNext,
  handlers,
  history,
  boardSize,
  turnNumber,
}) {
  // TODO replace with FormattedMessages
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isRedNext ? 'Red' : 'Blue'}`;
  return (
    <Container className="game">
      <Row>
        <Col xs={12} className="game-controls">
          <ButtonToolbar className="d-flex flex-column">
            <ButtonGroup>
              <Button href="#" onClick={handlers.jumpToFirst}>
                &lt;&lt;
              </Button>
              <Button href="#" onClick={handlers.jumpToPrevious}>
                &lt;
              </Button>
              <DropdownButton title="" id="bg-justified-dropdown">
                {history.map((turn, move) => (
                  <DropdownItem
                    key={
                      move /* eslint-disable-line react/no-array-index-key */
                    }
                    eventKey={move}
                    onClick={() => handlers.jumpTo({ destination: move })}
                  >
                    {move
                      ? `Move #${move}`
                      : 'Game start' /* TODO replace with FormattedMessages */}
                  </DropdownItem>
                ))}
              </DropdownButton>
              <Button href="#" onClick={handlers.jumpToNext}>
                &gt;
              </Button>
              <Button href="#" onClick={handlers.jumpToLast}>
                &gt;&gt;
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <Alert variant={winner ? 'success' : 'info'}>{status}</Alert>
        </Col>
        <Col sm={6} xs={12} className="game-info" />
      </Row>
      <Row>
        <Col xs={12}>
          <HexBoard
            id="game-board"
            type="pointy-topped"
            size={10}
            width={boardSize}
            height={boardSize}
            oX={10}
            oY={10}
            hexes={history[turnNumber]}
            onClick={hexKey => handlers.claimHex({ hexKey })}
          />
        </Col>
      </Row>
    </Container>
  );
}

HexGameView.propTypes = {
  winner: PropTypes.string,
  isRedNext: PropTypes.bool.isRequired,
  handlers: PropTypes.shape({
    jumpToFirst: PropTypes.func.isRequired,
    jumpToPrevious: PropTypes.func.isRequired,
    jumpTo: PropTypes.func.isRequired,
    jumpToNext: PropTypes.func.isRequired,
    jumpToLast: PropTypes.func.isRequired,
    claimHex: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.array.isRequired,
  turnNumber: PropTypes.number.isRequired,
  boardSize: PropTypes.number.isRequired,
};

export default memo(HexGameView);
