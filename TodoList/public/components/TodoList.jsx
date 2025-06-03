import React, { useState } from 'react';

const TodoList = ({ todos, onDelete, onToggle, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditedText(todo.task);
  };

  const handleSave = (id, completed) => {
    if (!editedText.trim()) return;
    onEdit(id, { task: editedText, completed });
    setEditingId(null);
    setEditedText('');
  };

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={`flex justify-between items-center p-2 border rounded ${
            todo.completed ? 'bg-green-100' : ''
          }`}
        >
          <div className="flex-1">
            {editingId === todo.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave(todo.id, todo.completed);
                }}
                className="w-full px-2 py-1 border rounded"
              />
            ) : (
              <span
                onClick={() => onToggle(todo.id, { completed: !todo.completed })}
                className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
              >
                {todo.task}
              </span>
            )}
          </div>

          <div className="flex gap-2 ml-4">
            {editingId === todo.id ? (
              <button
                onClick={() => handleSave(todo.id, todo.completed)}
                className="text-green-600 font-semibold"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(todo)}
                className="text-yellow-500 font-semibold"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-500 font-semibold"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
