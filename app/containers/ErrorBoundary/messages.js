/*
 * ErrorBoundary Messages
 *
 * This contains all the text for the ErrorBoundary container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ErrorBoundary';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Something went wrong.',
  },
});
