// Root.jsx
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Signup from "./SignUp";
import App from "./App";

export default function Root() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth event:", _event, session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  return user ? <App user={user} /> : <Signup onAuth={setUser} />;
}
