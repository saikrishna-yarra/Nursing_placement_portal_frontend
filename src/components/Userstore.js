import { extendObservable } from "mobx";
class userstore {
  constructor() {
    extendObservable(this, {
      loading: true,
      isLoggedIn: false,
      username: "",
    });
  }
}

export default new userstore();
