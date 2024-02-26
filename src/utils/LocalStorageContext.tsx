import { createContext, useEffect, useState, ReactNode } from "react";

interface LocalStorageContextValue {
  name: string;
}

const LocalStorageContext = createContext<LocalStorageContextValue | undefined>(undefined);

interface LocalStorageProviderProps {
  children: ReactNode;
}

const LocalStorageProvider = ({ children }: LocalStorageProviderProps) => {
  const [name, setName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userName") {
        setName(event.newValue || "");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value: LocalStorageContextValue = {
    name: name,
  };

  return <LocalStorageContext.Provider value={value}>{children}</LocalStorageContext.Provider>
};

export {LocalStorageProvider, LocalStorageContext};
