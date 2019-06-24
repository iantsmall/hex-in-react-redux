import { gridPoints } from 'utils/hexgrid';
import { RED_PLAYER, BLUE_PLAYER } from './constants';

// TODO replace with a nice in app GUI console for later reference
const recordDebugLog = msg =>
  typeof jest !== 'undefined' ? undefined : console.debug(msg); // eslint-disable-line no-console

// / simple converter function to make a 2d array from a 1d array
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

// / retrieve the neighbors of a hex from a matrix
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

// / find a path within hexes from the origin index to the destination index
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

// / determine who, if anyone, has won the game
const calculateWinner = hexes => {
  // calculate winner of HexTile game by determining which has a winning path
  const isblueWinner = findPath(0, hexes.length - 1, hexes);
  const isRedWinner = !isblueWinner && findPath(1, hexes.length - 2, hexes);
  if (isblueWinner) {
    return BLUE_PLAYER;
  }
  if (isRedWinner) {
    return RED_PLAYER;
  }
  return undefined;
};

const isRedNext = turnNumber => turnNumber % 2 === 0;

export {
  recordDebugLog,
  convertArrayToMatrix,
  getNeighbors,
  findPath,
  calculateWinner,
  isRedNext,
};
