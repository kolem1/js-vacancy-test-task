import { routeUtil } from 'utils';

import get from './actions/get';
import signUp from './actions/sign-up';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import verifyEmail from './actions/verify-email';

const publicRoutes = routeUtil.getRoutes([
  signUp,
  signIn,
  signOut,
  verifyEmail,
]);

const privateRoutes = routeUtil.getRoutes([
  get,
]);

export default {
  publicRoutes,
  privateRoutes,
};
