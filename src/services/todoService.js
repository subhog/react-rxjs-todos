import { BehaviorSubject } from 'rxjs';
import { scan, publishReplay, skip, debounceTime, refCount } from 'rxjs/operators';
import { produce } from "immer";
import Todo from '../models/todoModel';


const initialTodos = JSON.parse(localStorage.getItem('react-rxjs-todos')) || [];
window.instances = [];


class TodoService {

  constructor() {
    this.actions = new BehaviorSubject(todos => todos);

    // console.log("INITIAL TODOS", initialTodos);

    // Reduce actions to a list of todos
    this.todos = this.actions.pipe(
      scan((todos, operation) => operation(todos), initialTodos),
      publishReplay(1),
      refCount()
    );

    // Save todos to local storage
    this.todos.pipe(
      skip(1),
      debounceTime(500)
    ).subscribe(
      todos => {
        console.log("SAVE!");
        return localStorage.setItem("react-rxjs-todos", JSON.stringify(todos));
      }
    );

    this.todos.pipe(
      scan((history, current) => [...history, current], [])
    ).subscribe(
      history => {
        console.log("HISTORY", history);
      }
    )

    this.todos.subscribe(
      todos => window.instances.push(todos)
    );
  }

  action(callback) {
    this.actions.next(todos => produce(todos, callback));
  }

  add(title) {
    this.action(todos => {
      todos.push(new Todo(title));
    });
  }

  remove(id) {
    this.action(todos => {
      return todos.filter(todo => todo.id !== id);
    });
  }

  removeCompleted() {
    this.action(todos => {
      return todos.filter(todo => !todo.completed);
    });
  }

  toggle(id) {
    this.action(todos => {
      const targetTodo = todos.find(todo => todo.id === id);
      targetTodo.completed = !targetTodo.completed;
    });
  }

  toggleAll(completed) {
    this.action(todos => {
      todos.forEach(todo => todo.completed = completed);
    });
  }

  update(id, newTitle) {
    this.action(todos => {
      const targetTodo = todos.find(todo => todo.id === id);
      targetTodo.title = newTitle;
    });
  }

}


const instance = new TodoService();
window._TodoService = instance;
export default instance;



// this
//   .dispatch((state) => state.doFetch = true)
//   .on(doFetch => doSuccessAction() => {

//   })

//   {
//     type: "LOAD_TODO",
//     payload: {},
//     meta: {
//       trackId: UUID
//     }
//   }


