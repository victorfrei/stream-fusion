import { useCallback, useEffect, useState } from "react";

export const useTimer = ({
  initialSeconds = 0,
  initiallyRunning = true,
  limit = 10,
  pageLimit = 7,
}: {
  initialSeconds?: number;
  initiallyRunning?: boolean;
  limit?: number;
  pageLimit?: number;
} = {}) => {
  const interval =
    (delay = 0) =>
    (callback: any) =>
      useEffect(() => {
        const id = setInterval(callback, delay);

        return () => clearInterval(id);
      }, [callback]);

  const useSecondsInterval = interval(100);

  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);
  const [page, setPage] = useState(0);

  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds + 0.1) : undefined),
    [running]
  );

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => setSeconds(0);
  const stop = () => {
    pause();
    reset();
  };

  if (seconds >= limit) {
    reset();
    setPage((state) => (state < pageLimit ? state + 1 : (state = 0)));
  }

  useSecondsInterval(tick);

  return {
    pause,
    reset,
    running,
    seconds: seconds * (100 / limit),
    start,
    stop,
    page,
  };
};
