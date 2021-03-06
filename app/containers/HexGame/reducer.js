/*
 *
 * HexGame reducer
 *
 */
import produce from 'immer';
import {
  JUMP_TO_ACTION,
  JUMP_TO_FIRST_ACTION,
  JUMP_TO_LAST_ACTION,
  JUMP_TO_PREVIOUS_ACTION,
  JUMP_TO_NEXT_ACTION,
  CLAIM_HEX_ACTION,
  CHANGE_BOARD_SIZE_ACTION,
  RED_PLAYER,
  BLUE_PLAYER,
} from './constants';

import { calculateWinner, isRedNext } from './utils';

const createInitState = boardSize => {
  const initHexes = Array(boardSize ** 2);
  for (let i = 0; i < boardSize; i += 1) {
    const top = i;
    const bottom = initHexes.length - 1 - i;
    const left = i * boardSize;
    const right = left + boardSize - 1;
    // fill in top and bottom w/ red, fill in left and right w/ blue
    initHexes[top] = RED_PLAYER;
    initHexes[left] = BLUE_PLAYER;
    initHexes[right] = BLUE_PLAYER;
    initHexes[bottom] = RED_PLAYER;
  }
  const turnNumber = 0;
  const history = [initHexes];
  return {
    boardSize,
    history,
    turnNumber,
  };
};

/* eslint-disable no-param-reassign */
const setTurn = (state, draft, newTurn) => {
  draft.turnNumber = Math.max(0, Math.min(state.history.length - 1, newTurn));
};

const setHexClaimed = (state, draft, hexKey) => {
  const history = state.history.slice(0, state.turnNumber + 1);
  const hexes = Array.from(history[history.length - 1]); // copy the "current" board state
  // defensively check if this hex is alredy defined OR if there is already a winner
  if (!(hexes[hexKey] || calculateWinner(hexes))) {
    hexes[hexKey] = isRedNext(state.turnNumber) ? RED_PLAYER : BLUE_PLAYER;
    history.push(hexes);
    draft.history = history;
    draft.turnNumber = history.length - 1;
  }
};

export const initialState = createInitState(5);

const hexGameReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case JUMP_TO_ACTION:
        setTurn(state, draft, action.destination);
        break;
      case JUMP_TO_FIRST_ACTION:
        setTurn(state, draft, 0);
        break;
      case JUMP_TO_LAST_ACTION:
        setTurn(state, draft, state.history.length - 1);
        break;
      case JUMP_TO_PREVIOUS_ACTION:
        setTurn(state, draft, state.turnNumber - 1);
        break;
      case JUMP_TO_NEXT_ACTION:
        setTurn(state, draft, state.turnNumber + 1);
        break;
      case CLAIM_HEX_ACTION:
        setHexClaimed(state, draft, action.hexKey);
        break;
      case CHANGE_BOARD_SIZE_ACTION:
        Object.assign(draft, createInitState(action.boardSize));
        break;
      default:
        break; // unrecognized action
    }
  });

export default hexGameReducer;
