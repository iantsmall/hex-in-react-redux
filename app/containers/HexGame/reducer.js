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
} from './constants';

import { calculateWinner } from './utils';

export const initialState = { boardSize: 9, history: [], turnNumber: 0 };

const isRedNext = turnNumber => turnNumber % 2 === 0;

const setTurn = (state, draft, newTurn) => {
  draft.push({
    turnNumber: Math.Max(0, Math.min(state.history.length - 1, newTurn)),
  });
};

const setHexClaimed = (state, draft, hexKey) => {
  const newHistory = state.history.slice(0, state.turnNumber + 1);
  const current = newHistory[newHistory.length - 1];
  const hexes = Array.from(current.hexes);
  // defensively check if this hex is alredy defined OR if there is already a winner
  if (!(hexes[hexKey] || calculateWinner(hexes))) {
    hexes[hexKey] = isRedNext(state.turnNumber) ? 'red' : 'blue';
    draft.push({
      history: newHistory.concat([{ hexes }]),
      turnNumber: newHistory.length,
    });
  }
};

/* eslint-disable default-case, no-param-reassign */
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
        setTurn(state, draft, state.currentTurn - 1);
        break;
      case JUMP_TO_NEXT_ACTION:
        setTurn(state, draft, state.currentTurn + 1);
        break;
      case CLAIM_HEX_ACTION:
        setHexClaimed(state, draft, action.hexKey);
        break;
      case CHANGE_BOARD_SIZE_ACTION:
        draft.push({ boardSize: action.boardSize });
        break;
    }
    // update calcluated state values (defensively always done after all actions)
    // TODO confirm this works as intended
    draft.push({
      isRedNext: isRedNext(draft.turnNumber),
      winner: calculateWinner(draft.history[draft.turnNumber].hexes),
    });
  });

export default hexGameReducer;
