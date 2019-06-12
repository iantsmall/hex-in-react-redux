import {
  showRulesAction,
  showComingSoonAction,
  hideRulesAction,
  hideComingSoonAction,
} from '../actions';
import {
  SHOW_RULES_ACTION,
  SHOW_COMING_SOON_ACTION,
  HIDE_RULES_ACTION,
  HIDE_COMING_SOON_ACTION,
} from '../constants';

describe('Menu actions', () => {
  describe('Show Rules Action', () => {
    it('has a type of SHOW_RULES_ACTION', () => {
      const expected = {
        type: SHOW_RULES_ACTION,
      };
      expect(showRulesAction()).toEqual(expected);
    });
  });
  describe('Show Coming Soon Action', () => {
    it('has a type of SHOW_COMING_SOON_ACTION', () => {
      const expected = {
        type: SHOW_COMING_SOON_ACTION,
      };
      expect(showComingSoonAction()).toEqual(expected);
    });
  });
  describe('Hide Rules Action', () => {
    it('has a type of HIDE_RULES_ACTION', () => {
      const expected = {
        type: HIDE_RULES_ACTION,
      };
      expect(hideRulesAction()).toEqual(expected);
    });
  });
  describe('Hide Coming Soon Action', () => {
    it('has a type of HIDE_COMING_SOON_ACTION', () => {
      const expected = {
        type: HIDE_COMING_SOON_ACTION,
      };
      expect(hideComingSoonAction()).toEqual(expected);
    });
  });
});
