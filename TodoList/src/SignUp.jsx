import { useState } from "react";
import { supabase } from './supabase';

export default function Signup({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error)
      onAuth(data.session.user);
    else alert(error.message);
  }

  async function handleSignup(e) {
    e.preventDefault(); 
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (!error)
      alert("Check your mail for confirmation");
    else alert(error.message);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login Form</h2>

        

        
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
          type="text"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="text"
          className="w-full px-4 py-3 mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <p className="text-sm text-blue-500 text-right mb-4 hover:underline cursor-pointer">Forgot password?</p>

        
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl mb-4"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Create an account <span onClick={handleSignup} className="text-blue-500 cursor-pointer hover:underline">Signup now</span>
        </p>
      </form>
    </div>
  );
}