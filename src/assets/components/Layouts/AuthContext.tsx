import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any; // Adjust the type based on your user shape
  setUser: React.Dispatch<React.SetStateAction<any>>; // Adjust the type as necessary
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // Initial context is undefined

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null); // Adjust the initial state if needed

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
