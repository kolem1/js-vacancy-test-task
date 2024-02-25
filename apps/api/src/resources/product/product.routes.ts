import { routeUtil } from 'utils';

import create from './actions/create';
import listForUser from './actions/list-for-user';
import remove from './actions/remove';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  create, 
  listForUser,
  remove,
]);

const adminRoutes = routeUtil.getRoutes([
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
