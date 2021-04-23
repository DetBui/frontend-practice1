import { observable, action } from 'mobx';

export default class UsersStore {
  @observable users = [];

  constructor(usersService) {
    this.usersService = usersService;
  }

  @action
  resetUsers() {
    this.users = [];
  }

  @action
  async fetchUsers() {
    const result = await this.usersService.fetchUsers();

    if (result) {
      this.users = result.data;
    }
  }

 
}
