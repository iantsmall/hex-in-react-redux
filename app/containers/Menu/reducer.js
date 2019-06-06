/*
 *
 * Menu reducer
 *
 */
import produce from 'immer';
import {
  SHOW_RULES_ACTION,
  SHOW_COMING_SOON_ACTION,
  HIDE_RULES_ACTION,
  HIDE_COMING_SOON_ACTION,
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const menuReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_RULES_ACTION:
        draft.showRules = true;
        delete draft.showComingSoon;
        break;
      case SHOW_COMING_SOON_ACTION:
        draft.showComingSoon = true;
        delete draft.showRules;
        break;
      case HIDE_RULES_ACTION:
      case HIDE_COMING_SOON_ACTION:
        delete draft.showRules;
        delete draft.showComingSoon;
        break;
    }
  });

export default menuReducer;
