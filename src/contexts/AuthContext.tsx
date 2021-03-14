import { createContext, useState, useEffect, useContext } from "react";
import { firebase, auth } from "../firebase";
import { Props } from "../types";

type User = firebase.User | null;

interface Context {
  user: User;
  init: boolean;
}

const AuthContext = createContext<Context | null>(null);

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>(null);
  const [init, setInit] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setInit(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, init }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new ReferenceError("AuthProvider 컴포넌트를 찾을 수 없습니다.");
  }
  return context;
};
