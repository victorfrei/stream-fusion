"use client";
import { Command } from "cmdk";
import * as React from "react";
import { useState } from "react";

import { Drawer } from "vaul";

export function SearchModal() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root shouldScaleBackground >
      <Drawer.Trigger>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-secondary flex flex-col rounded-t-[30px] h-[80%] mt-24 fixed bottom-0 left-0 right-0 z-50">
          <div className="p-4 bg-white rounded-t-[30px] flex-1">
            <div className="p-4 rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full mb-8" />
              <p>Content</p>
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
