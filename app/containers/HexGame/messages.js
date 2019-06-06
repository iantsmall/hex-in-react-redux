/*
 * HexGame Messages
 *
 * This contains all the text for the HexGame container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HexGame';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HexGame container!',
  },
});
