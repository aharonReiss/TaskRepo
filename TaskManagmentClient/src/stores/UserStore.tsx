import { makeAutoObservable } from "mobx";
import { UserData } from "../types/UserData";
import TaskAppStorage from "../utils/TaskAppStorage";

class UserStore {
  userData: UserData | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: UserData) {
    this.userData = user;
  }

  clearUser() {
    this.userData = null;
  }
  
}

export const userStore = new UserStore();