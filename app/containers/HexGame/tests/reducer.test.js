// import produce from 'immer';
import hexGameReducer from '../reducer';
import {
  jumpToAction,
  // jumpToNextAction,
  // jumpToPreviousAction,
  // jumpToFirstAction,
  // jumpToLastAction,
  claimHexAction,
  changeBoardSizeAction,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('hexGameReducer', () => {
  it('returns the initial state', () => {
    expect(hexGameReducer(undefined, {})).toMatchSnapshot();
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
  it.skip('should handle the changeBoardSizeAction action correctly', () => {
    const action = changeBoardSizeAction({ boardSize: 9 });
    const initState = hexGameReducer(undefined, {});
    const newState = hexGameReducer(initState, action);
    // consider checking for specific changes instead of a snapshot
    expect(newState).toMatchSnapshot();
  });
  it.skip('should handle the claimHexAction action correctly', () => {
    const action = claimHexAction({ hexKey: 7 });
    const initState = hexGameReducer(undefined, {});
    const newState = hexGameReducer(initState, action);
    // consider checking for specific changes instead of a snapshot
    expect(newState).toMatchSnapshot();
  });
  it.skip('should handle the jumpToAction action correctly when requesting turns not yet reached', () => {
    const initState = hexGameReducer(undefined, {});
    const destinationTurn = 1; // with no moves, turn one does not exist
    const action = jumpToAction(destinationTurn);
    // state should be unchanged when requesting invalid turn
    const expectedResult = initState;
    // consider checking for specific changes instead of a snapshot
    expect(hexGameReducer(initState, action)).toEqual(expectedResult);
  });
});
