/**
 *
 * Asynchronously loads the component for HexGame
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
