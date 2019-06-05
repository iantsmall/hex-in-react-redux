/**
 *
 * Asynchronously loads the component for HexBoard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
