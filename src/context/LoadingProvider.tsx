import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const isHome = typeof window !== "undefined" && window.location.pathname === "/";
  const [isLoading, setIsLoading] = useState(isHome);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    if (!isHome) {
      document.body.style.overflowY = "auto";
    }
  }, [isHome]);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className={`main-body ${!isLoading ? "main-active" : ""}`} style={{ opacity: !isLoading ? 1 : undefined }}>
        {children}
      </main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
