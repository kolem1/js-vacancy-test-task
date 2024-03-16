import { routeUtil } from 'utils';

import stripe from './actions/stripe';

const publicRoutes = routeUtil.getRoutes([
  stripe,
]);

const privateRoutes = routeUtil.getRoutes([
]);

const adminRoutes = routeUtil.getRoutes([
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
