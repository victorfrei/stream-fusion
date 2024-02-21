"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselBanner({ spotlightMovies }: { spotlightMovies: [] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 8000})
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={()=>plugin.current.play()}
    >
      <CarouselContent>
        {spotlightMovies?.map((elem: any, index) => (
          <CarouselItem key={index}>
            <Image
              src={
                "https://image.tmdb.org/t/p/original/" +
                elem?.poster_path
              }
              alt={elem?.title}
              width={300}
              height={300}
              className="w-64 h-96 right-slide-in object-cover object-right-top border-2 border-text rounded-2xl"
            ></Image>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
