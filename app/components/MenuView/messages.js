/*
 * MenuView Messages
 *
 * This contains all the text for the MenuView component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.MenuView';

export default defineMessages({
  brand: {
    id: `${scope}.header`,
    defaultMessage: 'Ian T Small',
  },
  project: {
    id: `${scope}.project`,
    defaultMessage: 'Hex In React',
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
