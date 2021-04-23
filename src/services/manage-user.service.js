import BaseHttpService from './base-http.service';

import queryString from 'query-string';

export default class UsersService extends BaseHttpService {
  fetchUsers() {
    const queryObj = {};
    const queryStr = queryString.stringify(queryObj);
    return this.get('manage-user' + (queryStr ? `?${queryStr}` : ''));
  }



}
