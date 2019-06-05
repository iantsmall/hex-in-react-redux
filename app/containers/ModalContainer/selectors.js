import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the modalContainer state domain
 */

const selectModalContainerDomain = state =>
  state.modalContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ModalContainer
 */

const makeSelectModalContainer = () =>
  createSelector(
    selectModalContainerDomain,
    substate => substate,
  );

export default makeSelectModalContainer;
export { selectModalContainerDomain };
