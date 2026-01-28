import { cn } from "@/lib/utils";

interface WildcardCardProps {
  number: 1 | 2 | 3;
  name: string;
  isSelected: boolean;
  isSpinning: boolean;
  isRevealed: boolean;
  isLoser: boolean;
}

const WildcardCard = ({ number, name, isSelected, isSpinning, isRevealed, isLoser }: WildcardCardProps) => {
  return (
    <div
      className={cn(
        "relative w-full aspect-[3/4] max-w-[200px] md:max-w-[240px] rounded-2xl transition-all duration-500",
        "glass-card border-2 cursor-default",
        isSpinning && "card-shuffle",
        !isRevealed && "pulse-border hover:scale-105 hover:-translate-y-2",
        isSelected && isRevealed && "victory-pulse victory-glow border-primary scale-110 z-10",
        isLoser && "opacity-40 scale-95 grayscale",
        !isSelected && !isLoser && "border-border"
      )}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Card inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      {/* Card content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6">
        {/* Decorative corners */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/50" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-primary/50" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary/50" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/50" />

        {/* Card number */}
        <div 
          className={cn(
            "font-display text-5xl md:text-6xl font-black transition-all duration-500",
            isSelected && isRevealed ? "text-primary neon-text scale-110" : "text-muted-foreground"
          )}
        >
          {number}
        </div>

        {/* Wildcard name */}
        <div className={cn(
          "mt-4 font-display text-base md:text-lg uppercase tracking-wider text-center transition-all duration-500 px-2",
          isSelected && isRevealed ? "text-primary neon-text" : "text-muted-foreground/80"
        )}>
          {name}
        </div>

        {/* Selection indicator */}
        {isSelected && isRevealed && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full">
            <span className="font-display text-xs font-bold text-primary-foreground tracking-wider">
              SELECTED
            </span>
          </div>
        )}
      </div>

      {/* Animated border glow for winner */}
      {isSelected && isRevealed && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse opacity-20" />
        </div>
      )}
    </div>
  );
};

export default WildcardCard;
