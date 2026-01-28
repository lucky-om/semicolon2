import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

interface TeamInputProps {
  onSubmit: (name: string) => void;
  isLocked: boolean;
  teamName: string;
}

const TeamInput = ({ onSubmit, isLocked, teamName }: TeamInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError("Team name cannot be empty");
      return;
    }
    setError("");
    onSubmit(trimmed);
  };

  if (isLocked) {
    return (
      <div className="glass-card-glow rounded-xl px-6 py-4 flex items-center gap-3 max-w-md mx-auto">
        <Lock className="w-5 h-5 text-primary" />
        <span className="font-display text-lg tracking-wide text-foreground">
          {teamName}
        </span>
        <span className="ml-auto text-xs text-muted-foreground uppercase tracking-widest">
          Locked In
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError("");
          }}
          placeholder="Enter team name..."
          className="w-full input-neon rounded-xl px-6 py-4 text-lg font-body 
            placeholder:text-muted-foreground/50 focus:outline-none 
            border border-border focus:border-primary transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 btn-neon 
            px-5 py-2 rounded-lg font-display text-sm font-bold tracking-wider
            text-primary-foreground flex items-center gap-2"
        >
          Enter the Arena
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      {error && (
        <p className="text-destructive text-sm mt-2 text-center font-body">
          {error}
        </p>
      )}
    </form>
  );
};

export default TeamInput;
