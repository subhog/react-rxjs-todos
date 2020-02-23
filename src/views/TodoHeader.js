import React, { useState } from 'react';


const ENTER_KEY = 13;


const TodoHeader = ({
  onAdd,
}) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (event) => {
    if(event.keyCode === ENTER_KEY) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <header>
      <h1>todos</h1>
      <input 
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={ input }
        onChange={ event => setInput(event.currentTarget.value) }
        onKeyDown={ handleKeyDown }
      />
    </header>
  );

};

export default TodoHeader;