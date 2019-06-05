/*
 *
 * Menu actions
 *
 */

import {
  SHOW_RULES_ACTION,
  SHOW_COMING_SOON_ACTION,
  HIDE_RULES_ACTION,
  HIDE_COMING_SOON_ACTION,
} from './constants';

export function showRulesAction() {
  return {
    type: SHOW_RULES_ACTION,
  };
}

export function showComingSoonAction() {
  return {
    type: SHOW_COMING_SOON_ACTION,
  };
}

export function hideRulesAction() {
  return {
    type: HIDE_RULES_ACTION,
  };
}

export function hideComingSoonAction() {
  return {
    type: HIDE_COMING_SOON_ACTION,
  };
}

