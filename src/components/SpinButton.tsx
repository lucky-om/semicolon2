import { cn } from "@/lib/utils";
import { Loader2, Lock, Zap } from "lucide-react";

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSpinning: boolean;
  isUsed: boolean;
}

const SpinButton = ({ onClick, disabled, isSpinning, isUsed }: SpinButtonProps) => {
  if (isUsed) {
    return (
      <button
        disabled
        className="relative px-10 py-5 rounded-2xl font-display text-lg md:text-xl font-bold 
          tracking-wider uppercase bg-muted/50 text-muted-foreground cursor-not-allowed
          border border-muted-foreground/20 flex items-center gap-3"
      >
        <Lock className="w-5 h-5" />
        <span className="line-through decoration-2">Spin Used</span>
        <span className="text-sm normal-case">No second chances.</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || isSpinning}
      className={cn(
        "relative px-12 py-5 rounded-2xl font-display text-xl md:text-2xl font-bold",
        "tracking-wider uppercase transition-all duration-300",
        "flex items-center gap-3",
        disabled
          ? "bg-muted/50 text-muted-foreground cursor-not-allowed border border-muted-foreground/20"
          : "btn-neon text-primary-foreground"
      )}
    >
      {isSpinning ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Spinning...</span>
        </>
      ) : (
        <>
          <Zap className="w-6 h-6" />
          <span>Spin</span>
        </>
      )}
      
      {/* Button glow effect */}
      {!disabled && !isSpinning && (
        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl -z-10 animate-pulse" />
      )}
    </button>
  );
};

export default SpinButton;
