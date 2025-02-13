"use client"

import { FormatTime } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(FormatTime());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCurrentTime(FormatTime());
    }, 1000);

    return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar o componente
  }, []);


  return (
    <span className="fixed top-10 right-10 text-4xl font-bold z-50">{currentTime}</span>
  )
}