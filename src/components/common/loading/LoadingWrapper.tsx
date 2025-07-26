import { useEffect, useState } from "react";
import AppLoader from "./AppLoader";

const InitialLoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  return <>{children}</>;
};

export default InitialLoadingWrapper;
