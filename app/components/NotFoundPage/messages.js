/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Missing Page!',
  },
  text: {
    id: `${scope}.text`,
    defaultMessage: 'Sorry, I could not find that page.',
  },
});
