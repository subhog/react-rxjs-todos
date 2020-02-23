import React, { useEffect, useState } from 'react';
import todoService from '../services/todoService';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';


const TodoView = ({
  match,
}) => {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const sub = todoService.todos.subscribe(setTodos);
    return () => {
      sub.unsubscribe();
    };
  }, []);

  let visibleTodos = todos;
  const activeTodos = todos.filter(todo => !todo.completed);
  switch(match.params && match.params.filter) {
    case "active":
      visibleTodos = activeTodos;
      break;
    case "completed":
      visibleTodos = todos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  const handleAdd = (title) => todoService.add(title);
  const handleRemove = (id) => todoService.remove(id);
  const handleRemoveCompleted = () => todoService.removeCompleted();
  const handleToggle = (id) => todoService.toggle(id);
  const handleToggleAll = (event) => todoService.toggleAll(event.target.checked);
  const handleUpdate = (id, newTitle) => todoService.update(id, newTitle);

  return (
    <section className="todoapp">
      <TodoHeader
        onAdd={ handleAdd }  
      />
      { todos.length > 0
        ? <>
            <TodoList
              todos={ visibleTodos }
              onRemove={ handleRemove }
              onToggle={ handleToggle }
              onToggleAll={ handleToggleAll }
              onUpdate={ handleUpdate }
            />
            <TodoFooter
              remainingCount={ activeTodos.length }
              hasCompleted={ todos.length > activeTodos.length }
              onClearCompletedClick={ handleRemoveCompleted }
            />
          </>
        : null
      }
    </section>
  );
}


export default TodoView;
