"use client";

import { useState } from "react";
import { ArrowUp, Lock } from "lucide-react";
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
    <div className="absolute top-[100%] left-0 w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-sm px-8 space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center size-12 rounded-full border border-white/10 bg-white/5">
            <Lock className="size-5 text-[#FFEC40]" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-white text-lg font-mono uppercase tracking-widest">
              Restricted access
            </h2>
            <p className="text-white/40 text-sm font-mono uppercase tracking-wider">
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
            className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#FFEC40] font-mono text-center tracking-widest"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFEC40] text-black hover:bg-[#FFEC40]/80 font-mono uppercase tracking-widest"
          >
            {loading ? "Verifying..." : "Enter"}
          </Button>
        </form>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white/30 hover:text-white/60 font-mono uppercase text-xs tracking-widest"
          >
            <ArrowUp className="size-3" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
