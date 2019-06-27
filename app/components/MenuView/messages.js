/*
 * MenuView Messages
 *
 * This contains all the text for the MenuView component.
 */
import { defineMessages } from 'react-intl';
import React from 'react';

export const scope = 'app.components.MenuView';

export default defineMessages({
  brand: {
    id: `${scope}.header`,
    defaultMessage: 'Ian T Small',
  },
  project: {
    id: `${scope}.project`,
    defaultMessage: 'A {projectType} Project',
    values: {
      projectType: <strong>Hex in Every Framework</strong>,
    },
  },
  game: {
    id: `${scope}.project`,
    defaultMessage: 'Hex In React-Redux',
  },
  rules: {
    id: `${scope}.rules`,
    defaultMessage: 'Rules',
  },
  comingSoon: {
    id: `${scope}.comingSoon`,
    defaultMessage: 'Roadmap',
  },
});
