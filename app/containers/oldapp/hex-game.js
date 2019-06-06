import React from 'react';
import { gridPoints } from 'utils/hexgrid';
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

class HexGame extends React.Component {
  constructor(props) {
    super(props);
    const initHexes = Array((props.boardSize + 2) ** 2);
    const boardSize = props.boardSize + 2;
    for (let i = 0; i < boardSize; i += 1) {
      const top = i;
      const bottom = initHexes.length - 1 - i;
      const left = i * boardSize;
      const right = left + boardSize - 1;
      // fill in top and bottom w/ red, fill in left and right w/ blue
      initHexes[top] = 'red';
      initHexes[left] = 'blue';
      initHexes[right] = 'blue';
      initHexes[bottom] = 'red';
    }
    // for (let i = 0; i < boardSize; i = i + 1) {}
    this.state = {
      history: [
        {
          hexes: initHexes,
        },
      ],
      turnNumber: 0,
      redIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const hexes = Array.from(current.hexes);
    // check if this hex is alredy defined OR if there is already a winner
    if (hexes[i] || calculateWinner(hexes)) {
      return;
    }
    hexes[i] = this.state.redIsNext ? 'red' : 'blue';
    this.setState({
      history: history.concat([
        {
          hexes,
        },
      ]),
      turnNumber: history.length,
      redIsNext: !this.state.redIsNext,
    });
  }

  jumpTo(turn) {
    this.setState({
      turnNumber: turn,
      redIsNext: turn % 2 === 0,
    });
  }

  render() {
    const boardSize = this.props.boardSize + 2;
    const { history } = this.state;
    const currentTurn = this.state.turnNumber;
    const current = history[this.state.turnNumber];
    const winner = calculateWinner(current.hexes);

    const moves = history.map((turn, move) => {
      const desc = move ? `Move #${move}` : 'Game start';
      return (
        <DropdownItem key={move} eventKey={move} onClick={() => this.jumpTo(move)}>
          {desc}
        </DropdownItem>
      );
    });

    // create handlers for click events to jump to various key turns
    const handleJumpToFirstTurn = () => {
      this.jumpTo(0);
    };
    const handleJumpToPrevTurn = () => {
      this.jumpTo(currentTurn > 0 ? currentTurn - 1 : 0);
    };
    const handleJumpToNextTurn = () => {
      this.jumpTo(
        currentTurn < history.length - 1 ? currentTurn + 1 : history.length - 1,
      );
    };
    const handleJumpToLastTurn = () => {
      this.jumpTo(history.length > 0 ? history.length - 1 : 0);
    };

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.redIsNext ? 'Red' : 'Blue'}`;
    }

    return (
      <Container className="game">
        <Row>
          <Col xs={12} className="game-controls">
            <ButtonToolbar className="d-flex flex-column">
              <ButtonGroup>
                <Button href="#" onClick={handleJumpToFirstTurn}>
                  &lt;&lt;
                </Button>
                <Button href="#" onClick={handleJumpToPrevTurn}>
                  &lt;
                </Button>
                <DropdownButton title="" id="bg-justified-dropdown">
                  {moves}
                </DropdownButton>
                <Button href="#" onClick={handleJumpToNextTurn}>
                  &gt;
                </Button>
                <Button href="#" onClick={handleJumpToLastTurn}>
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
              hexes={current.hexes}
              onClick={key => this.handleClick(key)}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HexGame;
