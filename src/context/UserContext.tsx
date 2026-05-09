import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@lib/supabase';
import { usePushToken } from '@hooks/usePushToken';

const UserContext = createContext<any>({ user: null });
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const token = usePushToken();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user && token) {
      supabase.from('user_push_tokens').upsert({
        user_id: user.id,
        expo_push_token: token,
      });
    }
  }, [user, token]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}
