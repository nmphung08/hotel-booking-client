import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  handleLogin: (_: any) => {},
  handleLogout: () => {},
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function handleLogin(token: string) {
    const decodedUser = jwtDecode(token);
    localStorage.setItem("userId", decodedUser.sub);
    localStorage.setItem("userRoles", JSON.stringify(decodedUser?.["roles"]));
    localStorage.setItem("token", token);
    setUser(decodedUser);
  }

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
