"use client"

import MuxPlayer from "@mux/mux-player-react"


const Player = ({ playbackId }: { playbackId: string }) => {

  return (
    <MuxPlayer
      className="w-screen h-screen z-50"
      playbackId={playbackId}
      autoPlay
      accentColor="#ea580c"
    />
  );
};

export default Player;
