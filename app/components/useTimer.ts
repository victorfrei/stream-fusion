import { useCallback, useEffect, useState } from "react";

export const useTimer = ({
  initialSeconds = 0,
  initiallyRunning = true,
  timeLimit = 15,
  pageLimit = 1,
}: {
  initialSeconds?: number;
  initiallyRunning?: boolean;
  timeLimit?: number;
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
  const [isPageBackActive, setIsPageBackActive] = useState(false);
  const [isPageForwardActive, setIsPageForwardActive] = useState(true);
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

  useEffect(() => {
    LoadData();
  }, [])

  useEffect(() => {
    setIsPageForwardActive(page < pageLimit ? true : false);
    setIsPageBackActive(page > 0 ? true : false);
    SetData();
  }, [page])


  function CleanData() {
    sessionStorage.removeItem("SpotlightPage");
  }

  function SetData() {
    sessionStorage.setItem("SpotlightPage", sessionStorage.getItem("SpotlightPage") ?? String(page));
  }

  function LoadData() {
    setPage(parseInt(sessionStorage.getItem("SpotlightPage") ?? String(page)));
  }

  if (seconds >= timeLimit) {
    reset();
    CleanData();
    setPage((state) => (state < pageLimit ? state + 1 : (state = 0)));

  }

  function PageForward() {
    reset();
    CleanData();
    setPage((state) => (state < pageLimit ? state + 1 : (state = pageLimit)));
  }

  function PageBack() {
    reset();
    CleanData();
    setPage((state) => (state > 0 ? state - 1 : state = 0));
  }

  useSecondsInterval(tick);

  return {
    pause,
    reset,
    running,
    seconds: seconds * (100 / timeLimit),
    start,
    stop,
    page,
    timeLimit,
    PageForward,
    PageBack,
    isPageBackActive,
    isPageForwardActive
  };
};
