import { createContext, useContext, useState } from "react";

interface TagContextType {
  selectedTag: string | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<string | null>>;
}

const TagContext = createContext<TagContextType | null>(null);

export const TagProvider: React.FC = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const contextValue = {
    selectedTag,
    setSelectedTag,
  };

  return (
    <TagContext.Provider value={contextValue}>{children}</TagContext.Provider>
  );
};

export const useTagContext = (): TagContextType => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagProvider");
  }
  return context;
};
