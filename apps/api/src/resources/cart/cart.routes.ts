import { routeUtil } from 'utils';

import get from './actions/get';
import add from './actions/add';
import count from './actions/count';
import remove from './actions/remove';
import update from './actions/update';
import getHistory from './actions/get-history';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  get,
  add,
  count,
  remove,
  update,
  getHistory,
]);

const adminRoutes = routeUtil.getRoutes([
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
