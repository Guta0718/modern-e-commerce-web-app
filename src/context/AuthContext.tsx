"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "customer" | "admin";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
};

type StoredUser = AuthUser & {
  password: string;
};

type AuthResult = {
  success: boolean;
  message: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const USERS_KEY = "gebeya_demo_users";
const SESSION_KEY = "gebeya_demo_session";

const DEMO_ADMIN: StoredUser = {
  id: "demo-admin",
  fullName: "Gebeya Admin",
  email: "admin@gebeya.demo",
  password: "Admin123!",
  role: "admin",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_KEY);
      const users: StoredUser[] = storedUsers
        ? JSON.parse(storedUsers)
        : [];

      if (!users.some((item) => item.id === DEMO_ADMIN.id)) {
        users.push(DEMO_ADMIN);
      }

      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      const session = localStorage.getItem(SESSION_KEY);

      if (session) {
        const savedUser: AuthUser = JSON.parse(session);
        const currentUser = users.find(
          (item) => item.id === savedUser.id
        );

        if (currentUser) {
          const { password: _password, ...publicUser } = currentUser;
          setUser(publicUser);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  function register(
    fullName: string,
    email: string,
    password: string
  ): AuthResult {
    const normalizedEmail = email.trim().toLowerCase();

    if (!fullName.trim() || !normalizedEmail || password.length < 8) {
      return {
        success: false,
        message: "Enter your name, email, and a password of at least 8 characters.",
      };
    }

    try {
      const users: StoredUser[] = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      );

      if (
        users.some(
          (item) => item.email.toLowerCase() === normalizedEmail
        )
      ) {
        return {
          success: false,
          message: "An account with this email already exists.",
        };
      }

      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        fullName: fullName.trim(),
        email: normalizedEmail,
        password,
        role: "customer",
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      const { password: _password, ...publicUser } = newUser;
      localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
      setUser(publicUser);

      return { success: true, message: "Account created successfully." };
    } catch {
      return {
        success: false,
        message: "Unable to create the demo account in this browser.",
      };
    }
  }

  function login(email: string, password: string): AuthResult {
    try {
      const users: StoredUser[] = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      );

      const matchedUser = users.find(
        (item) =>
          item.email.toLowerCase() === email.trim().toLowerCase() &&
          item.password === password
      );

      if (!matchedUser) {
        return {
          success: false,
          message: "Invalid email or password.",
        };
      }

      const { password: _password, ...publicUser } = matchedUser;

      localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
      setUser(publicUser);

      return { success: true, message: "Login successful." };
    } catch {
      return {
        success: false,
        message: "Unable to access demo accounts in this browser.",
      };
    }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
