import { useEffect, useState } from 'react';

const useContainerSize = (ref: React.RefObject<HTMLElement | null>) => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();

        setSize({ width: rect.width, height: rect.height });
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => resizeObserver.disconnect();
  }, [ref]);

  return size;
};

export default useContainerSize;
