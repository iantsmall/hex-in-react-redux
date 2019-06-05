import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the menu state domain
 */

const selectMenuDomain = state => {
  let next = { ...(state.menu || initialState) };
  // const location = state.router.location;
  // next.showRules = next.showRules||(location.hash === '#rules');
  // next.showComingSoon = next.showComingSoon||(location.hash === '#comingsoon');
  return next;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Menu
 */

const makeSelectMenu = () =>
  createSelector(
    selectMenuDomain,
    substate => substate,
  );

export default makeSelectMenu;
export { selectMenuDomain };
