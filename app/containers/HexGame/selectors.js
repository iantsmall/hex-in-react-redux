import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hexGame state domain
 */

const selectHexGameDomain = state => state.hexGame || initialState;

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
