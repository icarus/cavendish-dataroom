"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  active: boolean;
  onBack: () => void;
}

export function RabbitPanel({ active, onBack }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    setTimeout(() => {
      setError("Invalid access code");
      setLoading(false);
    }, 800);
  }

  return (
    <div className="absolute top-[50%] left-0 w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-sm px-8 space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center space-y-0">
            <h2 className="text-white text-lg font-mono uppercase">
              Restricted access
            </h2>
            <p className="text-white/40 text-sm font-mono uppercase">
              Enter the access code to continue
            </p>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-2 text-center text-sm text-red-400 font-mono">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Access code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus={active}
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Verifying..." : "Enter"}
          </Button>
          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full -mt-1"
          >
            <ArrowUp />
            Back
          </Button>
        </form>
      </div>
    </div>
  );
}
