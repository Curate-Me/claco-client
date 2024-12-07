import { useEffect, useRef } from "react";

const useRefFocusEffect = <T extends HTMLElement>(
  onFocusCallback: () => void,

  deps: React.DependencyList = []
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const currentElement = ref.current;

    if (currentElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onFocusCallback();
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(currentElement);

      return () => {
        observer.unobserve(currentElement);
      };
    }
  }, [...deps]);

  return { elementRef: ref };
};

export default useRefFocusEffect;
