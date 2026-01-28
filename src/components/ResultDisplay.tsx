import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  teamName: string;
  selectedCard: number | null;
  selectedCardName: string | null;
  visible: boolean;
}

const ResultDisplay = ({ teamName, selectedCard, selectedCardName, visible }: ResultDisplayProps) => {
  if (!visible || selectedCard === null) return null;

  return (
    <div 
      className={cn(
        "text-center transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="glass-card-glow rounded-2xl px-8 py-6 inline-block">
        <p className="font-body text-lg text-muted-foreground mb-2">
          The fate has been sealed
        </p>
        <p className="font-display text-2xl md:text-3xl font-bold">
          Team <span className="text-primary neon-text">{teamName}</span>
        </p>
        <p className="font-display text-xl md:text-2xl mt-1">
          drew <span className="text-secondary neon-text-magenta">{selectedCardName}</span>
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
