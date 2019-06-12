import { selectMenuDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectMenuDomain', () => {
  it('Should start with the initial state', () => {
    expect(selectMenuDomain({})).toEqual(initialState);
  });
  it('Should return the menu substate', () => {
    const menu = { showComingSoon: false, showRules: true };
    expect(selectMenuDomain({ menu })).toEqual(menu);
  });
});
