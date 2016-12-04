import React from 'react';

const TodoItem = ({ id, title, completed = false, onCompleteChange }) => (
  <div>
    <input
      type="checkbox"
      checked={completed}
      onChange={event => onCompleteChange(event.target.checked)}
    />
    {title}
  </div>
);

export default TodoItem;
