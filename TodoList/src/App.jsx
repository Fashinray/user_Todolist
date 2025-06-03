import React, { useEffect, useState } from 'react';
import { supabase } from './supabase';
import TodoForm from '../public/components/TodoForm';
import TodoList from '../public/components/TodoList';

function App({ user }) {
  const [todos, setTodos] = useState([]);

  

  //  Fetch todos for the logged-in user
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id) // filter by user
        .order('created_at', { ascending: false });

      if (!error) setTodos(data);
      else console.error("Fetch error:", error);
    };

    fetchTodos();
  }, [user]); // re-run if user changes

  //  Add task with user_id
  const addTodo = async (task) => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task, completed: false, user_id: user.id }])
      .select();

    if (error) {
      console.error("Add error:", error);
      return;
    }

    setTodos(prev => [data[0], ...prev]);
  }; 

  const deleteTodo = async (id) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (!error) setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = async (id, updatedFields) => {
    const { error } = await supabase
      .from('todos')
      .update(updatedFields)
      .eq('id', id);

    if (!error) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, ...updatedFields } : todo
        )
      );
    } else {
      console.error("Update error:", error);
    }
  };

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error.message);
  } else {
    console.log("User signed out");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 to-emerald-400">
      <div className="bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-center font-bold text-3xl mb-6">ToDo App</h1>

        <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          logout
        </button>
        <TodoForm onAdd={addTodo} />
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={updateTodo}
          onEdit={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;
