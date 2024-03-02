import { routeUtil } from 'utils';

import create from './actions/create';
import listForUser from './actions/list-for-user';
import remove from './actions/remove';
import list from './actions/list';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  create, 
  listForUser,
  remove,
  list,
]);

const adminRoutes = routeUtil.getRoutes([
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
