import { makeAutoObservable } from "mobx";
import { TaskData } from "../types/TaskData";


class TaskStore {
  taskToUpdate : TaskData = {
    description : '',
    dueDate : Date.now.toString(),
    id : 0,
    priority : 0,
    title : ''
  };

  isUpdateMode : boolean = false

  taskData: TaskData[] | null = null;

  showHeader : boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTask(tasks: TaskData[]) {
    this.taskData = tasks;
  }

  clearUser() {
    this.taskData = null;
  }

}

export const taskStore = new TaskStore();