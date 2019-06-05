/*
 *
 * Menu constants
 *
 */

// simple function for setting the menu namespace for token constants
const menuNS = val => `app/Menu/${val}`;

export const NAVIGATE_ACTION = menuNS('NAVIGATE_ACTION');
export const SHOW_RULES_ACTION = menuNS('SHOW_RULES_ACTION');
export const SHOW_COMING_SOON_ACTION = menuNS('SHOW_COMING_SOON_ACTION');
export const HIDE_RULES_ACTION = menuNS('HIDE_RULES_ACTION');
export const HIDE_COMING_SOON_ACTION = menuNS('HIDE_COMING_SOON_ACTION');
