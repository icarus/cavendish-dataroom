"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowRight } from "lucide-react";

interface Props {
  active: boolean;
  onBack: () => void;
}

export function RabbitPanel({ active, onBack }: Props) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setShow(true), 350);
      return () => clearTimeout(t);
    }
    setShow(false);
  }, [active]);

  return (
    <div className="absolute top-[50%] left-0 w-screen h-screen flex items-center justify-center">
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <Button variant="ghost" onClick={onBack} className="-mt-1">
          <ArrowUp />
          Back
        </Button>
      </div>

      <div
        className="flex flex-col gap-4 w-72"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.6s ease 0ms, transform 0.6s ease 0ms",
        }}
      >
        <Button onClick={() => router.push("/rabbit-hole")}>
          Down the Rabbit Hole
          <ArrowRight />
        </Button>
        <Button variant="outline" onClick={() => router.push("/memo")}>
          Memo
        </Button>
      </div>
    </div>
  );
}
