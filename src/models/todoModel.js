import { v4 } from 'node-uuid';
import { immerable } from "immer";


export default class Todo {
  
  [immerable] = true;

  constructor(title) {
    this.id = v4();
    this.title = title;
    this.completed = false;
  }

};
