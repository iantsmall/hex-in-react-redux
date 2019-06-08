/*
 * MenuView Messages
 *
 * This contains all the text for the MenuView component.
 */
import React from 'react';
import { defineMessages } from 'react-intl';

export const scope = 'app.components.MenuView';

export default defineMessages({
  brand: {
    id: `${scope}.header`,
    defaultMessage: 'Hex in React',
  },
  project: {
    id: `${scope}.project`,
    defaultMessage: 'A {projectType} Project',
    values: {
      projectType: <strong>React in Every Framework</strong>,
    },
  },
  rules: {
    id: `${scope}.rules`,
    defaultMessage: 'Game Rules',
  },
  comingSoon: {
    id: `${scope}.comingSoon`,
    defaultMessage: 'Coming Soon',
  },
});
