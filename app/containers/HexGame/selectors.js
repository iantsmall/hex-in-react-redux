import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { calculateWinner, isRedNext } from './utils';

/**
 * Direct selector to the hexGame state domain
 */

const selectHexGameDomain = state => {
  const storedState = state.hexGame || initialState;
  return {
    ...storedState,
    winner: calculateWinner(storedState.history[storedState.turnNumber]),
    isRedNext: isRedNext(storedState.turnNumber),
  };
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by HexGame
 */

const makeSelectHexGame = () =>
  createSelector(
    selectHexGameDomain,
    substate => substate,
  );

export default makeSelectHexGame;
export { selectHexGameDomain };
