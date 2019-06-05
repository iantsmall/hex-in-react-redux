import React from 'react';
import { gridPoints } from 'utils/hexgrid';
import {
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

// TODO replace with a nice in app GUI console for later reference
const recordDebugLog = (msg) => console.debug(msg);

const convertArrayToMatrix = (arr, width) => {
  const rows = [];
  for (let index = 0; index < arr.length; index += 1) {
    const nextElement = arr[index];
    const isFirstRowElement = index % width === 0;
    if (isFirstRowElement) {
      // make a new row from first element
      rows.push([nextElement]);
    } else {
      // push onto current row
      rows[rows.length - 1].push(nextElement);
    }
  }
  return rows;
};

const getNeighbors = (hex, matrix) => {
  const getHex = (x, y) => (matrix[y] !== undefined ? matrix[y][x] : undefined);
  const upLeft = getHex(hex.x, hex.y - 1);
  const upRight = getHex(hex.x + 1, hex.y - 1);
  const left = getHex(hex.x - 1, hex.y);
  const right = getHex(hex.x + 1, hex.y);
  const downLeft = getHex(hex.x - 1, hex.y + 1);
  const downRight = getHex(hex.x, hex.y + 1);
  return [upLeft, upRight, right, downRight, downLeft, left];
};

const findPath = (origin, desination, hexes) => {
  // convert raw hexes into more useful matrix storage
  const originType = hexes[origin];
  const destinationType = hexes[desination];
  if (originType !== destinationType) {
    return false; // return false, as these are not matching hexes
  }
  // store board width/height size (calculation not cheap)
  const bsize = Math.sqrt(hexes.length);
  // make new hexArray containing grid data (ensures filled in array)
  const mapper = (point, index) => ({
    owner: hexes[index],
    x: point.gridX,
    y: point.gridY,
    visited: false,
  });
  const hexArray = gridPoints('pointy-topped', 1, 1, 1, bsize, bsize).map(
    mapper,
  );
  // get origin and desination hexes
  const originHex = hexArray[origin];
  const destinationHex = hexArray[desination];
  // convert array to matrix
  const hexGrid = convertArrayToMatrix(hexArray, bsize);
  // simple breadth first search for path in matrix of hexes
  const toVisit = [originHex]; // hexes to visit
  // while toVisit is not empty visit the next hex.
  recordDebugLog(`Starting path finding ${originHex.owner}`);
  for (
    let nextHex = toVisit.shift();
    nextHex !== undefined;
    nextHex = toVisit.shift()
  ) {
    recordDebugLog(`    Visting${JSON.stringify(nextHex)}`);
    nextHex.visited = true;
    // check if next hex is the desintation, return true if yes
    if (nextHex === destinationHex) {
      return true; // we've found our destination, we can return true
    }
    // add neighbors to toVisit IF they have the same owner AND they haven't already been visited
    const neighbors = getNeighbors(nextHex, hexGrid);
    for (
      let nextNeighbor = neighbors.shift();
      neighbors.length > 0;
      nextNeighbor = neighbors.shift()
    ) {
      const isVisitable =
        nextNeighbor !== undefined &&
        nextNeighbor.owner === nextHex.owner &&
        !nextNeighbor.visited;
      if (isVisitable) {
        recordDebugLog(`        Adding${JSON.stringify(nextNeighbor)}`);
        toVisit.push(nextNeighbor);
      }
    }
  }
  recordDebugLog('Finished path finding');
  return false;
};

const calculateWinner = hexes => {
  // calculate winner of HexTile game by determining which has a winning path
  const isblueWinner = findPath(0, hexes.length - 1, hexes);
  const isRedWinner = !isblueWinner && findPath(1, hexes.length - 2, hexes);
  if (isblueWinner) {
    return 'blue';
  }
  if (isRedWinner) {
    return 'red';
  }
  return undefined;
};

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
      xIsNext: true,
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
    hexes[i] = this.state.xIsNext ? 'red' : 'blue';
    this.setState({
      history: history.concat([
        {
          hexes,
        },
      ]),
      turnNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(turn) {
    this.setState({
      turnNumber: turn,
      xIsNext: turn % 2 === 0,
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
      status = `Next player: ${this.state.xIsNext ? 'Red' : 'Blue'}`;
    }

    return (
      <Container className="game">
        <Row>
          <Col xs={12} className="game-controls">
            <ButtonGroup justified>
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
            <Alert bsStyle={winner ? 'success' : 'info'}>{status}</Alert>
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
