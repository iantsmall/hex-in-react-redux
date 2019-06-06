/*
 *
 * HexGame reducer
 *
 */
import produce from 'immer';
import { JUMP_TO_ACTION, CLAIM_HEX_ACTION } from './constants';
import {
  JUMP_TO_ACTION,
  JUMP_TO_FIRST_ACTION,
  JUMP_TO_LAST_ACTION,
  JUMP_TO_PREVIOUS_ACTION,
  JUMP_TO_NEXT_ACTION,
  CLAIM_HEX_ACTION,
} from './constants';
import { calculateWinner } from './utils';
import { selectIsRedNext } from './selectors'
export const initialState = {boardSize: 9, history:[], turnNumber: 0};



//TODO convert to pure actions, determine relative turns in reducer
// create handlers for click events to jump to various key turns
const jumpToFirstAction = () => {
  jumpToAction(0);
};
const jumpToPreviousAction = () => {
  jumpToAction();
};
const jumpToNextAction = () => {
  jumpToAction(
    currentTurn < history.length - 1 ? currentTurn + 1 : history.length - 1,
  );
};
const jumpToLastAction = () => {
  jumpToAction(history.length > 0 ? history.length - 1 : 0);
};

const setTurn = (state, draft, newTurn) => {
  turnNumber: Math.Max(0, Math.min(state.history.length-1, newTurn);
  ...draft,
}

/* eslint-disable default-case, no-param-reassign */
const hexGameReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case JUMP_TO_ACTION:
        draft = setTurn(state, draft, newTurn);
        break;
      case JUMP_TO_FIRST_ACTION:
        draft = setTurn(state, draft, 0);
        break;
      case JUMP_TO_LAST_ACTION:
        draft = setTurn(state, draft, state.history.length-1);
        break;
      case JUMP_TO_PREVIOUS_ACTION:
        draft = setTurn(state, draft, state.currentTurn-1);
        break;
      case JUMP_TO_NEXT_ACTION:
        draft = setTurn(state, draft, state.currentTurn+1);
        break;
      case CLAIM_HEX_ACTION:
        //TODO handle claim hex
        const newHistory = state.history.slice(0, state.turnNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const hexes = Array.from(current.hexes);
        // check if this hex is alredy defined OR if there is already a winner
        if ( !(hexes[i] || calculateWinner(hexes)) ) {
          hexes[i] = selectIsRedNext(state) ? 'red' : 'blue';
          draft = {
            history: newHistory.concat([{ hexes} ]),
            turnNumber: newHistory.length,
          };
        }
        break;
    }
  });

export default hexGameReducer;
