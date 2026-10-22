import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { apiRequest } from "../utils/api";
import {
  clearConversationId,
  startNewConversation,
} from "../utils/agent";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    apiRequest("/auth/me")
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        clearConversationId();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    startNewConversation();
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    clearConversationId();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}