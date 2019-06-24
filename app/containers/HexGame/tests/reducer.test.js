// import produce from 'immer';
import hexGameReducer from '../reducer';
// import { someAction } from '../actions';

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
});
