import { useState, useEffect } from "react";


function useMediaQuery(importFunc, breakpoint = 1024) {
  const [component, setComponent] = useState(null);

  useEffect(() => {

    const checkScreenSize = () => window.innerWidth < breakpoint;

    if (checkScreenSize()) {
      importFunc().then((module) => {
        setComponent(() => module.default);
      });
    }
  }, [importFunc, breakpoint]);

  return component;
}

export default useMediaQuery;
