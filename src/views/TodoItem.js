import React, { useReducer } from 'react';
import produce from "immer";
import clsx from 'clsx';


const ENTER_KEY = 13;
const ESCAPE_KEY = 27;


const TodoItem = ({
  todo,
  onToggle,
  onUpdate,
  onRemove,
}) => {

  const [state, setState] = useReducer(produce, {
    editing: false,
    title: todo.title,
  });
  
  const handleChange = (event) => {
    const newTitle = event.currentTarget.value;
    setState(state => {
      state.title = newTitle;
    });
  }

  const handleEdit = () => {
    setState(state => {
      state.editing = true;
    });
  }

  const handleKeyDown = (event) => {
    if(event.keyCode === ESCAPE_KEY) {
      setState(state => {
        state.editing = false;
      });
    } else if(event.keyCode === ENTER_KEY) {
      handleSubmit();
    }
  }

  const handleToggle = () => {
    onToggle(todo.id);
  }

  const handleSubmit = () => {
    setState(state => {
      state.editing = false;
    });
    if(state.title.trim().length > 0) {
      onUpdate(todo.id, state.title.trim());
    } else {
      onRemove(todo.id);
    }
  }

  const handleRemove = () => {
    onRemove(todo.id);
  }

  return (
    <li
      className={ clsx({
        completed: todo.completed,
        editing: state.editing,
      }) }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={ todo.completed }
          onChange={ handleToggle }
        />
        <label
          onDoubleClick={ handleEdit }
        >
          { todo.title }
        </label>
        <button 
          className="destroy" 
          onClick={ handleRemove }
        />
      </div>
      <input
        type="text"
        className="edit"
        value={ state.title }
        onChange={ handleChange }
        onBlur={ handleSubmit }
        onKeyDown={ handleKeyDown }
      />
    </li>
  )
};


export default TodoItem;
