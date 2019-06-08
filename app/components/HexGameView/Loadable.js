/**
 *
 * Asynchronously loads the component for HexGameView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
