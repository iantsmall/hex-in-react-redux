import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { calculateWinner } from './utils.js'

/**
 * Direct selector to the hexGame state domain
 */

const selectHexGameDomain = state => {
  const storedState = state.hexGame || initialState;
  const winner = calculateWinner(storedState);
  return {
    ...storedState,
    winner,
    isRedNext: selectIsRedNext(storedState)
  };
}

/**
 * Other specific selectors
 */
 
 const selectIsRedNext = (state) => state.turnNumber % 2 === 0;

 const selectWinner = (state) =>
  calculateWinner(state.history[state.turnNumber].hexes);

/**
 * Default selector used by HexGame
 */

const makeSelectHexGame = () =>
  createSelector(
    selectHexGameDomain,
    substate => substate,
  );

export default makeSelectHexGame;
export { selectHexGameDomain, selectIsRedNext };
