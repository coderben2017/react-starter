import { observable, action } from 'mobx';

class SchoolStore {
  @observable title;

  @action setTitle(title) {
    this.title = title;
  }
}

export default new SchoolStore();