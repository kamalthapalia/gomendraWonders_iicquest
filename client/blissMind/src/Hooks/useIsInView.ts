// import React, {useEffect, useRef, useState} from "react";

// interface IntersectionObserverOptions {
// 	root?: Element | null;
// 	rootMargin?: string;
// 	threshold?: number | number[];
// }

// const useInView = (
// 	options: IntersectionObserverOptions
// ): [React.RefObject<HTMLDivElement>, boolean] => {
// 	const [isInView, setIsInView] = useState(false);
// 	const ref = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const observer = new IntersectionObserver(([entry]) => {
// 			setIsInView(entry.isIntersecting);
// 		}, options);

// 		if (ref.current) {
// 			observer.observe(ref.current);
// 		}

// 		return () => {
// 			if (ref.current) {
// 				observer.unobserve(ref.current);
// 			}
// 		};
// 	}, [options]);

// 	return [ref, isInView];
// };

// export default useInView;

import { useEffect, useRef, useState, useCallback } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useInView = (options: IntersectionObserverOptions) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const callback = useCallback((observerEntries: IntersectionObserverEntry[]) => {
    setEntries(observerEntries);
  }, []);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(callback, options);

    const { current: currentObserver } = observer;
    elements.forEach((element) => currentObserver.observe(element));

    return () => currentObserver.disconnect();
  }, [elements, options, callback]);

  return [setElements, entries] as const;
};

export default useInView;
