import React from 'react';
import TodoItem from './TodoItem';


const TodoList = ({
  todos,
  onToggleAll,
  onToggle,
  onUpdate,
  onRemove,
}) => (
  <section className="main">
    <input
      type="checkbox"
      className="toggle-all"
      onChange={ onToggleAll }
    />
    <ul className="todo-list">
      { todos.map(todo => 
        <TodoItem
          key={ todo.id }
          todo={ todo }
          onToggle={ onToggle }
          onUpdate={ onUpdate }
          onRemove={ onRemove }
        />
      ) }
    </ul>
  </section>
);


export default TodoList;
