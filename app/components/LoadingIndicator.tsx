import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function LoadingIndicator({ setPage }: { setPage?: any }) {
  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView) {
      // setPage((prevState: number) => prevState + 1);
    }
  }, [inView]);

  return <div ref={ref}>Loading</div>;
}
